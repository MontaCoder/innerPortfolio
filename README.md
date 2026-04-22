# InnerPortfolio

Interactive portfolio website built as a retro desktop operating system experience. Navigate through windows, icons, and a familiar desktop interface to explore projects and learn about me.

**Part of [MontaOS](https://github.com/MontaCoder/MontaOS) — the cinematic 3D portfolio shell that embeds this site inside an in-scene monitor.**

## Overview

InnerPortfolio is the live content layer inside the MontaOS 3D environment. While MontaOS handles the outer workstation experience — boot sequences, desk setup, ambient audio, and cinematic camera work — InnerPortfolio provides the actual portfolio content rendered on the in-scene 3D monitor via CSS3D.

## Features
- Retro Windows 95/98-inspired desktop environment
- Interactive windows that can be opened, minimized, and closed
- Animated desktop icons and taskbar
- Contact form with EmailJS integration
- DOS game emulation via js-dos
- Smooth animations with Framer Motion
- Responsive design with React Router
- Embedded within a cinematic 3D desktop shell (MontaOS)

## MontaOS Context

InnerPortfolio is designed to be displayed inside a monitor rendered in the [MontaOS](https://github.com/MontaCoder/MontaOS) 3D scene:

- **MontaOS** provides the outer layer: a React + Three.js workstation with boot sequence, 3D desk, ambient audio, and camera motion.
- **InnerPortfolio** is the inner layer: the live portfolio site rendered on the in-scene monitor using CSS3D, with event forwarding through the 3D view.
- In development, MontaOS points to `http://localhost:3000/`; in production it loads `https://innerportfolio.netlify.app/`.

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

### Running Standalone
Start the development server to test InnerPortfolio directly:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

### Running with MontaOS
To run the full experience with the 3D shell:
1. Clone and set up the [MontaOS](https://github.com/MontaCoder/MontaOS) repository
2. Start both servers (MontaOS uses port 3000 by default; InnerPortfolio uses 5173)
3. Configure `public/config.json` in MontaOS to point to `http://localhost:5173/` during InnerPortfolio development
4. MontaOS forwards events to the embedded page; use `?debug` on the MontaOS URL to skip the BIOS boot sequence

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
- When embedded in MontaOS, the contact endpoint should use HTTPS and configure CORS via the MontaOS `CORS_ORIGINS` environment variable
- Framer Motion animations may need `prefers-reduced-motion` handling when displayed in the MontaOS environment

## Links
- **MontaOS repo**: [MontaCoder/MontaOS](https://github.com/MontaCoder/MontaOS)
- **Live InnerPortfolio**: [innerportfolio.netlify.app](https://innerportfolio.netlify.app/)

## License
Private - All rights reserved

