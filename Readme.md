# Back Market

Back Market is a fullstack application built with Next.js 15 (Frontend) and NestJS (Backend), using PostgreSQL as the database.

## 🏗️ Project Structure

```
back-market/
├── client/          # Frontend (Next.js 15 + TypeScript) - See client/README.md
├── server/          # Backend (NestJS + Prisma) - See server/README.md
└── README.md        # This documentation
```

## 📋 System Requirements

- **Node.js**: >= 22.0.0
- **Yarn**: >= 1.22.0 (recommended)
- **Neon Database**: Account and database created on [Neon](https://neon.tech)

## 🚀 Quick Start

### 1. Clone the project

```bash
git clone <repository-url>
cd back-market
```

### 2. Start Server (Backend)

See detailed instructions in [server/README.md](./server/README.md)

```bash
cd server
yarn install
# Configure .env file with Neon database connection
yarn start:dev
```

Server will run at: `http://localhost:8888`

### 3. Start Client (Frontend)

See detailed instructions in [client/README.md](./client/README.md)

```bash
cd client
yarn install
# Configure .env.local file
yarn dev
```

Client will run at: `http://localhost:3000`

## 📚 Documentation

- **🖥️ Backend Documentation**: [server/README.md](./server/README.md)

  - NestJS setup and configuration
  - Database management with Prisma and Neon
  - API development and testing
  - Authentication and security

- **💻 Frontend Documentation**: [client/README.md](./client/README.md)
  - Next.js 15 setup and configuration
  - UI components and styling with Tailwind CSS
  - Testing with Vitest and Playwright
  - Internationalization and performance

## 🛠️ Tech Stack

### Backend (Server)

- **Framework**: NestJS
- **Database**: PostgreSQL (Neon Cloud)
- **ORM**: Prisma
- **Authentication**: JWT
- **Language**: TypeScript

### Frontend (Client)

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Shadcn/ui
- **Testing**: Vitest, Playwright
- **Build Tool**: Turbopack

### Overview about project

- **Server**: See [server/README.md#environment-variables](./server/README.md#🔧-environment-variables)
- **Client**: See [client/README.md#environment-variables](./client/README.md#🔍-environment-variables)

## 🚀 Production Deployment

### Backend Production

```bash
cd server
yarn build
yarn start:prod
```

### Frontend Production

```bash
cd client
yarn build
yarn start
```

## � Development Workflow

1. **Setup**: Follow quick start guide above
2. **Backend Development**: Work in `server/` directory, see [server/README.md](./server/README.md)
3. **Frontend Development**: Work in `client/` directory, see [client/README.md](./client/README.md)
4. **Testing**: Run tests in respective directories
5. **Integration**: Test full application with both services running

## 🔍 Troubleshooting

For specific troubleshooting guides:

- **Backend Issues**: See [server/README.md#troubleshooting](./server/README.md#🔍-troubleshooting)
- **Frontend Issues**: See [client/README.md#troubleshooting](./client/README.md#🔍-troubleshooting)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/mrthinh307/back-market?utm_source=oss&utm_medium=github&utm_campaign=mrthinh307%2Fback-market&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)
