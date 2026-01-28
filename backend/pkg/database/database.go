package database

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	// Import entity for AutoMigrate
	"github.com/bagas/diro-pilates-backend/internal/entity"
)

var DB *gorm.DB
func ConnectDB() (*gorm.DB, error) {
	// GET URL DATABASE from .env
	dsn := os.Getenv("DATABASE_URL")

	// Validation if DATABASE_URL is empty
	if dsn == "" {
		return nil, fmt.Errorf("DATABASE_URL is empty in .env")
	}

	dbConfig := postgres.Config{
			DSN:                  dsn,
			PreferSimpleProtocol: true,
		}

	// Open connection to DB
	db, err := gorm.Open(postgres.New(dbConfig), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info), // Log query SQL
	})

	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %v", err)
	}

	log.Println("✅ Connected to Database Supabase!")

	DB = db

	// AUTO MIGRATION
	log.Println("Running Auto Migration...")
	err = db.AutoMigrate(
		&entity.User{},
		&entity.Class{},
		&entity.ClassSchedule{},
		&entity.Booking{},
		&entity.Invoice{},
	)

	if err != nil {
		return nil, fmt.Errorf("failed to migrate database: %v", err)
	}

	log.Println("✅ Database Migration Success!")
	return db, nil
}

func GetDB() *gorm.DB {
	return DB
}
