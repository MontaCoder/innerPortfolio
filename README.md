# InnerPortfolio

Interactive portfolio website built as a retro desktop operating system experience. Navigate through windows, icons, and a familiar desktop interface to explore projects and learn about me.

## Features
- Retro Windows 95/98-inspired desktop environment
- Interactive windows that can be opened, minimized, and closed
- Animated desktop icons and taskbar
- Contact form with EmailJS integration
- DOS game emulation via js-dos
- Smooth animations with Framer Motion
- Responsive design with React Router

## Stack
- **React 19** + TypeScript
- **Vite** - Fast build pipeline and dev server
- **Framer Motion** - UI animations
- **js-dos** - DOS game/experience emulation
- **EmailJS** - Contact form backend
- **React Router DOM** - Client-side routing
- **Vitest** - Unit testing

## Local Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd innerPortfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   - Copy `.env.example` to `.env.local`
   - Fill required EmailJS values in `.env.local`:
     - `VITE_EMAILJS_SERVICE_ID`
     - `VITE_EMAILJS_TEMPLATE_ID`
     - `VITE_EMAILJS_PUBLIC_KEY`

4. Start development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

## Available Scripts
- `npm run dev` - Start development server with HMR
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm test` - Run Vitest test suite

## Environment Variables
The contact form requires EmailJS credentials. Obtain these from your [EmailJS dashboard](https://dashboard.emailjs.com/):

| Variable | Description |
|----------|-------------|
| VITE_EMAILJS_SERVICE_ID | EmailJS service ID |
| VITE_EMAILJS_TEMPLATE_ID | EmailJS template ID |
| VITE_EMAILJS_PUBLIC_KEY | EmailJS public key |

## Project Structure
```
src/
├── assets/          # Static assets (images, icons)
├── components/      # React components
│   ├── desktop/    # Desktop environment components
│   ├── showcase/   # Main content pages
│   └── window/     # Reusable window components
├── constants/       # App constants (colors, config)
├── hooks/          # Custom React hooks
└── pages/          # Route page components
```

## Notes
- Contact form uses EmailJS and requires environment variables to be configured
- DOS experiences require valid js-dos configuration
- If dependencies are missing in your shell, run `npm install` before building

## License
Private - All rights reserved

