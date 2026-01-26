package handler

import (
	"net/http"
	"strconv"

	"github.com/bagas/diro-pilates-backend/internal/entity"
	"github.com/bagas/diro-pilates-backend/internal/service"
	"github.com/gin-gonic/gin"
)

// ProfileHandler handles HTTP requests related to user profiles.
type ProfileHandler struct {
	service service.ProfileService
}

type LoginRequest struct {
	Email string `json:"email" binding:"required,email"`
}

// NewProfileHandler creates a new instance of ProfileHandler.
func NewProfileHandler(service service.ProfileService) *ProfileHandler {
	return &ProfileHandler{
		service: service,
	}
}

// GetProfile handles GET /api/profile/:id
func (h *ProfileHandler) GetProfile(c *gin.Context) {
	// Parse User ID from URL parameter
	idParam := c.Param("id")
	userID, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Call Service
	user, err := h.service.GetProfile(uint(userID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return Response
	c.JSON(http.StatusOK, gin.H{
		"message": "Profile retrieved successfully",
		"data":    user,
	})
}

// UpdateProfile handles PUT /api/profile/:id
func (h *ProfileHandler) UpdateProfile(c *gin.Context) {
	// 1. Parse User ID from URL parameter
	idParam := c.Param("id")
	userID, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Bind JSON Request Body to Struct
	var req entity.User
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON data: " + err.Error()})
		return
	}

	// Call Service
	err = h.service.UpdateProfile(uint(userID), &req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return Success Response
	c.JSON(http.StatusOK, gin.H{
		"message": "Profile updated successfully",
	})
}

// CreateUser handles POST /api/register
func (h *ProfileHandler) CreateUser(c *gin.Context) {
	var req entity.User

	// GET data JSON from Request
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON data: " + err.Error()})
		return
	}

	// Call Service
	if err := h.service.CreateUser(&req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user: " + err.Error()})
		return
	}

	// Success
	c.JSON(http.StatusCreated, gin.H{
		"message": "User created successfully!",
		"data":    req, // Callback data user
	})
}

func (h *ProfileHandler) Login(c *gin.Context) {
	var req LoginRequest

	// 1. Validasi JSON input
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid email format"})
		return
	}

	// 2. Call Service
	user, err := h.service.LoginByEmail(req.Email)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Email not registered"})
		return
	}

	// 3. Login Success
	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful",
		"data":    user,
	})
}