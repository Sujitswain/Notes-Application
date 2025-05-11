# Notes Application

A powerful and intuitive Notes Application built with **React** on the frontend and **Spring Boot** on the backend. The application uses **JWT authentication** for secure user access, **OTP verification** for user registration/login, and **React Quill** for rich text note-taking with image support and custom image creation.

## Features

- **User Authentication**: Secure login and registration with JWT token-based authentication.
- **OTP Verification**: One-time password (OTP) sent to the user's email for additional security.
- **Rich Text Notes**: Add and manage notes with rich text formatting using **React Quill**.
- **Image Support**: Upload images within your notes and create custom images within the editor.
- **Responsive UI**: Mobile-friendly and easy-to-use interface with React.
- **Spring Boot Backend**: Handles JWT authentication, user management, and note storage.
- **Secure API**: RESTful API to manage users, notes, and authentication.

## Technologies Used

- **Frontend**: React, React Quill, Axios
- **Backend**: Spring Boot, Spring Security, JWT, Spring Data JPA, MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MySQL
- **OTP**: Email-based OTP using JavaMail
- **Image Management**: React Quill with image support, custom image creation

## Prerequisites

- Java 17 or later
- Node.js 16.x or later
- H2 / MySQL
- Maven
- npm for frontend dependencies

## Setup Instructions

### Backend (Spring Boot)

1. **Clone the repository:**

   ```bash
   https://github.com/Sujitswain/Notes-Application.git
   cd Notes-Application
