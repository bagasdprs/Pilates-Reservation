# 🧘‍♂️ Pilates Reservation App

> A full-stack reservation platform designed for high performance and scalability.

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![Golang](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Overview

This project is a technical assessment for **DIRO App**, demonstrating a **Clean Architecture** approach in building a reservation system. It solves the challenge of handling class schedules, court/reformer availability, and user bookings with precision.

## ✨ Tech Stack

**Frontend:**

- **Next.js 16** (App Router & Server Actions)
- **Tailwind CSS v4** + **Shadcn UI** (For a clean, modern aesthetic)
- **React Query** (Server state management)

**Backend:**

- **Golang** (Gin Framework)
- **GORM** (ORM for PostgreSQL)
- **PostgreSQL** (Hosted on Supabase)
- **Clean Architecture** (Separation of concerns: Handler -> Service -> Repository)

## 🛠️ Features

- [x] **User Management**: Registration with NIK & Profile details.
- [x] **Smart Booking**: Select Date -> Available Time -> Available Court.
- [x] **Conflict Prevention**: Handles double-booking logic on the backend.
- [x] **Responsive Design**: Mobile-first UI optimized for booking on the go.
