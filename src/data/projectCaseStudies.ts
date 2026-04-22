import computerPreview from '../assets/pictures/projects/software/computer.mp4';
import helloNeighborPreview from '../assets/pictures/projects/software/HelloNeighbor.png';
import aiMangaStudioPreview from '../assets/pictures/projects/software/AI-Manga-Studio.gif';
import codeHarborPreview from '../assets/pictures/projects/software/CodeHarborAI.gif';

export interface ProjectCaseStudy {
    slug: string;
    title: string;
    role: string;
    stack: string[];
    summary: string;
    problem: string;
    buildHighlights: string[];
    outcome?: string;
    media: Array<{ type: 'image' | 'video'; src: string; alt: string }>;
    links: Array<{ label: string; href: string }>;
}

export const PROJECT_CASE_STUDIES: ProjectCaseStudy[] = [
    {
        slug: 'montaos',
        title: 'MontaOS Portfolio Shell',
        role: 'Designer and frontend engineer',
        stack: ['React', 'TypeScript', 'Vite', 'Framer Motion'],
        summary:
            'A personal portfolio wrapped in a playful retro desktop with windows, launchers, games, and persistent visitor discoveries.',
        problem:
            'A standard portfolio would undersell the personality and product thinking behind the work.',
        buildHighlights: [
            'Built a window manager with draggable, resizable, minimizable apps.',
            'Moved apps into a manifest so the desktop, launcher, and hubs share one source of truth.',
            'Layered portfolio content, games, music, art, and contact into one cohesive shell.',
        ],
        outcome:
            'The portfolio now behaves like a tiny operating system instead of a static gallery.',
        media: [
            {
                type: 'video',
                src: computerPreview,
                alt: 'Preview of the retro desktop portfolio shell',
            },
        ],
        links: [
            {
                label: 'Repository',
                href: 'https://github.com/MontaCoder/innerPortfolio',
            },
        ],
    },
    {
        slug: 'hello-neighbor',
        title: 'Hello Neighbor',
        role: 'Full-stack product engineer',
        stack: [
            'React',
            'TypeScript',
            'Supabase',
            'PostgreSQL/PostGIS',
            'OpenLayers',
            'Tailwind CSS',
        ],
        summary:
            'A community-focused web application for neighborhood communication, events, resource sharing, and local moderation.',
        problem:
            'Neighbors need a trusted local space for communication, emergency alerts, events, and resource exchange without becoming a generic public feed.',
        buildHighlights: [
            'Built location-aware community features with neighborhood access boundaries.',
            'Designed event, marketplace, chat, alert, and moderation surfaces around local trust.',
            'Used Supabase, Postgres/PostGIS, storage, realtime APIs, and row-level security for the backend layer.',
        ],
        outcome:
            'A real ALX Africa final project showing full-stack product scope across maps, auth, data, and community workflows.',
        media: [
            {
                type: 'image',
                src: helloNeighborPreview,
                alt: 'Preview of the Hello Neighbor community web application',
            },
        ],
        links: [
            {
                label: 'Repository',
                href: 'https://github.com/MontaCoder/HelloNeighbor-community-web-application',
            },
        ],
    },
    {
        slug: 'ai-manga-studio',
        title: 'AI Manga Studio',
        role: 'AI product engineer',
        stack: [
            'React',
            'TypeScript',
            'Vite',
            'Google Gemini',
            'Tailwind CSS',
            'jsPDF',
            'JSZip',
        ],
        summary:
            'An AI-driven manga creation studio with script generation, storyboard layout, character management, panel editing, and export flows.',
        problem:
            'Manga creators need faster iteration from story premise to structured pages without losing control over characters, panels, and final export formats.',
        buildHighlights: [
            'Integrated Gemini-powered story, worldview, image-analysis, and video-generation services.',
            'Built feature modules for character management, panel editing, story generation, and video production.',
            'Supported export workflows including PDF, ZIP, images, and video-oriented outputs.',
        ],
        outcome:
            'A full creative toolchain that moves from idea to storyboard to export inside one browser-based studio.',
        media: [
            {
                type: 'image',
                src: aiMangaStudioPreview,
                alt: 'Preview of AI Manga Studio',
            },
        ],
        links: [
            {
                label: 'Repository',
                href: 'https://github.com/MontaCoder/AI-Manga-Studio',
            },
        ],
    },
    {
        slug: 'codeharbor-ai',
        title: 'CodeHarborAI',
        role: 'Frontend product engineer',
        stack: [
            'React',
            'TypeScript',
            'Rspack',
            'Tailwind CSS',
            'File System Access API',
            'GitHub API',
        ],
        summary:
            'A privacy-first web app that turns selected local or GitHub codebases into optimized, context-rich AI prompts.',
        problem:
            'Developers often need to give AI assistants useful project context, but raw code dumps can be too large, noisy, or sensitive.',
        buildHighlights: [
            'Processed files locally in the browser so source code is not sent to external servers.',
            'Added smart filtering, file prioritization, token budgeting, and adaptive compression.',
            'Built professional prompt templates for review, docs, architecture analysis, testing, refactors, and migration planning.',
        ],
        outcome:
            'A developer utility that shows product thinking around privacy, context engineering, and practical AI-assisted coding workflows.',
        media: [
            {
                type: 'image',
                src: codeHarborPreview,
                alt: 'Preview of CodeHarborAI',
            },
        ],
        links: [
            {
                label: 'Repository',
                href: 'https://github.com/MontaCoder/CodeHarborAI',
            },
        ],
    },
];
