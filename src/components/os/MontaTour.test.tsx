// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import MontaTour from './MontaTour';
import { DEFAULT_MONTA_SESSION } from '../../session/montaSession';

describe('MontaTour', () => {
    it('shows the first-run checklist for a fresh visitor', () => {
        render(
            <MontaTour
                session={DEFAULT_MONTA_SESSION}
                onLaunchApplication={vi.fn()}
            />
        );

        expect(screen.getByText('MontaOS Tour')).toBeTruthy();
        expect(screen.getByText('Open the portfolio window')).toBeTruthy();
    });

    it('hides after the visitor dismisses it', () => {
        const { container } = render(
            <MontaTour
                session={{
                    ...DEFAULT_MONTA_SESSION,
                    completedTourSteps: ['tour-dismissed'],
                }}
                onLaunchApplication={vi.fn()}
            />
        );

        expect(container.textContent).toBe('');
    });
});

