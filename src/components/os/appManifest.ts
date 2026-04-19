import React, { lazy } from 'react';
import type { IconName } from '../../assets/icons';

const AppLibrary = lazy(() => import('../applications/AppLibrary'));
const ShowcaseExplorer = lazy(() => import('../applications/ShowcaseExplorer'));
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
}

export const APP_CATEGORY_ORDER: AppCategory[] = [
    'portfolio',
    'games',
    'utility',
    'experimental',
];

export const APP_CATEGORY_LABELS: Record<AppCategory, string> = {
    portfolio: 'Portfolio',
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
    },
    {
        key: 'scrabble',
        name: 'Scrabble',
        shortcutIcon: 'scrabbleIcon',
        component: Scrabble,
        category: 'games',
        description: 'Word game with a retro desktop wrapper.',
        featured: true,
        showOnDesktop: true,
        showInLauncher: true,
        launchOrder: 30,
    },
    {
        key: 'credits',
        name: 'Credits',
        shortcutIcon: 'credits',
        component: Credits,
        category: 'utility',
        description: 'Acknowledgements and project notes.',
        showOnDesktop: true,
        showInLauncher: true,
        launchOrder: 40,
    },
    {
        key: 'kingsBeach',
        name: 'Kings Beach',
        shortcutIcon: 'kingsBeach',
        component: KingsBeach,
        category: 'games',
        description: 'A nostalgic game window with a postcard feel.',
        showOnDesktop: true,
        showInLauncher: true,
        launchOrder: 50,
    },
    {
        key: 'monopoly',
        name: 'Monopoly',
        shortcutIcon: 'monopoly',
        component: Monopoly,
        category: 'games',
        description: 'Board-game era fun inside the desktop.',
        showOnDesktop: true,
        showInLauncher: true,
        launchOrder: 60,
    },
    {
        key: 'fifa',
        name: 'Fifa',
        shortcutIcon: 'fifa',
        component: Fifa,
        category: 'games',
        description: 'Retro sports window for the launcher lineup.',
        showOnDesktop: true,
        showInLauncher: true,
        launchOrder: 70,
    },
    {
        key: 'lamborghini',
        name: 'Lamborghini',
        shortcutIcon: 'lamborghini',
        component: Lamborghini,
        category: 'games',
        description: 'DOS racing window running the correct bundle.',
        showOnDesktop: true,
        showInLauncher: true,
        launchOrder: 80,
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
