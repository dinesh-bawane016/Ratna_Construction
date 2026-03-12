# Ratna Construction App

A responsive React web application built for managing construction field records, specifically identifying and submitting Daily Progress Reports (DPR).

## Features Implemented

1. **Login Screen (`/login`)**
   - Mock authentication system.
   - Credentials: `test@test.com` / `123456`.
   - Client-side error validation and styling.

2. **Project List Screen (`/projects`)**
   - Protected route.
   - Dynamic rendering of project cards from a static JSON data source.
   - Color-coded status badges.
   - **Bonus Feature:** Project search and status filtering logic included.
   - Click to proceed to the specific DPR form.

3. **Daily Progress Report (DPR) Form (`/projects/:id/dpr`)**
   - Context-aware header indicating the project ID.
   - Form inputs: Date, Weather dropdown, Total Worker Count, and Description text area.
   - Client-side form validation for required fields, min lengths, and valid numbers.
   - Photo File Upload matching constraint rules (max 3 images).
   - In-memory `URL.createObjectURL` based photo previews.
   - Mock simulated async submission mechanism showing a success view on submit.

4. **Architecture & Styling**
   - Built with Vite + React 19.
   - Modern Context API implementation (`AuthContext.jsx`) for state management without prop drilling.
   - Client-side routing with `react-router-dom` v7.
   - Configured with Tailwind CSS v4 using the brand new Vite plugin for deep integration.
   - Fully responsive UI (mobile-first, tablet, scalable desktop presentation).

## Tech Stack

- **Framework**: React.js (via Vite)
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM (v7)
- **Icons**: Lucide React
- **Utility**: `clsx`, `tailwind-merge`

## Setup and Running Instructions

1. **Prerequisites**
   Ensure you have Node.js installed (v18+ recommended).

2. **Installation**
   ```bash
   npm install
   ```

3. **Running the Development Server**
   ```bash
   npm run dev
   ```
   The application won't automatically pop out, please open `http://localhost:5173/` inside your browser to see the app.

4. **Building for Production**
   ```bash
   npm run build
   ```

## Known Issues / Limitations
- Authentication is purely localized. In a live system, this should connect to a backend via Axios or Fetch APIs.
- The photo uploaded files are not converted to Base64 or FormData to a server, this app solely uses client-side Object URLs for preview visualization.
- The state changes of the DPR submission are not actually mutating the project JSON source file layout.
