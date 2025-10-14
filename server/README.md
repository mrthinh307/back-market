# Back Market - Server (Backend)

NestJS backend application for Back Market platform using Prisma ORM and Neon PostgreSQL database.

## 🛠️ Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL (Neon Cloud)
- **ORM**: Prisma
- **Authentication**: JWT
- **OAuth**: Google, Facebook
- **Language**: TypeScript

## 📋 System Requirements

- **Node.js**: >= 22.0.0
- **Yarn**: >= 1.22.0 (recommended)
- **Neon Database**: Account and database created on [Neon](https://neon.tech)

## 🚀 Getting Started

### 1. Install dependencies
```bash
yarn install
```

### 2. Environment Configuration
Create `.env` file in the root directory:
```bash
# Copy from .env.example if available
cp .env.example .env

# Or create new .env file with content:
DATABASE_URL=
# uncomment next line if you use Prisma <5.10
# DATABASE_URL_UNPOOLED=
PORT=
NODE_ENV=
FRONTEND_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
FACEBOOK_CALLBACK_URL=
```

### 3. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migration
yarn prisma:dev:deploy

# Or push schema directly (development only)
npx prisma db push
```

### 4. Start Development Server
```bash
# Development mode with hot reload
yarn start:dev

# Debug mode
yarn start:debug

# Production mode
yarn start:prod
```

Server will run at: `http://localhost:8888`

## 🗄️ Database Management (Neon)

### Get Connection String from Neon
1. Login to [Neon Console](https://console.neon.tech)
2. Select your database project
3. Go to **Connection Details** tab
4. Copy **Connection string** 
5. Paste into `.env` file with key `DATABASE_URL`

### Prisma Commands
```bash
# Generate Prisma client
npx prisma generate

# Run migration to Neon database
yarn prisma:dev:deploy

# Reset database (careful - development only)
npx prisma migrate reset

# View current schema
npx prisma db pull

# Push schema changes directly (without creating migration)
npx prisma db push

# Open Prisma Studio to view and edit data
npx prisma studio

# Generate ERD schema image
npx prisma generate
```

### Database Scripts
```bash
# Start development database (if using Docker)
yarn db:dev:up

# Restart development database
yarn db:dev:restart

# Remove development database
yarn db:dev:rm

# Deploy migrations
yarn prisma:dev:deploy
```

## 🧪 Testing

### Unit Tests
```bash
# Run all tests
yarn test

# Run specific test file
yarn test auth.service.spec.ts

# Watch mode
yarn test:watch

# Test coverage
yarn test:cov
```

### E2E Tests
```bash
# Run E2E tests (needs test database)
yarn test:e2e

# Run E2E tests with Nenon 
yarn test:e2e

# Note: E2E tests may use separate test database or mocks (testing Branch in NEON)
```

## 🛠️ Development Tools

### Code Quality
```bash
# Linting
yarn lint

# Formatting
yarn format

# Build project
yarn build
```

### Database Tools
```bash
# Open Prisma Studio for database management
npx prisma studio

# Backup database
npx prisma db seed

# Import data from SQL file
npx prisma db execute --file=./backup.sql
```

## 📁 Project Structure

```
server/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── auth/              # Authentication module
│   ├── common/            # Shared utilities
│   ├── prisma/            # Prisma service
│   └── user/              # User module
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── migrations/        # Database migrations
│   └── erd.svg           # Entity Relationship Diagram
├── test/                  # E2E tests
├── .env                   # Environment variables
├── docker-compose.yml     # Docker configuration
└── package.json
```

## 🔧 Environment Variables

Create `.env` file:
```env
# Neon Database Connection
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key"

# Server Configuration
NODE_ENV="development"
PORT=8888

# Optional: OAuth configurations
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
FACEBOOK_CLIENT_ID="your-facebook-client-id"
FACEBOOK_CLIENT_SECRET="your-facebook-client-secret"
```

## 📖 API Documentation

Server API documentation can be accessed at: `http://localhost:8888/api` (if Swagger is configured)

## 🚀 Production Deployment

### Build for Production
```bash
yarn build
```

### Start Production Server
```bash
yarn start:prod
```

### Environment Variables for Production
Ensure these environment variables are set in production:
- `DATABASE_URL`: Neon production database connection string
- `JWT_SECRET`: Strong JWT secret key
- `NODE_ENV`: "production"
- `PORT`: Server port (default: 8888)

## 🔍 Troubleshooting

### Database Connection Issues
```bash
# Check DATABASE_URL in .env
cat .env

# Test connection with Prisma
npx prisma db pull

# Check network connectivity to Neon
ping your-neon-host.neon.tech
```

### Prisma Issues
```bash
# Regenerate Prisma client
npx prisma generate

# Reset and sync schema
npx prisma migrate reset
npx prisma db push

# Clear Prisma cache
rm -rf node_modules/.prisma
yarn install
npx prisma generate
```

### General Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules
yarn install

# Check for TypeScript errors
yarn build

# Check server logs
yarn start:dev
```

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Add tests
4. Run linting and tests
5. Submit pull request

## 📝 Notes

- Always use SSL connection for Neon database (sslmode=require)
- Ensure stable internet connection for Neon database access
- Use environment variables for sensitive configuration
- Run migrations before starting the server
- Use Prisma Studio for database visualization and management
