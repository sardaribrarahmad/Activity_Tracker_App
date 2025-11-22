# Activity Tracker Backend API

RESTful API for the Activity Dashboard Mini App built with Express.js and MongoDB.

## Features

- User authentication (hardcoded credentials)
- Activity log CRUD operations
- Summary statistics aggregation
- Health check endpoint
- Docker containerization support

## API Endpoints

### Authentication

#### `POST /auth/login`
Authenticate a user with email and password.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "email": "admin@example.com"
  }
}
```

**Hardcoded Users:**
- `admin@example.com` / `admin123`
- `user@example.com` / `user123`

### Activity Logs

#### `POST /logs`
Create a new activity log entry.

**Request Body:**
```json
{
  "user": "John Doe",
  "action_type": "created",
  "description": "Created a new project",
  "value": 100,
  "timestamp": "2024-01-15T10:30:00Z" // Optional, defaults to current time
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "user": "John Doe",
    "action_type": "created",
    "description": "Created a new project",
    "value": 100,
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

#### `GET /logs`
Retrieve activity logs with sorting and pagination.

**Query Parameters:**
- `sortBy` - Field to sort by (`timestamp`, `value`, `user`, `action_type`). Default: `timestamp`
- `sortOrder` - Sort direction (`asc` or `desc`). Default: `desc`
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

**Example:**
```
GET /logs?sortBy=value&sortOrder=desc&page=1&limit=20
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### Statistics

#### `GET /stats/summary`
Get summary statistics for all activity logs.

**Response:**
```json
{
  "success": true,
  "data": {
    "total_activities": 150,
    "total_value": 15000,
    "most_common_action": "created",
    "most_active_user": "John Doe"
  }
}
```

### Health Check

#### `GET /health`
Check if the API is running.

**Response:**
```json
{
  "status": "ok"
}
```

## Environment Variables

- `PORT` - Server port (default: 4000)
- `MONGO_URI` - MongoDB connection string (default: `mongodb://localhost:27017/activity_db`)
- `NODE_ENV` - Environment mode (`development` or `production`)

## Development

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Start MongoDB locally or use Docker:
```bash
docker run -d -p 27017:27017 --name mongo mongo:7.0
```

3. Set environment variables (optional):
```bash
export MONGO_URI=mongodb://localhost:27017/activity_db
export PORT=4000
```

4. Run the server:
```bash
npm run dev  # With nodemon for auto-reload
# or
npm start    # Production mode
```

### Docker

Build and run with Docker Compose:
```bash
docker-compose up --build
```

Or build the backend image separately:
```bash
docker build -t activity-tracker-backend ./backend
docker run -p 4000:4000 --env-file .env activity-tracker-backend
```

## Project Structure

```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   │   ├── authController.js
│   │   ├── logController.js
│   │   └── statsController.js
│   ├── models/          # Database models
│   │   └── ActivityLog.js
│   ├── routes/          # API routes
│   │   ├── authRoutes.js
│   │   ├── logRoutes.js
│   │   └── statsRoutes.js
│   ├── middleware/      # Custom middleware
│   │   └── errorHandler.js
│   └── index.js         # Application entry point
├── Dockerfile
├── .dockerignore
├── package.json
└── README.md
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (in development mode)"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `500` - Internal Server Error

24970hp5cNBzqZFF
sardaribrar7688_db_user