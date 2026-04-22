import React, { lazy } from 'react';
import type { IconName } from '../../assets/icons';
import type { AppUnlockState } from '../../session/montaSession';

const AppLibrary = lazy(() => import('../applications/AppLibrary'));
const ShowcaseExplorer = lazy(() => import('../applications/ShowcaseExplorer'));
const ProjectArcade = lazy(() => import('../applications/ProjectArcade'));
const MusicStudio = lazy(() => import('../applications/MusicStudio'));
const PixelGallery = lazy(() => import('../applications/PixelGallery'));
const GameCenter = lazy(() => import('../applications/GameCenter'));
const Guestbook = lazy(() => import('../applications/Guestbook'));
const HelpCenter = lazy(() => import('../applications/HelpCenter'));
const Doom = lazy(() => import('../applications/Doom'));
const Scrabble = lazy(() => import('../applications/Scrabble'));
const Credits = lazy(() => import('../applications/Credits'));
const KingsBeach = lazy(() => import('../applications/KingsBeach'));
const Monopoly = lazy(() => import('../applications/Monopoly'));
const Fifa = lazy(() => import('../applications/Fifa'));
const Lamborghini = lazy(() => import('../applications/Lamborghini'));
const OregonTrail = lazy(() => import('../applications/OregonTrail'));
const Henordle = lazy(() => import('../applications/Henordle'));
const ThisComputer = lazy(() => import('../applications/ThisComputer'));

export type AppCategory =
    | 'portfolio'
    | 'creative'
    | 'games'
    | 'utility'
    | 'experimental';

export interface AppDefinition {
    key: string;
    name: string;
    shortcutIcon: IconName;
    component:
        | React.ComponentType<any>
        | React.LazyExoticComponent<React.ComponentType<any>>;
    category: AppCategory;
    description: string;
    featured?: boolean;
    showOnDesktop?: boolean;
    showInLauncher?: boolean;
    launchOrder?: number;
    launchOnBoot?: boolean;
    tags?: string[];
    unlockState?: AppUnlockState;
}

export const APP_CATEGORY_ORDER: AppCategory[] = [
    'portfolio',
    'creative',
    'games',
    'utility',
    'experimental',
];

export const APP_CATEGORY_LABELS: Record<AppCategory, string> = {
    portfolio: 'Portfolio',
    creative: 'Creative',
    games: 'Games',
    utility: 'Utility',
    experimental: 'Experimental',
};

