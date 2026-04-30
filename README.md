# Pokédex App

A full-stack Pokédex application featuring a modern, responsive interface and an authenticated backend to save your favorite Pokémon.

## Project Structure

This repository is organized into a monorepo-style structure containing both the frontend application and backend services:

- **`/frontend`**: React + Vite application (User Interface, Auth Flows, Pokémon Data Fetching).
- **`/backend`**: Node.js + Express + MongoDB application (User Authentication, OAuth Integration, Favorites API).

## Features

### Frontend
- High-fidelity, animated, and responsive user interface mimicking a high-end Pokédex.
- Search, filter, and view detailed stats of Pokémon.
- Google OAuth login flow integration.
- Hardware-button aesthetics and fluid micro-animations.

### Backend
- REST API powered by Express.
- User authentication via Google OAuth.
- Persistent storage using MongoDB to track user favorites and settings.

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB instance (local or Atlas)

### Setting up the Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (create a `.env` file based on your setup):
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Setting up the Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (create a `.env` file):
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Development

Currently, the project is configured with separate terminal commands to run the backend and frontend concurrently. 
Ensure both servers are running for the full application experience.
