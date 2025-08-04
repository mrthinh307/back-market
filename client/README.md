# Back Market - Client (Frontend)

Next.js 15 frontend application for Back Market platform with TypeScript, Tailwind CSS, and modern development tools.

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Shadcn/ui
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Internationalization**: next-intl
- **Testing**: Vitest, Playwright
- **Build Tool**: Turbopack

## 📋 System Requirements

- **Node.js**: >= 22.0.0
- **Yarn**: >= 1.22.0 (recommended)

## 🚀 Getting Started

### 1. Install dependencies
```bash
yarn install
```

### 2. Environment Configuration
Create `.env.local` file in the root directory:
```env
# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:8888"

# Optional: Other client environment variables
NEXT_PUBLIC_APP_NAME="Back Market"
```

### 3. Start Development Server
```bash
# Run with Turbopack and Spotlight (recommended for development)
yarn dev

# Or run Next.js only
yarn dev:next

# Run Spotlight separately (for debugging)
yarn dev:spotlight
```

Client will run at: `http://localhost:3000` (or next available port)

## 🏗️ Build and Deployment

### Development Build
```bash
yarn dev
```

### Production Build
```bash
yarn build
yarn start
```

### Build Analysis
```bash
# Analyze bundle size
yarn build-stats
```

## 🧪 Testing

### Unit Tests (Vitest)
```bash
# Run all tests
yarn test

# Run tests in watch mode
vitest --watch

# Run specific test file
vitest src/components/Button.test.tsx
```

### E2E Tests (Playwright)
```bash
# Run E2E tests
yarn test:e2e

# Run E2E tests in UI mode
npx playwright test --ui

# Run specific test
npx playwright test tests/e2e/auth.spec.ts
```

### Performance Tests
```bash
# Run Lighthouse performance tests
yarn test:lighthouse
```

## 🛠️ Development Tools

### Code Quality
```bash
# Linting
yarn lint

# Fix linting issues
yarn lint:fix

# Type checking
yarn check:types

# Dependency checking
yarn check:deps
```

### Internationalization
```bash
# Validate i18n files
yarn check:i18n
```

### Clean and Reset
```bash
# Clean build artifacts
yarn clean

# Clean and reinstall dependencies
yarn clean
yarn install
```

## 📁 Project Structure

```
client/
├── src/
│   ├── app/
│   │   ├── (redirect)/           # Redirect routes
│   │   └── [locale]/            # Internationalized routes
│   ├── components/
│   │   ├── ui/                  # Reusable UI components
│   │   ├── form/                # Form components
│   │   └── LoadingPage.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx      # Authentication context
│   ├── hooks/                   # Custom React hooks
│   ├── libs/                    # Utility libraries
│   │   ├── i18n/               # Internationalization
│   │   └── toast/              # Toast notifications
│   ├── locales/                 # Translation files
│   │   ├── en.json
│   │   └── ja.json
│   ├── styles/
│   │   └── global.css          # Global styles
│   ├── templates/              # Page templates
│   ├── types/                  # TypeScript type definitions
│   ├── utils/                  # Utility functions
│   └── validations/            # Form validation schemas
├── public/
│   ├── assets/
│   │   └── images/
│   └── fonts/                  # Custom fonts
├── tests/
│   ├── e2e/                    # E2E tests
│   └── integration/            # Integration tests
├── .env.local                  # Environment variables
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── package.json
```

## 🎨 Styling and UI

### Tailwind CSS
- **Version**: 4.x
- **Configuration**: `tailwind.config.ts`
- **Custom animations**: `tw-animate-css`

### UI Components
- **Base**: Radix UI primitives
- **Styling**: Class Variance Authority (CVA)
- **Icons**: Lucide React
- **Theme**: Next Themes for dark/light mode

### Fonts
Custom fonts located in `public/fonts/`:
- DupletOpen-Light.otf
- DupletOpen-Regular.otf
- DupletOpen-Semibold.otf

## 🌐 Internationalization

### Supported Languages
- English (`en`)
- Japanese (`ja`)

### Translation Files
- `src/locales/en.json`
- `src/locales/ja.json`

### Usage
```typescript
import { useTranslations } from 'next-intl';

export default function Component() {
  const t = useTranslations('common');
  return <h1>{t('welcome')}</h1>;
}
```

## 🔧 Configuration Files

### Next.js Configuration (`next.config.ts`)
- Turbopack support
- Internationalization setup
- Bundle analyzer integration

### TypeScript Configuration (`tsconfig.json`)
- Strict type checking
- Path aliases
- Modern ES features

### ESLint Configuration (`eslint.config.mjs`)
- Antfu ESLint config
- React and Next.js rules
- Accessibility rules

## 🔍 Environment Variables

### Environment Files
- `.env` - Local development
- `.env.example` - Example environment
- `.env.production` - Production environment

## 📦 Available Scripts

```bash
# Development
yarn dev                 # Start development server with Turbopack
yarn dev:next           # Start Next.js only
yarn dev:spotlight      # Start Spotlight debugging tool

# Building
yarn build              # Build for production
yarn build:next         # Build Next.js only
yarn start              # Start production server

# Testing
yarn test               # Run unit tests
yarn test:e2e          # Run E2E tests
yarn test:lighthouse   # Run performance tests

# Code Quality
yarn lint               # Run ESLint
yarn lint:fix          # Fix ESLint issues
yarn check:types       # TypeScript type checking
yarn check:deps        # Check dependencies
yarn check:i18n        # Validate i18n files

# Utilities
yarn clean              # Clean build artifacts
yarn build-stats       # Analyze bundle size
yarn commit             # Conventional commits
```

## 🚀 Performance Optimization

### Built-in Optimizations
- **Turbopack**: Fast bundling and hot reload
- **Next.js 15**: App Router with improved performance
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Next.js Font optimization

### Bundle Analysis
```bash
yarn build-stats
```

### Lighthouse Testing
```bash
yarn test:lighthouse
```

## 🔍 Troubleshooting

### Development Issues
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
yarn clean
yarn install

# Check for TypeScript errors
yarn check:types

# Check for linting issues
yarn lint
```

### Build Issues
```bash
# Clean and rebuild
yarn clean
yarn build

# Check environment variables
cat .env.local

# Verify API connection
curl http://localhost:8888/api
```

### Common Issues
1. **Port conflicts**: Next.js will automatically use next available port
2. **TypeScript errors**: Run `yarn check:types` to identify issues
3. **Missing environment variables**: Check `.env.local` file
4. **API connection**: Ensure backend server is running at correct URL

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Add tests
4. Run linting and type checking
5. Test changes locally
6. Submit pull request

## 📝 Notes

- Client runs on port 3000 by default (or next available)
- Ensure backend server is running for API calls
- Use TypeScript for all new components
- Follow the established folder structure
- Add tests for new features
- Use conventional commits for commit messages
