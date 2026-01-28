package main

import (
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"github.com/bagas/diro-pilates-backend/internal/handler"
	"github.com/bagas/diro-pilates-backend/internal/repository"
	"github.com/bagas/diro-pilates-backend/internal/service"
	"github.com/bagas/diro-pilates-backend/pkg/database"
)

func main() {

	// Load Environment Variables
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found")
	}

	// CONNECT DATABASE
	db, err := database.ConnectDB()
	if err != nil {
		log.Fatalf("❌ Failed to connect database: %v", err)
	}

	// DEPENDENCY INJECTION (WIRING)
	// Layer 1: Repository
	profileRepo := repository.NewProfileRepository(db)
	// Layer 2: Service
	profileService := service.NewProfileService(profileRepo)
	// Layer 3: Handler
	profileHandler := handler.NewProfileHandler(profileService)

	// SETUP ROUTER
	r := gin.Default()

	// Setup CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// REGISTER ROUTES
	api := r.Group("/api")
	{
		// Check Server
		api.GET("/ping", func(c *gin.Context) {
			c.JSON(200, gin.H{"message": "pong", "status": "Backend OK!"})
		})

		// Routes Profile
		api.POST("/register", profileHandler.CreateUser)
		api.POST("/login", profileHandler.Login)
		api.GET("/profile/:id", profileHandler.GetProfile)
		api.PUT("/profile/:id", profileHandler.UpdateProfile)

		// Routes Class Schedules
		api.GET("/schedules", handler.GetSchedules)
		api.GET("/schedules/:id", handler.GetScheduleByID)

		// Routes Bookings
		api.POST("/bookings", handler.CreateBooking)
		api.GET("/bookings/user/:id", handler.GetBookingsByUser)
		api.DELETE("/bookings/:id", handler.CancelBooking)
	}

	// RUN SERVER
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("🚀 Server running on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}