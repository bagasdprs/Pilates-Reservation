package service

import (
	"errors"

	"github.com/bagas/diro-pilates-backend/internal/entity"
	"github.com/bagas/diro-pilates-backend/internal/repository"
)

// ProfileService defines the interface for user profile business logic.
type ProfileService interface {
	GetProfile(userID uint) (*entity.User, error)
	UpdateProfile(userID uint, req *entity.User) error
	CreateUser(req *entity.User) error
	LoginByEmail(email string) (*entity.User, error)
}

type profileService struct {
	repo repository.ProfileRepository
}

// NewProfileService creates a new instance of ProfileService.
func NewProfileService(repo repository.ProfileRepository) ProfileService {
	return &profileService{
		repo: repo,
	}
}

// GetProfile retrieves a user's profile by their ID.
func (s *profileService) GetProfile(userID uint) (*entity.User, error) {
	return s.repo.GetByID(userID)
}

// UpdateProfile updates specific fields of a user's profile.
func (s *profileService) UpdateProfile(userID uint, req *entity.User) error {
	// 1. Verify if the user exists
	existingUser, err := s.repo.GetByID(userID)
	if err != nil {
		return err
	}
	if existingUser == nil {
		return errors.New("user not found")
	}

	// 2. Map allowed fields from the request to the existing user entity (Business Logic)

	// Basic Information
	existingUser.FirstName = req.FirstName
	existingUser.LastName = req.LastName
	existingUser.Phone = req.Phone
	existingUser.Address = req.Address

	// Advanced Profile Data (Medical & Emergency)
	// Direct assignment works here because we are using JSONB/Array types
	existingUser.MedicalConditions = req.MedicalConditions
	existingUser.PhysicalGoals = req.PhysicalGoals
	existingUser.EmergencyContact = req.EmergencyContact
	existingUser.NotificationPrefs = req.NotificationPrefs

	// NOTE: Email and Password updates are excluded here; they should be handled by the Auth Service.

	// 3. Persist changes to the database via Repository
	return s.repo.Update(existingUser)
}

func (s *profileService) CreateUser(req *entity.User) error {
	// Set Default Role
	req.Role = "member"

	// Call repository to create user
	return s.repo.Create(req)
}

func (s *profileService) LoginByEmail(email string) (*entity.User, error) {
	user, err := s.repo.GetByEmail(email)
	if err != nil {
		return nil, errors.New("invalid email or user not found")
	}
	return user, nil
}