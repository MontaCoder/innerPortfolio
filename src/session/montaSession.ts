import { useEffect, useState } from 'react';

export type AppUnlockState = 'visible' | 'hidden' | 'locked';

export interface MontaSessionState {
    version: 1;
    visitedAppKeys: string[];
    recentAppKeys: string[];
    unlockedAppKeys: string[];
    completedTourSteps: string[];
    achievements: string[];
}

const SESSION_STORAGE_KEY = 'inner-portfolio.session.v1';
const LEGACY_RECENT_APPS_STORAGE_KEY = 'inner-portfolio.recent-apps';
const SESSION_EVENT_NAME = 'monta-session-change';
const MAX_RECENT_APPS = 8;

export const DEFAULT_MONTA_SESSION: MontaSessionState = {
    version: 1,
    visitedAppKeys: [],
    recentAppKeys: [],
    unlockedAppKeys: [],
    completedTourSteps: [],
    achievements: [],
};

const uniqueStrings = (items: unknown): string[] => {
    if (!Array.isArray(items)) {
        return [];
    }

    return Array.from(
        new Set(items.filter((item): item is string => typeof item === 'string'))
    );
};

const readLegacyRecentApps = () => {
    if (typeof window === 'undefined') {
        return [];
    }

    try {
        const rawValue = window.localStorage.getItem(
            LEGACY_RECENT_APPS_STORAGE_KEY
        );

        if (!rawValue) {
            return [];
        }

        return uniqueStrings(JSON.parse(rawValue));
    } catch {
        return [];
    }
};

const normalizeSession = (value: unknown): MontaSessionState => {
    if (!value || typeof value !== 'object') {
        return {
            ...DEFAULT_MONTA_SESSION,
            recentAppKeys: readLegacyRecentApps(),
        };
    }

    const maybeSession = value as Partial<MontaSessionState>;

    return {
        version: 1,
        visitedAppKeys: uniqueStrings(maybeSession.visitedAppKeys),
        recentAppKeys: uniqueStrings(maybeSession.recentAppKeys).slice(
            0,
            MAX_RECENT_APPS
        ),
        unlockedAppKeys: uniqueStrings(maybeSession.unlockedAppKeys),
        completedTourSteps: uniqueStrings(maybeSession.completedTourSteps),
        achievements: uniqueStrings(maybeSession.achievements),
    };
};

export const readMontaSession = (): MontaSessionState => {
    if (typeof window === 'undefined') {
        return DEFAULT_MONTA_SESSION;
    }

    try {
        const rawValue = window.localStorage.getItem(SESSION_STORAGE_KEY);

        if (!rawValue) {
            const migratedSession = {
                ...DEFAULT_MONTA_SESSION,
                recentAppKeys: readLegacyRecentApps(),
            };
            saveMontaSession(migratedSession, { emitEvent: false });
            return migratedSession;
        }

        return normalizeSession(JSON.parse(rawValue));
    } catch {
        return {
            ...DEFAULT_MONTA_SESSION,
            recentAppKeys: readLegacyRecentApps(),
        };
    }
};

export const saveMontaSession = (
    session: MontaSessionState,
    options: { emitEvent?: boolean } = {}
) => {
    if (typeof window === 'undefined') {
        return session;
    }

    const normalizedSession = normalizeSession(session);

    try {
        window.localStorage.setItem(
            SESSION_STORAGE_KEY,
            JSON.stringify(normalizedSession)
        );
    } catch {
        return normalizedSession;
    }

    if (options.emitEvent !== false) {
        window.dispatchEvent(
            new CustomEvent<MontaSessionState>(SESSION_EVENT_NAME, {
                detail: normalizedSession,
            })
        );
    }

    return normalizedSession;
};

export const updateMontaSession = (
    updater: (session: MontaSessionState) => MontaSessionState
) => saveMontaSession(updater(readMontaSession()));

const pushUnique = (items: string[], item: string) =>
    items.includes(item) ? items : [...items, item];

export const markAppLaunched = (appKey: string) =>
    updateMontaSession((session) => ({
        ...session,
        visitedAppKeys: pushUnique(session.visitedAppKeys, appKey),
        recentAppKeys: [
            appKey,
            ...session.recentAppKeys.filter((key) => key !== appKey),
        ].slice(0, MAX_RECENT_APPS),
    }));

export const unlockApp = (appKey: string) =>
    updateMontaSession((session) => ({
        ...session,
        unlockedAppKeys: pushUnique(session.unlockedAppKeys, appKey),
    }));

export const completeTourStep = (stepKey: string) =>
    updateMontaSession((session) => ({
        ...session,
        completedTourSteps: pushUnique(session.completedTourSteps, stepKey),
    }));

export const addAchievement = (achievementKey: string) =>
    updateMontaSession((session) => ({
        ...session,
        achievements: pushUnique(session.achievements, achievementKey),
    }));

export const recordGamePlayed = (appKey: string) =>
    updateMontaSession((session) => {
        const gameAchievement = `played:${appKey}`;
        const playedGameAchievements = pushUnique(
            session.achievements,
            gameAchievement
        ).filter((achievement) => achievement.startsWith('played:'));

        return {
            ...session,
            visitedAppKeys: pushUnique(session.visitedAppKeys, appKey),
            unlockedAppKeys: Array.from(
                new Set([
                    ...session.unlockedAppKeys,
                    'henordle',
                    ...(playedGameAchievements.length >= 2 ? ['trail'] : []),
                ])
            ),
            completedTourSteps: Array.from(
                new Set([...session.completedTourSteps, 'launch-game'])
            ),
            achievements: Array.from(
                new Set([
                    ...session.achievements,
                    gameAchievement,
                    'first-game-boot',
                    ...(playedGameAchievements.length >= 2
                        ? ['archive-unlocked']
                        : []),
                ])
            ),
        };
    });

export const hasUnlockedApp = (
    session: MontaSessionState,
    appKey: string
) => session.unlockedAppKeys.includes(appKey);

export const resetMontaSession = () => saveMontaSession(DEFAULT_MONTA_SESSION);

export const useMontaSession = () => {
    const [session, setSession] = useState<MontaSessionState>(() =>
        readMontaSession()
    );

    useEffect(() => {
        const onSessionChange = (event: Event) => {
            const customEvent = event as CustomEvent<MontaSessionState>;
            setSession(customEvent.detail ?? readMontaSession());
        };

        window.addEventListener(SESSION_EVENT_NAME, onSessionChange);
        window.addEventListener('storage', onSessionChange);

        return () => {
            window.removeEventListener(SESSION_EVENT_NAME, onSessionChange);
            window.removeEventListener('storage', onSessionChange);
        };
    }, []);

    return session;
};

