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

### Activity Logs

#### `POST /logs`
Create a new activity log entry.


#### `GET /logs`
Retrieve activity logs with sorting and pagination.


### Statistics

#### `GET /stats/summary`

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