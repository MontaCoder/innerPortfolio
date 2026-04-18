# InnerPortfolio

Interactive portfolio website built as a retro desktop operating system experience.

## Stack
- React 19 + TypeScript
- Vite build pipeline
- js-dos for embedded DOS experiences

## Local Setup
1. Install dependencies:
	- `npm install`
2. Create environment file:
	- Copy `.env.example` to `.env.local`
3. Fill required EmailJS values in `.env.local`:
	- `VITE_EMAILJS_SERVICE_ID`
	- `VITE_EMAILJS_TEMPLATE_ID`
	- `VITE_EMAILJS_PUBLIC_KEY`
4. Start dev server:
	- `npm run dev`

## Scripts
- `npm run dev`: run development server
- `npm run build`: build production bundle
- `npm run preview`: preview production bundle
- `npm test`: run tests

## Notes
- Contact form uses EmailJS and requires environment variables to be configured.
- If dependencies are missing in your shell, run `npm install` before building.

