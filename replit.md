# Overview

This is a full-stack web3 application for VFYZ token presale and proof-of-location rewards system. The application combines a blockchain-based presale platform with a location verification system that rewards users with tokens for proving their physical presence at specific locations. Users can purchase VFYZ tokens during the presale phase and later earn additional tokens by submitting location proofs with GPS coordinates and device signatures.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite for build tooling
- **Routing**: Wouter for client-side routing
- **UI Components**: Shadcn/UI component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query for server state management
- **Web3 Integration**: Custom Web3 hook for wallet connection (MetaMask)

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API with structured route handlers
- **Storage Layer**: Abstracted storage interface with in-memory implementation (MemStorage)
- **Database Ready**: Drizzle ORM configured for PostgreSQL with migration support
- **Development**: Vite integration for hot module replacement in development

## Data Storage Solutions
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Three main entities - users, presale transactions, and proof submissions
- **Migrations**: Automated database migrations through Drizzle Kit
- **Validation**: Zod schemas for type-safe data validation
- **Current Implementation**: In-memory storage for development/testing

## Database Schema Design
- **Users**: Stores user profiles with username, wallet address, email, and notification preferences
- **Presale Transactions**: Tracks token purchases with USD amounts, VFYZ tokens, transaction hashes, and status
- **Proof Submissions**: Records location verification attempts with GPS coordinates, device signatures, and reward amounts

## Authentication and Authorization
- **Web3 Authentication**: Wallet-based authentication using MetaMask
- **User Management**: Users identified by wallet addresses with optional username/email
- **Session Handling**: Prepared for session management with connect-pg-simple

## External Dependencies
- **Blockchain**: Neon Database serverless PostgreSQL for production
- **UI Framework**: Radix UI primitives for accessible components
- **Build Tools**: Vite for frontend bundling, ESBuild for server bundling
- **Development**: Replit-specific plugins for development environment integration
- **Styling**: Google Fonts (Inter, Architects Daughter, DM Sans, Fira Code, Geist Mono)