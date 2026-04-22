// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import GameCenter from './GameCenter';

describe('GameCenter', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it('shows launch instructions without starting a game bundle', () => {
        render(
            <GameCenter
                onClose={vi.fn()}
                onInteract={vi.fn()}
                onMinimize={vi.fn()}
                onLaunchApplication={vi.fn()}
            />
        );

        expect(screen.getAllByText('Game Center').length).toBeGreaterThan(0);
        expect(screen.getByText(/Games do not boot until/i)).toBeTruthy();
        expect(screen.getAllByText('Doom').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Locked').length).toBeGreaterThan(0);
    });
});
