# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FlickLit is a full-stack TypeScript web application for book recommendations with swipe functionality. Users can view books and swipe right (like) or left (dislike) to train a recommendation system using OpenLibrary.org data.

**Architecture:**
- **Backend**: Express.js API server with JWT authentication
- **Frontend**: React SPA with HTTP client communication
- **Database**: Prisma ORM with SQLite (development) / MySQL (production)
- **Deployment**: Docker Compose stack with nginx reverse proxy

**Tech Stack:**
- **Backend**: Node.js, Express.js, TypeScript, Prisma ORM, JWT, bcrypt
- **Frontend**: React 18, TypeScript, Zustand (state management), React Router
- **Styling**: Tailwind CSS, Headless UI (accessible components)
- **Forms**: React Hook Form + Zod (validation)
- **Icons**: Heroicons
- **Build**: Vite (frontend), tsc (backend)
- **Quality**: ESLint, TypeScript strict mode
- **Infrastructure**: Docker, nginx, MySQL, Valkey (Redis-compatible)

## Development Setup

**Installation:**
```bash
yarn install
```

**Database Setup:**
```bash
yarn db:generate  # Generate Prisma client
yarn db:push      # Push schema to database
yarn db:seed      # Seed with sample data
```

**Development Commands:**
```bash
# Local Development (without Docker)
yarn dev                # Start both frontend and backend concurrently
yarn dev:frontend       # Start frontend only (Vite dev server)
yarn dev:backend        # Start backend only (Express server)
yarn build              # Build both frontend and backend
yarn build:frontend     # Build frontend only
yarn build:backend      # Build backend only
yarn typecheck          # Run TypeScript checks for both
yarn typecheck:frontend # Run TypeScript checks for frontend
yarn typecheck:backend  # Run TypeScript checks for backend
yarn lint               # Run ESLint
yarn lint:fix           # Fix ESLint issues
yarn db:studio          # Open Prisma Studio database viewer

# Docker Development
./dev-start.sh          # Start Docker development stack (Linux/macOS)
./dev-start.sh --logs   # Start and follow logs
./dev-stop.sh           # Stop Docker development stack
dev-start.bat           # Start Docker development stack (Windows)
dev-start.bat /logs     # Start and follow logs (Windows)
dev-stop.bat            # Stop Docker development stack (Windows)
```

**Data Import Commands:**
```bash
yarn import:authors                    # Download and import OpenLibrary authors
yarn import:authors:skip-download      # Import authors from existing file
yarn import:authors:force              # Force re-download authors file
yarn import:works                      # Download and import OpenLibrary works
yarn import:works:skip-download        # Import works from existing file  
yarn import:works:force                # Force re-download works file
```

## Architecture

**Directory Structure:**
```
src/
├── backend/                    # Express.js API server
│   ├── generated/             # Prisma client
│   ├── middleware/            # Express middleware (auth, etc.)
│   ├── models/                # TypeScript data model interfaces
│   ├── prisma/                # Database schema and seeds
│   ├── routes/                # API route handlers
│   ├── scripts/               # Data import scripts
│   ├── services/              # Business logic services
│   ├── types/                 # Type definitions
│   ├── utils/                 # Utility functions
│   └── server.ts              # Express server entry point
├── frontend/                   # React SPA
│   ├── api/                   # HTTP client for backend
│   ├── components/            # React components
│   ├── services/              # Frontend service layer
│   ├── store/                 # Zustand state management
│   ├── types/                 # Frontend type definitions
│   ├── utils/                 # Frontend utilities
│   └── main.tsx               # React app entry point
docker/                        # Docker configuration
├── backend/                   # Backend container config
├── frontend/                  # Frontend container config
├── mysql/                     # MySQL initialization
└── nginx/                     # Nginx proxy config
```

**Database Models:**
- `User` - User accounts with authentication
- `UserProfile` - Extended user preferences and settings
- `Author` - OpenLibrary author data (name, bio, birth/death dates, etc.)
- `Work` - OpenLibrary work data (title, description, subjects, languages, etc.)
- `AuthorWork` - Many-to-many relationship between authors and works with roles
- `UserInteraction` - User swipe data (liked/disliked works)

**API Architecture:**
- RESTful API with Express.js and TypeScript
- JWT-based authentication with secure password hashing
- Prisma ORM for database operations
- Zod validation for request/response schemas
- Health check endpoints for monitoring

**Frontend Architecture:**
- React SPA with TypeScript and functional components
- Zustand for client-side state management
- HTTP client service layer for API communication
- React Router for navigation
- Tailwind CSS + Headless UI for styling

**Data Flow:**
- Users authenticate via JWT tokens
- Frontend communicates with backend via HTTP API
- Users interact with books via swipe gestures
- Interactions stored in UserInteraction table
- Recommendation engine analyzes user preferences
- Book and author data imported from OpenLibrary.org dump files

**Import Scripts:**
- `src/backend/scripts/download-authors.ts` - Downloads and imports ~500K+ authors
- `src/backend/scripts/download-works.ts` - Downloads and imports millions of works + relationships
- Both scripts support progress reporting, resume capability, and transaction optimization

## Development Environments

**Local Development (Traditional):**
- Frontend: Vite dev server on http://localhost:5173
- Backend: Express server on http://localhost:3001
- Database: SQLite with WAL mode (`src/backend/prisma/dev.db`)
- Environment: Load from `.env` file

**Docker Development:**
- All services containerized with hot reload
- Frontend: http://localhost:8080 (via nginx proxy) or http://localhost:5173 (direct)
- Backend: http://localhost:3001
- Database: MySQL container on port 3306
- Cache: Valkey container on port 6379
- Environment: Load from `.env.docker.local`

**Docker Production:**
- Multi-stage builds for optimized images
- Frontend: Served by nginx (static build)
- Backend: Node.js production server
- Database: MySQL with performance tuning
- SSL/HTTPS support via nginx
- Environment: Load from `.env.docker.local`

## Important Notes

- Use yarn instead of npm
- Use single quotes for strings
- React components use functional components with hooks
- Use Zustand for state management (similar to Pinia)
- Backend uses Express.js with TypeScript and Prisma ORM
- JWT authentication with secure password hashing (bcrypt)
- Database arrays (subjects, alternateNames, etc.) are stored as JSON strings
- All models include createdAt/updatedAt timestamps
- Environment-based database configuration (SQLite local, MySQL production)
- SQLite configured with WAL mode for better concurrent performance
- Import scripts use transactions for optimal bulk insert performance
- Junction table follows Laravel convention: `author_work` (alphabetical order)
- Docker images use Ubuntu base (not Alpine) for better compatibility
- All containers run as non-root users for security