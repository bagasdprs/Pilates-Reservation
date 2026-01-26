package repository

import (
	"errors"

	"github.com/bagas/diro-pilates-backend/internal/entity"
	"gorm.io/gorm"
)

type ProfileRepository interface {
	GetByID(id uint) (*entity.User, error)
	Update(user *entity.User) error
	Create(user *entity.User) error
	GetByEmail(email string) (*entity.User, error)
}

type profileRepo struct {
	db *gorm.DB
}

func NewProfileRepository(db *gorm.DB) ProfileRepository {
	return &profileRepo{
		db: db,
	}
}

func (r *profileRepo) GetByID(id uint) (*entity.User, error) {
	var user entity.User

	if err := r.db.First(&user, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("user not found")
		}
		return nil, err
	}

	return &user, nil
}

func (r *profileRepo) Update(user *entity.User) error {

	if err := r.db.Save(user).Error; err != nil {
		return err
	}

	return nil
}

func (r *profileRepo) Create(user *entity.User) error {
	return r.db.Create(user).Error
}

func (r *profileRepo) GetByEmail(email string) (*entity.User, error) {
	var user entity.User
	err := r.db.Where("email = ?", email).First(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}