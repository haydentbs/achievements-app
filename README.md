# MilestoneTracker

A web application for tracking personal milestones, sharing achievements, and comparing progress with others.

## Backend Setup

### Prerequisites

- [Deno](https://deno.land/) (v1.37.0 or later)
- [PostgreSQL](https://www.postgresql.org/) (v15 or later)
- [Docker](https://www.docker.com/) (optional, for containerized setup)

### Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file with your database credentials and JWT secret.

### Running with Docker

The easiest way to get started is using Docker Compose:

```bash
docker-compose up -d
```

This will start both the PostgreSQL database and the web application.

### Manual Setup

1. Start a PostgreSQL database server.

2. Set up the database schema:
   ```bash
   deno task setup-db
   ```

3. Start the development server:
   ```bash
   deno task start
   ```

The application will be available at http://localhost:8000.

## API Endpoints

The backend provides the following API endpoints:

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Milestones
- `GET /api/milestones` - Get milestones (public or user's own)
- `POST /api/milestones` - Create a new milestone
- `GET /api/milestones/:id` - Get a specific milestone
- `PUT /api/milestones/:id` - Update a milestone
- `DELETE /api/milestones/:id` - Delete a milestone

### Goals
- `GET /api/goals` - Get user's goals
- `POST /api/goals` - Create a new goal
- `GET /api/goals/:id` - Get a specific goal
- `PUT /api/goals/:id` - Update a goal
- `DELETE /api/goals/:id` - Delete a goal

### Feed
- `GET /api/feed` - Get personalized feed of milestones
- `GET /api/feed/following` - Get feed of followed users' milestones

## Frontend Integration

The backend is designed to work seamlessly with the Fresh frontend. API endpoints return JSON data that can be consumed by the frontend components.

## Development

During development, the server will automatically reload when you make changes to the code.
