import { describe, expect, it } from 'vitest';
import {
    getAppByKey,
    getDesktopApps,
    getFeaturedApps,
    getLauncherApps,
} from './appManifest';

describe('appManifest', () => {
    it('exposes the new flagship surfaces', () => {
        expect(getAppByKey('projectArcade')?.name).toBe('Project Arcade');
        expect(getAppByKey('gameCenter')?.featured).toBe(true);
        expect(getAppByKey('guestbook')?.name).toBe('Guestbook.exe');
        expect(getAppByKey('musicStudio')?.category).toBe('creative');
        expect(getAppByKey('pixelGallery')?.category).toBe('creative');
    });

    it('keeps deep archive apps locked but launchable from the catalog', () => {
        expect(getAppByKey('henordle')?.unlockState).toBe('locked');
        expect(getAppByKey('trail')?.unlockState).toBe('locked');
        expect(getLauncherApps().map((app) => app.key)).toContain('henordle');
        expect(getLauncherApps().map((app) => app.key)).toContain('trail');
    });

    it('keeps the desktop focused on hubs and primary apps', () => {
        const desktopKeys = getDesktopApps().map((app) => app.key);
        const featuredKeys = getFeaturedApps().map((app) => app.key);

        expect(desktopKeys).toContain('gameCenter');
        expect(desktopKeys).not.toContain('scrabble');
        expect(featuredKeys).toContain('projectArcade');
    });
});

