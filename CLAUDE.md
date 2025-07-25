# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FlickLit is a TypeScript web application for book recommendations with swipe functionality. Users can view books and swipe right (like) or left (dislike) to train a recommendation system using OpenLibrary.org data.

**Tech Stack:**
- TypeScript
- Vue 3 (Options API)
- Pinia (state management) 
- Vue Router
- Prisma ORM with SQLite
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

## Architecture

**Database Models:**
- `Author` - OpenLibrary author data (name, bio, birth/death dates, etc.)
- `Work` - OpenLibrary work data (title, description, subjects, languages, etc.)
- `WorkAuthor` - Many-to-many relationship between works and authors
- `UserInteraction` - User swipe data (liked/disliked works)

**Key Directories:**
- `src/models/` - TypeScript interfaces for data models
- `prisma/` - Database schema and migrations
- `prisma/schema.prisma` - Main database schema file

**Data Flow:**
- Users interact with books via swipe gestures
- Interactions are stored in UserInteraction table
- Recommendation algorithm uses liked/disliked works to suggest similar books
- Book data comes from OpenLibrary.org API integration (to be implemented)

## Important Notes

- Use yarn instead of npm
- Use single quotes for strings
- Vue components should use Options API, not Composition API
- Database arrays (subjects, alternateNames, etc.) are stored as JSON strings in SQLite
- All models include createdAt/updatedAt timestamps