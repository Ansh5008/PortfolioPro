# Overview

This is a personal portfolio website for Ansh Kumar, showcasing his expertise in AI/ML and cybersecurity. Built with modern web technologies, the site features a dark, gothic-horror aesthetic designed to create an immersive and professional presentation of his work, experience, and technical capabilities. The portfolio includes sections for projects, experience, blog posts, open source contributions, and contact information, all optimized for performance and accessibility.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The application uses a React-based single-page application (SPA) built with Vite for fast development and optimized production builds. The frontend follows a component-based architecture with:

- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (TanStack Query) for server state management and caching
- **Styling**: Tailwind CSS with custom CSS variables for theming, implementing a gothic dark theme with blood-red accents
- **UI Components**: Radix UI primitives with shadcn/ui components for accessibility and consistency
- **Animations**: Framer Motion for smooth animations, parallax effects, and scroll-triggered reveals
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

## Backend Architecture
The backend is built on Express.js following a RESTful API pattern:

- **Server**: Express.js with TypeScript for type safety
- **Development**: Vite middleware integration for hot module replacement during development
- **Storage**: Memory-based storage implementation with interface abstraction for easy database migration
- **API Endpoints**: RESTful endpoints for contact form submissions with spam protection

## Data Storage
Currently implements an in-memory storage system with a well-defined interface pattern:

- **Storage Interface**: Abstract storage interface (IStorage) allowing for easy migration to different database systems
- **Memory Storage**: Current implementation using Maps for development and testing
- **Schema Definition**: Drizzle ORM schema definitions prepared for PostgreSQL migration
- **Validation**: Zod schemas for runtime type validation and data integrity

## Authentication and Authorization
The current implementation includes basic user schema definitions but no active authentication system, as this is a public portfolio site. The infrastructure is prepared for future authentication needs if required.

## External Dependencies

- **Database**: PostgreSQL (configured with Drizzle ORM, ready for deployment)
- **Cloud Infrastructure**: Prepared for deployment on platforms supporting Node.js
- **CDN Services**: Google Fonts for typography (Cormorant Garamond, Inter, JetBrains Mono)
- **Icon Library**: Font Awesome for consistent iconography
- **Email Service**: Contact form prepared for email service integration (currently logs to console)
- **Analytics**: Ready for integration with analytics services
- **Monitoring**: Prepared for error tracking and performance monitoring services