# AttackCapital Assessment

## Project Overview
This is a full-stack web application developed as part of an assessment for Attack Capital. The application consists of a backend built with Node.js and Express, and a frontend built with Next.js 14 and TypeScript. MongoDB is used as the database.

## Tech Stack
- **Frontend:** Next.js 14, TypeScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT-based authentication

## Folder Structure
```
AttackCapital/
│-- backend/            # Backend code (Node.js, Express)
│   ├── config/         # Configuration files
│   ├── controllers/    # API request handlers
│   ├── middleware/     # Authentication & other middlewares
│   ├── models/         # Mongoose models
│   ├── routes/         # Express routes
│   ├── index.js        # Entry point
│   ├── package.json    # Backend dependencies
│-- frontend/           # Frontend code (Next.js 14, TypeScript)
│   ├── app/            # Next.js App Router
│   ├── components/     # Reusable UI components
│   ├── lib/            # Utility functions
│   ├── next.config.ts  # Next.js configuration
│   ├── package.json    # Frontend dependencies
│   ├── tailwind.config.js # Tailwind CSS configuration
│   ├── tsconfig.json   # TypeScript configuration
│-- .gitignore          # Git ignore file
│-- README.md           # Project documentation
```

## Setup Instructions
### Prerequisites
Ensure you have the following installed:
- Node.js (>= 16)
- MongoDB (running locally or a cloud instance)

### Clone the Repository
```sh
git clone https://github.com/vanamkarthiknetha/AttackCapital.git
cd AttackCapital
```

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add:
   ```env
   MONGO_URI=mongodb://localhost:27017/AttackCapital  
   PORT=4000
   JWT_SECRET=secret123
   ```
4. Start the backend server :
   ```sh
   npm run start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the `frontend` directory and add:
   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
   ```
4. Start the frontend server:
   ```sh
   npm run dev
   ```

## Running the Application
Once both backend and frontend servers are running, visit:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4000

## Available Scripts
### Backend
- `npm run start` - Start the backend server

### Frontend
- `npm run dev` - Start the Next.js development server
- `npm run build` - Build the frontend for production
- `npm run start` - Start the production frontend server

## Features Implemented
- User Authentication (Signup/Login)
- JWT-based Authentication
- CRUD operations for posts
- Filtering posts by author

## Notes
- Ensure MongoDB is running locally or update `MONGO_URI` in the `.env` file to a remote MongoDB instance.
- If using a different port for the backend, update `NEXT_PUBLIC_BACKEND_URL` in the frontend `.env` file accordingly.

## License
This project is for assessment purposes only.

---

