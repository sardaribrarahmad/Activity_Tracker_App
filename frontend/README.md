# Activity Tracker Frontend

Modern React application for the Activity Dashboard Mini App, built with Vite.

## Features

- **Login Page** - Email/password authentication
- **Dashboard** - Comprehensive activity tracking interface
- **Summary Cards** - Real-time statistics display
  - Total Activities
  - Total Value
  - Most Common Action Type
  - Most Active User
- **Activity Table** - Sortable and paginated activity logs
- **Add Log Modal** - Create new activity entries
- **Responsive Design** - Mobile-friendly UI

## Tech Stack

- React 18
- React Router DOM 6
- Vite (build tool)
- Axios (HTTP client)
- Modern CSS with gradients and animations

## Development

### Prerequisites

- Node.js 18+ and npm

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:4000
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Docker

Build and run with Docker Compose (from project root):

```bash
docker-compose up --build
```

Or build the frontend image separately:

```bash
docker build -t activity-tracker-frontend --build-arg VITE_API_URL=http://localhost:4000 ./frontend
docker run -p 3000:3000 activity-tracker-frontend
```

## Project Structure

```
frontend/
├── src/
│   ├── components/        # React components
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── SummaryCards.jsx
│   │   ├── ActivityTable.jsx
│   │   └── AddLogModal.jsx
│   ├── services/          # API service layer
│   │   └── api.js
│   ├── App.jsx            # Main app component with routing
│   ├── main.jsx           # Entry point
│   ├── index.css          # Global styles
│   └── App.css            # App-level styles
├── public/                # Static assets
├── Dockerfile            # Multi-stage Docker build
├── vite.config.js        # Vite configuration
├── package.json
└── README.md
```

## Features Details

### Authentication

- Simple email/password login
- Session persistence via localStorage
- Protected routes
- Automatic redirect to dashboard after login

### Dashboard

- Real-time data fetching
- Auto-refresh after adding new logs
- Loading states and error handling

### Activity Table

- Sortable columns (timestamp, value, user, action_type)
- Pagination support
- Responsive design
- Empty state handling

### Add Log Modal

- Form validation
- All required fields
- Optional timestamp (defaults to current time)
- Error handling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The frontend makes API calls to the backend service
- CORS is enabled on the backend for local development
- Environment variables must be prefixed with `VITE_` to be accessible in Vite apps
- The API URL is configured at build time for production Docker builds

