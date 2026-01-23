package entity

import (
	"time"
)

// User: User doing bookings
type User struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	Name      string         `json:"name"`
	Email     string         `gorm:"unique" json:"email"`
	Phone     string         `json:"phone"`
	NIK          string    `json:"nik"`           // NIK KTP (String 16 digit)
	Gender       string    `json:"gender"`        // "Male" / "Female"
	ImageProfile string    `json:"image_profile"` // URL Photo
	Address      string    `json:"address" gorm:"type:text"`
	Role      string         `json:"role" gorm:"default:'member'"` // member, admin
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
}

// Court: Resource being booked
type Court struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	Name      string         `json:"name"` // e.g., "Reformer 1"
	Type      string         `json:"type"` // e.g., "reformer", "mat"
}

// Booking: Transaction entity
type Booking struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	UserID    uint           `json:"user_id"`
	CourtID   uint           `json:"court_id"`

	// Time Data
	Date      time.Time      `json:"date" gorm:"type:date"` // YYYY-MM-DD
	StartTime string         `json:"start_time"`            // "09:00"
	EndTime   string         `json:"end_time"`              // "10:00"

	Status    string         `json:"status" gorm:"default:'confirmed'"` // confirmed, cancelled

	// Relations
	User      User           `gorm:"foreignKey:UserID"`
	Court     Court          `gorm:"foreignKey:CourtID"`

	CreatedAt time.Time      `json:"created_at"`
}