const APP_MANIFEST: AppDefinition[] = [
    {
        key: 'appLibrary',
        name: 'App Library',
        shortcutIcon: 'windowExplorerIcon',
        component: AppLibrary,
        category: 'utility',
        description: 'Search and launch every app in the portfolio.',
        showOnDesktop: true,
        showInLauncher: true,
        launchOrder: 0,
        tags: ['launcher', 'search', 'desktop'],
    },
    {
        key: 'showcase',
        name: 'My Showcase',
        shortcutIcon: 'showcaseIcon',
        component: ShowcaseExplorer,
        category: 'portfolio',
        description:
            'Portfolio hub with about, experience, projects, and contact.',
        featured: true,
        showOnDesktop: true,
        showInLauncher: true,
        launchOrder: 10,
        launchOnBoot: true,
        tags: ['about', 'projects', 'contact'],
    },
    {
        key: 'projectArcade',
        name: 'Project Arcade',
        shortcutIcon: 'showcaseIcon',
        component: ProjectArcade,
        category: 'portfolio',
        description: 'Curated interactive case studies and repo feed.',
        featured: true,
        showOnDesktop: true,
        showInLauncher: true,
        launchOrder: 12,
        tags: ['software', 'case studies', 'repos'],
    },
    {
        key: 'guestbook',
        name: 'Guestbook.exe',
        shortcutIcon: 'windowExplorerIcon',
        component: Guestbook,
        category: 'portfolio',
        description: 'Retro contact desk with a printable visitor card.',
        featured: true,
        showOnDesktop: true,
        showInLauncher: true,
        launchOrder: 14,
        tags: ['contact', 'email', 'share'],
    },
    {
        key: 'gameCenter',
        name: 'Game Center',
        shortcutIcon: 'windowGameIcon',
        component: GameCenter,
        category: 'games',
        description: 'Launch DOS games and unlock hidden experiments.',
        featured: true,
        showOnDesktop: true,
        showInLauncher: true,
        launchOrder: 18,
        tags: ['games', 'dos', 'unlock'],
    },
    {
        key: 'doom',
        name: 'Doom',
        shortcutIcon: 'doomIcon',
        component: Doom,
        category: 'games',
        description: 'Classic DOS shooter in the shell.',
        featured: true,
        showOnDesktop: true,
        showInLauncher: true,
        launchOrder: 20,
        tags: ['dos', 'shooter'],
    },
    {
        key: 'scrabble',
        name: 'Scrabble',
        shortcutIcon: 'scrabbleIcon',
        component: Scrabble,
        category: 'games',
        description: 'Word game with a retro desktop wrapper.',
        featured: false,
        showOnDesktop: false,
        showInLauncher: true,
        launchOrder: 30,
        tags: ['dos', 'word'],
    },
    {
        key: 'credits',
        name: 'Credits',
        shortcutIcon: 'credits',
        component: Credits,
        category: 'utility',
        description: 'Acknowledgements and project notes.',
        showOnDesktop: false,
        showInLauncher: true,
        launchOrder: 40,
        tags: ['about', 'credits'],
    },
    {
        key: 'kingsBeach',
        name: 'Kings Beach',
        shortcutIcon: 'kingsBeach',
        component: KingsBeach,
        category: 'games',
        description: 'A nostalgic game window with a postcard feel.',
        showOnDesktop: false,
        showInLauncher: true,
        launchOrder: 50,
        tags: ['dos', 'nostalgia'],
    },
    {
        key: 'monopoly',
        name: 'Monopoly',
        shortcutIcon: 'monopoly',
        component: Monopoly,
        category: 'games',
        description: 'Board-game era fun inside the desktop.',
        showOnDesktop: false,
        showInLauncher: true,
        launchOrder: 60,
        tags: ['dos', 'board game'],
    },
    {
        key: 'fifa',
        name: 'Fifa',
        shortcutIcon: 'fifa',
        component: Fifa,
        category: 'games',
        description: 'Retro sports window for the launcher lineup.',
        showOnDesktop: false,
        showInLauncher: true,
        launchOrder: 70,
        tags: ['dos', 'sports'],
    },
    {
        key: 'lamborghini',
        name: 'Lamborghini',
        shortcutIcon: 'lamborghini',
        component: Lamborghini,
        category: 'games',
        description: 'DOS racing window running the correct bundle.',
        showOnDesktop: false,
        showInLauncher: true,
        launchOrder: 80,
        tags: ['dos', 'racing'],
    },
    {
        key: 'musicStudio',
        name: 'Music Studio',
        shortcutIcon: 'cd',
        component: MusicStudio,
        category: 'creative',
        description: 'Compact playlist, notes, and production snapshots.',
        featured: false,
        showOnDesktop: true,
        showInLauncher: true,
        launchOrder: 82,
        tags: ['music', 'audio', 'creative'],
    },
    {
        key: 'pixelGallery',
        name: 'Pixel Gallery',
        shortcutIcon: 'showcaseIcon',
        component: PixelGallery,
        category: 'creative',
        description: 'Pixel-art viewer with animation and process links.',
        featured: false,
        showOnDesktop: true,
        showInLauncher: true,
        launchOrder: 84,
        tags: ['art', 'animation', 'creative'],
    },
    {
        key: 'trail',
        name: 'The Oregon Trail',
        shortcutIcon: 'trailIcon',
        component: OregonTrail,
        category: 'experimental',
        description: 'Hidden narrative game from the archive.',
        showOnDesktop: false,
        showInLauncher: true,
        launchOrder: 90,
        tags: ['dos', 'hidden'],
        unlockState: 'locked',
    },
    {
        key: 'henordle',
        name: 'Henordle',
        shortcutIcon: 'henordleIcon',
        component: Henordle,
        category: 'experimental',
        description: 'A hidden Wordle-style puzzle window.',
        showOnDesktop: false,
        showInLauncher: true,
        launchOrder: 100,
        tags: ['wordle', 'hidden'],
        unlockState: 'locked',
    },
    {
        key: 'thisComputer',
        name: 'This Computer',
        shortcutIcon: 'computerBig',
        component: ThisComputer,
        category: 'utility',
        description: 'Legacy computer explorer and browser tour.',
        showOnDesktop: false,
        showInLauncher: true,
        launchOrder: 110,
        tags: ['web', 'retro'],
    },
    {
        key: 'helpCenter',
        name: 'MontaOS Help',
        shortcutIcon: 'computerSmall',
        component: HelpCenter,
        category: 'utility',
        description: 'Tour checklist, tips, achievements, and reset tools.',
        showOnDesktop: false,
        showInLauncher: true,
        launchOrder: 120,
        tags: ['help', 'tour', 'achievements'],
    },
];

const sortApps = (apps: AppDefinition[]) =>
    [...apps].sort((left, right) => {
        const leftOrder = left.launchOrder ?? Number.MAX_SAFE_INTEGER;
        const rightOrder = right.launchOrder ?? Number.MAX_SAFE_INTEGER;

        if (leftOrder !== rightOrder) {
            return leftOrder - rightOrder;
        }

        return left.name.localeCompare(right.name);
    });

export const getAppByKey = (key: string) =>
    APP_MANIFEST.find((app) => app.key === key);

export const getAllApps = () => sortApps(APP_MANIFEST);

export const getDesktopApps = () =>
    sortApps(APP_MANIFEST.filter((app) => app.showOnDesktop !== false));

export const getLauncherApps = () =>
    sortApps(
        APP_MANIFEST.filter(
            (app) => app.showInLauncher !== false && app.key !== 'appLibrary'
        )
    );

export const getFeaturedApps = () =>
    sortApps(getLauncherApps().filter((app) => app.featured));

export const getBootApps = () =>
    APP_MANIFEST.filter((app) => app.launchOnBoot);
