# 🛍️ BackMarket‑style E‑commerce

<p>
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" alt="Status"/>
  <img src="https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge" alt="Version"/>
  <img src="https://img.shields.io/github/stars/mrthinh307/back-market?style=for-the-badge" alt="Stars"/>
</p>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" alt="Next.js"/></a>
  <a href="https://nestjs.com/"><img src="https://img.shields.io/badge/NestJS-red?logo=nestjs" alt="NestJS"/></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-blue?logo=typescript&logoColor=white" alt="TypeScript"/></a>
  <a href="https://prisma.io/"><img src="https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white" alt="Prisma"/></a>
  <a href="https://postgresql.org/"><img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL"/></a>
  <a href="https://neon.tech/"><img src="https://img.shields.io/badge/Neon-00E599?logo=neon&logoColor=white" alt="Neon"/></a>
  <a href="https://docker.com/"><img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white" alt="Docker"/></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/></a>
  <a href="https://www.elastic.co/"><img src="https://img.shields.io/badge/Elasticsearch-005571?logo=elasticsearch&logoColor=white" alt="Elasticsearch"/></a>
  <a href="https://ui.shadcn.com/"><img src="https://img.shields.io/badge/shadcn%2Fui-000000?logo=shadcnui&logoColor=white" alt="shadcn/ui"/></a>
  <a href="https://github.com/features/copilot"><img src="https://img.shields.io/badge/GitHub_Copilot-000000?logo=github&logoColor=white" alt="GitHub Copilot"/></a>
  <a href="https://www.atlassian.com/software/jira"><img src="https://img.shields.io/badge/Jira-0052CC?logo=jira&logoColor=white" alt="Jira"/></a>
  <a href="https://coderabbit.ai"><img src="https://img.shields.io/coderabbit/prs/github/mrthinh307/back-market?utm_source=oss&utm_medium=github&utm_campaign=mrthinh307%2Fback-market&labelColor=171717&color=FF570A&label=CodeRabbit+Reviews" alt="CodeRabbit"/></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT License"/></a>


## 📋 Table of Contents

