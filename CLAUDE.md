# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FlickLit is a TypeScript web application for book recommendations with swipe functionality. Users can view books and swipe right (like) or left (dislike) to train a recommendation system using OpenLibrary.org data.

**Tech Stack:**
- TypeScript
- React 18
- Zustand (state management)
- React Router
- Prisma ORM with SQLite/MySQL
- Vite (build tool)
- ESLint

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
yarn dev          # Start development server
yarn build        # Build for production
yarn preview      # Preview production build
yarn typecheck    # Run TypeScript checks
yarn lint         # Run ESLint
yarn lint:fix     # Fix ESLint issues
yarn db:studio    # Open Prisma Studio database viewer
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

**Database Models:**
- `Author` - OpenLibrary author data (name, bio, birth/death dates, etc.)
- `Work` - OpenLibrary work data (title, description, subjects, languages, etc.)
- `AuthorWork` - Many-to-many relationship between authors and works with roles
- `UserInteraction` - User swipe data (liked/disliked works)

**Key Directories:**
- `src/models/` - TypeScript interfaces for data models
- `src/utils/` - Utility functions (JSON parsing, etc.)
- `scripts/` - Data import scripts for OpenLibrary dumps
- `prisma/` - Database schema and migrations
- `data/` - Downloaded dump files (gitignored)

**Data Flow:**
- Users interact with books via swipe gestures
- Interactions are stored in UserInteraction table
- Recommendation algorithm uses liked/disliked works to suggest similar books
- Book and author data imported from OpenLibrary.org dump files

**Import Scripts:**
- `scripts/download-authors.ts` - Downloads and imports ~500K+ authors from OpenLibrary
- `scripts/download-works.ts` - Downloads and imports millions of works + author relationships
- Both scripts support progress reporting, resume capability, and transaction optimization

## Important Notes

- Use yarn instead of npm
- Use single quotes for strings
- React components use functional components with hooks
- Use Zustand for state management (similar to Pinia)
- Database arrays (subjects, alternateNames, etc.) are stored as JSON strings in SQLite/MySQL
- All models include createdAt/updatedAt timestamps
- Environment-based database configuration (SQLite local, MySQL production)
- SQLite configured with WAL mode for better concurrent performance
- Import scripts use transactions for optimal bulk insert performance
- Junction table follows Laravel convention: `author_work` (alphabetical order)