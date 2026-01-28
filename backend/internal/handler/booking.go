package handler

import (
	"fmt"
	"net/http"
	"time"

	"github.com/bagas/diro-pilates-backend/internal/entity"
	"github.com/bagas/diro-pilates-backend/pkg/database"

	"github.com/gin-gonic/gin"
)

// UPDATE 1: Tambahkan UserID di struct input biar bisa dibaca dari JSON Frontend
type BookingInput struct {
	UserID          uint `json:"user_id" binding:"required"`
	ClassScheduleID uint `json:"class_schedule_id" binding:"required"`
}

func CreateBooking(c *gin.Context) {
	var input BookingInput

	// UPDATE 2: Baca JSON Body (termasuk user_id yang dikirim frontend)
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Data JSON tidak valid", "details": err.Error()})
		return
	}

	// [DEBUG] Print ke terminal biar kita tau data masuk
	fmt.Printf("📥 New Booking Request: UserID=%d, ScheduleID=%d\n", input.UserID, input.ClassScheduleID)

	db := database.GetDB()
	tx := db.Begin()

	// ---------------------------------------------------------
	// KITA HAPUS BAGIAN "c.Get('userID')" YANG BIKIN ERROR 401
	// SEKARANG KITA PAKAI "input.UserID" LANGSUNG
	// ---------------------------------------------------------

	// Cek Validasi User (Apakah User ID 1/Guest ada di DB?)
	var user entity.User
	if err := tx.First(&user, input.UserID).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusNotFound, gin.H{"error": "User ID tidak ditemukan di Database"})
		return
	}

	// 2. Cek Apakah Jadwal Ada?
	var schedule entity.ClassSchedule
	if err := tx.Preload("Class").First(&schedule, input.ClassScheduleID).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusNotFound, gin.H{"error": "Class schedule not found"})
		return
	}

	// 3. Cek Kuota Penuh?
	if schedule.Booked >= schedule.Capacity {
		tx.Rollback()
		c.JSON(http.StatusConflict, gin.H{"error": "Class is fully booked!"})
		return
	}

	// 4. Cek Double Booking
	var existingBooking entity.Booking
	if err := tx.Where("user_id = ? AND class_schedule_id = ?", input.UserID, input.ClassScheduleID).First(&existingBooking).Error; err == nil {
		tx.Rollback()
		c.JSON(http.StatusConflict, gin.H{"error": "You already booked this class"})
		return
	}

	// 5. Buat Data Booking Baru
	newBooking := entity.Booking{
		UserID:          input.UserID, // Pakai input.UserID
		ClassScheduleID: input.ClassScheduleID,
		Status:          "confirmed",
		TotalAmount:     schedule.Class.Price, // Ambil harga real dari relasi Class
		CreatedAt:       time.Now(),
	}

	if err := tx.Create(&newBooking).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create booking"})
		return
	}

	// 6. Update Kuota (+1 Booked)
	schedule.Booked = schedule.Booked + 1
	if err := tx.Save(&schedule).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update quota"})
		return
	}

	// 7. Commit Transaksi
	tx.Commit()

	c.JSON(http.StatusCreated, gin.H{
		"message": "Booking successful!",
		"data":    newBooking,
	})
}

// GET /api/schedules?date=2026-01-29
func GetSchedules(c *gin.Context) {
    db := database.GetDB()

	if db == nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Database connection is NIL. Cek koneksi di main.go!",
		})
		return
	}

    var schedules []entity.ClassSchedule
    dateParam := c.Query("date")

	// Preload Class biar frontend dapet harga & gambar
	query := db.Debug().Preload("Class").Order("start_time asc")

    if dateParam != "" {
        query = query.Where("date = ?", dateParam)
    } else {
        query = query.Where("date >= ?", time.Now().Format("2006-01-02"))
    }

    if err := query.Find(&schedules).Error; err != nil {
		fmt.Printf("❌ SQL ERROR: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal ambil data", "details": err.Error()})
        return
    }

	c.JSON(http.StatusOK, gin.H{"data": schedules})
}

// GET /api/schedules/:id
func GetScheduleByID(c *gin.Context) {
    db := database.GetDB()
    id := c.Param("id")
    var schedule entity.ClassSchedule

	// Preload Class Wajib Ada
    if err := db.Preload("Class").First(&schedule, id).Error; err != nil {
        c.JSON(404, gin.H{"error": "Schedule not found"})
        return
    }

    c.JSON(200, gin.H{"data": schedule})
}

// GET /api/bookings/user/:id
func GetBookingsByUser(c *gin.Context) {
	db := database.GetDB()
	userID := c.Param("id")

	var bookings []entity.Booking

	// We Need Data Relations:
	// 1. ClassSchedule
	// 2. ClassSchedule.Class
	// 3. User
	if err := db.Preload("ClassSchedule").
		Preload("ClassSchedule.Class").
		Preload("User").
		Where("user_id = ?", userID).
		Order("created_at desc").
		Find(&bookings).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengambil data booking"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Success retrieving user bookings",
		"data":    bookings,
	})
}

// DELETE /api/bookings/:id
// Cancel Booking / Refund
func CancelBooking(c *gin.Context) {
	db := database.GetDB()
	bookingID := c.Param("id")

	// 1. Cari dulu data bookingnya (Ada gak?)
	var booking entity.Booking
	if err := db.Preload("ClassSchedule").First(&booking, bookingID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Booking not found"})
		return
	}

	// 2. Balikin Kuota Slot Kelas (+1 lagi)
	// Karena user cancel, berarti kursi kosong lagi dong.
	var schedule entity.ClassSchedule
	if err := db.First(&schedule, booking.ClassScheduleID).Error; err == nil {
		if schedule.Booked > 0 {
			schedule.Booked = schedule.Booked - 1
			db.Save(&schedule)
		}
	}

	// 3. Hapus data Booking (Soft Delete atau Hard Delete)
	// Di sini kita pakai Hard Delete (hilang selamanya) biar gampang.
	if err := db.Delete(&booking).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to cancel booking"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Booking successfully cancelled. Slot restored.",
	})
}