# 🎮 8BitLog

A minimal and clean game‐tracking web app inspired by Letterboxd.  
Users can sign up, log in securely, and (in future updates) track, rate, and review games.

## ✨ Overview

8BitLog is built with the **MERN stack**, focusing on:

- A simple and responsive UI  
- Secure authentication (JWT + HttpOnly cookies)  
- Modular backend design  
- Clean component structure on the frontend  

This project is actively being developed and will evolve into a full game-logging platform.

## 🚀 Features

### Core
- 🔑 User Sign Up / Login  
- 🔒 JWT authentication with refresh tokens  
- 🍪 HttpOnly cookie-based session handling  
- 🔐 Bcrypt password hashing  
- 🧩 Clean form validation  
- 📱 Responsive UI  

### Backend Architecture
- 🗂️ Controllers for business logic  
- 🧱 Modular Express routers  
- ⚙️ Middlewares for rate limiting, errors, and auth  
- 🗄️ MongoDB models using Mongoose  
- 🌍 Environment-based configuration  

### Security
- Hashing & salting passwords with bcrypt  
- HttpOnly refresh token storage  
- CORS configured for credentials  
- Optional rate limiting (disabled during development)  

## 🛠️ Tech Stack

### Frontend
- React  
- Custom CSS  
- Fetch API (`credentials: "include"`)  

### Backend
- Node.js  
- Express.js  
- MongoDB Atlas  
- Mongoose  
- JSON Web Tokens  
- Nodemon (development)  

## 📁 Project Structure

🌐 **8BitLog/**
- 🖥️ **frontend/**
  - 📁 **src/**
    - ⚛️ **Components/**
    - 🖼️ **assets/**
    - 💅 **styles/**
- 🖥️ **server/**
  - 📁 **src/**
    - ⚙️ **config/**
    - 🎛️ **controllers/**
    - 🔒 **middlewares/**
    - 🗃️ **models/**
    - 🛤️ **routes/**
  - 🚀 **index.js**
  - 🔑 **.env**


## 📌 Roadmap

- IGDB API integration  
- Game search  
- Game logging  
- User profiles  
- Reviews & ratings  
- Social feed  

