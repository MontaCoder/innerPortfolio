// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import {
    DEFAULT_MONTA_SESSION,
    markAppLaunched,
    readMontaSession,
    recordGamePlayed,
    unlockApp,
} from './montaSession';

describe('montaSession', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it('falls back to a clean session when storage is invalid', () => {
        window.localStorage.setItem('inner-portfolio.session.v1', '{bad-json');

        expect(readMontaSession()).toEqual(DEFAULT_MONTA_SESSION);
    });

    it('normalizes future or partial session payloads', () => {
        window.localStorage.setItem(
            'inner-portfolio.session.v1',
            JSON.stringify({
                version: 99,
                visitedAppKeys: ['showcase', 'showcase', 1],
                recentAppKeys: ['doom'],
                unlockedAppKeys: ['henordle'],
                completedTourSteps: ['open-showcase'],
                achievements: ['first-game-boot'],
            })
        );

        expect(readMontaSession()).toMatchObject({
            version: 1,
            visitedAppKeys: ['showcase'],
            recentAppKeys: ['doom'],
            unlockedAppKeys: ['henordle'],
        });
    });

    it('records launches and unlocks without duplicating values', () => {
        markAppLaunched('showcase');
        markAppLaunched('showcase');
        unlockApp('henordle');
        unlockApp('henordle');

        expect(readMontaSession().visitedAppKeys).toEqual(['showcase']);
        expect(readMontaSession().recentAppKeys).toEqual(['showcase']);
        expect(readMontaSession().unlockedAppKeys).toEqual(['henordle']);
    });

    it('unlocks hidden games from game boots', () => {
        recordGamePlayed('doom');
        expect(readMontaSession().unlockedAppKeys).toContain('henordle');
        expect(readMontaSession().unlockedAppKeys).not.toContain('trail');

        recordGamePlayed('scrabble');
        expect(readMontaSession().unlockedAppKeys).toContain('trail');
    });
});

