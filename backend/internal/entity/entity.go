package entity

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"time"

	"github.com/lib/pq"
)

// --- SUB-STRUCTS (Helper for JSONB) ---

type EmergencyContact struct {
	Name     string `json:"name"`
	Phone    string `json:"phone"`
	Relation string `json:"relation"`
}

type NotificationPrefs struct {
	ClassReminders  bool `json:"class_reminders"`
	MarketingEmails bool `json:"marketing_emails"`
	SystemUpdates   bool `json:"system_updates"`
}

// Interface implementation for GORM JSONB handling
func (a EmergencyContact) Value() (driver.Value, error) {
	// return json.Marshal(a)
	b, err := json.Marshal(a)
	return string(b), err
}
func (a *EmergencyContact) Scan(value interface{}) error {
	b, ok := value.([]byte)
	if !ok {
		return errors.New("type assertion to []byte failed")
	}
	return json.Unmarshal(b, &a)
}

func (a NotificationPrefs) Value() (driver.Value, error) {
	// return json.Marshal(a)
	b, err := json.Marshal(a)
	return string(b), err
}
func (a *NotificationPrefs) Scan(value interface{}) error {
	b, ok := value.([]byte)
	if !ok {
		return errors.New("type assertion to []byte failed")
	}
	return json.Unmarshal(b, &a)
}

// --- MAIN STRUCT ---
type User struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	FirstName	string         `json:"first_name"`
	LastName  string         `json:"last_name"`

	Email     string         `gorm:"unique" json:"email"`
	Phone     string         `json:"phone"`
	NIK          string    `json:"nik"`
	Gender       string    `json:"gender"`
	ImageProfile string    `json:"image_profile"`
	Address      string    `json:"address" gorm:"type:text"`
	Role      string         `json:"role" gorm:"default:'member'"`

	MembershipTier  string            `json:"membership_tier" gorm:"default:'free'"`
	MembershipExpiry *time.Time `json:"membership_expiry"`

	MedicalConditions pq.StringArray `json:"medical_conditions" gorm:"type:text[]"`
	PhysicalGoals     pq.StringArray `json:"physical_goals" gorm:"type:text[]"`

	EmergencyContact EmergencyContact  `json:"emergency_contact" gorm:"type:jsonb"`
	NotificationPrefs NotificationPrefs `json:"notification_prefs" gorm:"type:jsonb"`

	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
}

// Court: Resource being booked
type Class struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	Name      string         `json:"name"`
	Description string  `json:"description"`
	ImageURL    string  `json:"image_url"`
	Price       float64 `json:"price"`
	Duration    int     `json:"duration"`
}

// Table baru buat nyimpen jadwal yang tersedia
type ClassSchedule struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	ClassID   uint      `json:"class_id"`

	Date      string    `json:"date" gorm:"type:date"`
	StartTime string    `json:"start_time"`
	EndTime   string    `json:"end_time"`

	Instructor string   `json:"instructor"`
	Capacity   int      `json:"capacity"`
	Booked     int      `json:"booked" gorm:"default:0"`

	Class     Class     `json:"class" gorm:"foreignKey:ClassID"`
}

// Booking: Transaction entity
type Booking struct {
	ID              uint           `gorm:"primaryKey" json:"id"`
	UserID          uint           `json:"user_id"`
	ClassScheduleID uint           `json:"class_schedule_id"`
	TotalAmount     float64        `json:"total_amount"`
	Status          string         `json:"status" gorm:"default:'confirmed'"`
	PaymentURL      string         `json:"payment_url"`

	User            User           `gorm:"foreignKey:UserID"`
	ClassSchedule   ClassSchedule  `gorm:"foreignKey:ClassScheduleID"`

	CreatedAt       time.Time      `json:"created_at"`
}

type Invoice struct {
	ID            uint      `gorm:"primaryKey" json:"id"`
	UserID        uint      `json:"user_id"`
	InvoiceNumber string    `json:"invoice_number"`
	Amount        float64   `json:"amount"`
	Status        string    `json:"status"`
	Date          time.Time `json:"date"`

	User          User      `gorm:"foreignKey:UserID"`
}