- [📖 Overview](#-overview)
- [✨ Goals & Key Features](#-goals--key-features)
- [🏗️ Project Structure](#️-project-structure)
- [📋 System Requirements](#-system-requirements)
- [🚀 Quick Start](#-quick-start)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Production Deployment](#-production-deployment)
- [⚙️ Quality & CI/CD](#️-quality--cicd)
- [👥 Core Team](#-core-team)

## 📖 Overview

<div align="center">
  <img src="https://1000logos.net/wp-content/uploads/2023/11/Back-Market-Logo.jpg" alt="Project Banner" width="60%"/>
</div>

<br/>

🎯 **A modern e-commerce platform inspired by Back Market** - A comprehensive marketplace solution for refurbished electronics and pre-owned gadgets, designed to provide users with a reliable, affordable, and trustworthy platform for buying and selling certified second-hand devices.

## ✨ Goals & Key Features

<table>
  <tr>
    <td align="center" width="100%">
      <h3>🔍 Smart Search</h3>
      <p>Advanced search with Elasticsearch algorithm and multi-filter options</p>
    </td>
  </tr>
  <tr>
    <td align="center" width="100%">
      <h3>⚡ Fast Performance</h3>
      <p>Optimized for speed with modern tech stack and efficient data handling</p>
    </td>
  </tr>
  <tr>
    <td align="center" width="100%">
      <h3>🎨 Modern UI/UX</h3>
      <p>Clean, professional interface with seamless user experience</p>
    </td>
  </tr>
  <tr>
    <td align="center" width="100%">
      <h3>🔧 Complex Management</h3>
      <p>Sophisticated product variant and pricing management system</p>
    </td>
  </tr>
</table>

### 🚀 Key Capabilities

- **🔍 Flexible Product Selection**: Detailed and flexible product type selection with specific variations
- **⚡ Advanced Search & Filtering**: Fast, accurate search with combination filters (condition, storage, color, carrier, battery health...)
- **⚙️ Complex Product Management**: Intricate product variants and attributes with dynamic pricing
- **🎨 Modern & User-Friendly Interface**: Clean, professional UI for seamless experience across all devices
- **🔐 Secure Authentication**: JWT-based auth with OAuth2 integration (Facebook & Google)
- **📊 Data Analytics**: Comprehensive analytics and reporting capabilities

## 🏗️ Project Structure

```
back-market/
├── 📁 client/                 # Frontend Application (Next.js 15)
│   ├── 📁 src/
│   │   ├── 📁 app/           # Next.js App Router
│   │   ├── 📁 components/    # Reusable UI Components
│   │   ├── 📁 hooks/         # Custom React Hooks
│   │   └── 📁 libs/          # Utility Libraries
│   └── 📄 package.json
│
├── 📁 server/                 # Backend Application (NestJS)
│   ├── 📁 src/
│   │   ├── 📁 auth/          # Authentication Module
│   │   ├── 📁 prisma/        # Database Schema & Config
│   │   └── 📁 product/       # Product Management
│   ├── 📁 prisma/            # Prisma Schema & Migrations
│   └── 📄 package.json
│
└── 📄 README.md              # Project Documentation
```

### 📊 Data Flow Architecture

```mermaid
graph TD
    A[🌐 Client<br/>Next.js 15] --> B[🚀 API Gateway<br/>NestJS]
    B --> C[(📊 PostgreSQL<br/>Neon Cloud)]
    B --> D[🔍 Elasticsearch<br/>Search Engine]
    C --> E[⚡ Prisma ORM]
    D --> F[🎯 Advanced Search]
```

---

## 📋 System Requirements

| Component | Version | Notes |
|-----------|---------|-------|
| **Node.js** | ≥ 22.0.0 | Required for both client and server |
| **Yarn** | ≥ 1.22.0 | Recommended package manager |
| **PostgreSQL** | Latest | Hosted on Neon Cloud |
| **Docker** | Latest | For containerized development |

---

## 🚀 Quick Start

### ⚡ One-Command Setup

```bash
git clone https://github.com/mrthinh307/back-market.git
cd back-market
yarn install && yarn dev
```

### 📊 Detailed Setup

#### 1. 📥 Clone & Install
```bash
git clone https://github.com/mrthinh307/back-market.git
cd back-market
corepack enable
yarn install
```

#### 2. 🔧 Environment Setup
```bash
# Copy environment files
cp client/.env.example client/.env.local
cp server/.env.example server/.env
```

#### 3. 🐳 Docker Development
```bash
# Start development stack
yarn docker:up
```

#### 4. 🗄️ Database Setup
```bash
cd server
npx prisma generate
npx prisma db push
```

#### 5. ▶️ Run Applications

**Terminal A - Backend:**
```bash
cd server
yarn dev
```
📍 **Server**: `http://localhost:8888`

**Terminal B - Frontend:**
```bash
cd client
yarn dev
```
📍 **Client**: `http://localhost:3000`

## 🛠️ Tech Stack

### 🖥️ Backend (Server)

| Technology | Purpose | Details |
|------------|---------|---------|
| **NestJS** | Framework | Progressive Node.js framework |
| **TypeScript** | Language | Type-safe JavaScript |
| **Prisma** | ORM | Next-gen database toolkit |
| **PostgreSQL** | Database | Robust relational database |
| **JWT** | Authentication | Secure token-based auth |
| **Elasticsearch** | Search | Advanced search capabilities |
| **Jest** | Testing | Comprehensive API testing |

### 💻 Frontend (Client)

| Technology | Purpose | Details |
|------------|---------|---------|
| **Next.js 15** | Framework | React framework with App Router |
| **TypeScript** | Language | Type-safe development |
| **Tailwind CSS 4** | Styling | Utility-first CSS framework |
| **shadcn/ui** | Components | Modern UI component library |
| **Vitest** | Testing | Fast unit testing |
| **Playwright** | E2E Testing | Cross-browser testing |

## 🚀 Production Deployment

### Backend Deployment

```bash
cd server
yarn build
yarn start:prod
```

### Frontend Deployment

```bash
cd client
yarn build
yarn start
```

### Docker Deployment

```bash
# Build and run production containers
docker-compose -f docker-compose.prod.yml up -d
```

## ⚙️ Quality & CI/CD

### 🛠️ Development Tools

- **🧹 Code Quality**: ESLint, Prettier, TypeScript strict mode
- **📝 Commit Standards**: Conventional commits with Commitlint
- **🔧 Automation**: Lefthook for pre-commit hooks
- **🤖 Code Review**: CodeRabbit AI-powered reviews
- **💡 Collaboration**: GitHub Actions, CODEOWNERS, Dependabot

### 🔄 CI/CD Pipeline

```mermaid
flowchart LR
    A[👨‍💻 Developer<br/>Commit] --> B[🔍 Lefthook<br/>Pre-commit]
    B --> C[📝 Commitlint<br/>Message Check]
    C --> D[📤 Push to<br/>GitHub]
    
    D --> E[⚡ GitHub Actions<br/>CI Pipeline]
    E --> F[🤖 CodeRabbit<br/>AI Review]
    
    F --> G[✅ PR Approved<br/>≥2 Reviewers]
    G --> H[🔀 Squash & Merge<br/>to main]
    H --> I[🚀 Auto Deploy<br/>Production]
    
    J[📊 Code Quality<br/>ESLint/Prettier] --> E
    K[🧪 Testing<br/>Jest/Vitest] --> E
    L[🔍 Security<br/>Dependabot] --> E
```

## 👥 Core Team

<div align="center">
  <h3>🌟 Meet Our Amazing Team</h3>
  <p><em>Passionate developers building the future of e-commerce</em></p>
</div>

<div align="center">
<table style="margin: 0 auto; border-collapse: collapse; border: 2px solid #ddd; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 12px rgba(0,0,0,0.15);">
  <tr>
    <td align="center" style="border: 1px solid #ddd; padding: 20px; width: 220px; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
      <a href="https://github.com/mrthinh307" style="text-decoration: none; color: inherit;">
        <img src="https://github.com/mrthinh307.png" width="90px" style="border-radius: 50%; border: 3px solid #4CAF50; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" alt=""/><br />
        <strong style="font-size: 16px; color: #2c3e50;">Duy Thinh</strong><br />
        <em style="color: #7f8c8d; font-size: 14px;">PM & Fullstack Developer</em>
      </a>
    </td>
    <td align="center" style="border: 1px solid #ddd; padding: 20px; width: 220px; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
      <a href="https://github.com/Hiisam17" style="text-decoration: none; color: inherit;">
        <img src="https://github.com/Hiisam17.png" width="90px" style="border-radius: 50%; border: 3px solid #2196F3; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" alt=""/><br />
        <strong style="font-size: 16px; color: #2c3e50;">Khanh Toan</strong><br />
        <em style="color: #7f8c8d; font-size: 14px;">Frontend Developer</em>
      </a>
    </td>
    <td align="center" style="border: 1px solid #ddd; padding: 20px; width: 220px; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
      <a href="https://github.com/mingg23805" style="text-decoration: none; color: inherit;">
        <img src="https://github.com/mingg23805.png" width="90px" style="border-radius: 50%; border: 3px solid #FF9800; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" alt=""/><br />
        <strong style="font-size: 16px; color: #2c3e50;">Ngoc Minh</strong><br />
        <em style="color: #7f8c8d; font-size: 14px;">Data Engineer</em>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center" style="border: 1px solid #ddd; padding: 20px; width: 220px; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
      <a href="https://github.com/mtuong1031" style="text-decoration: none; color: inherit;">
        <img src="https://github.com/mtuong1031.png" width="90px" style="border-radius: 50%; border: 3px solid #9C27B0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" alt=""/><br />
        <strong style="font-size: 16px; color: #2c3e50;">Minh Tuong</strong><br />
        <em style="color: #7f8c8d; font-size: 14px;">Frontend Developer</em>
      </a>
    </td>
    <td align="center" style="border: 1px solid #ddd; padding: 20px; width: 220px; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
      <a href="https://github.com/thinh2711" style="text-decoration: none; color: inherit;">
        <img src="https://github.com/thinh2711.png" width="90px" style="border-radius: 50%; border: 3px solid #FF5722; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" alt=""/><br />
        <strong style="font-size: 16px; color: #2c3e50;">Xuan Thinh</strong><br />
        <em style="color: #7f8c8d; font-size: 14px;">Frontend Developer</em>
      </a>
    </td>
    <td align="center" style="border: 1px solid #ddd; padding: 20px; width: 220px; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
      <a href="https://github.com/crisaq2410" style="text-decoration: none; color: inherit;">
        <img src="https://github.com/crisaq2410.png" width="90px" style="border-radius: 50%; border: 3px solid #607D8B; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" alt=""/><br />
        <strong style="font-size: 16px; color: #2c3e50;">Anh Quoc</strong><br />
        <em style="color: #7f8c8d; font-size: 14px;">Backend Developer</em>
      </a>
    </td>
  </tr>
</table>
</div>

---

<div align="center">
  <p><strong>💡 Made with ❤️ by our team</strong></p>
  <p>
    <a href="#-backmarketstyle-ecommerce">⬆️ Back to Top</a> •
    <a href="https://github.com/mrthinh307/back-market/issues">🐛 Report Bug</a> •
    <a href="https://github.com/mrthinh307/back-market/pulls">✨ Request Feature</a>
  </p>
</div>
