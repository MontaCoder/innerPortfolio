// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import DosGameWindow from './DosGameWindow';

describe('DosGameWindow', () => {
    it('waits for an explicit Play action before booting the emulator', () => {
        render(
            <DosGameWindow
                appKey="doom"
                title="Doom"
                bundleUrl="doom.jsdos"
                windowBarColor="#111"
                icon="doomIcon"
                instructions={['Press Play to boot.']}
                onClose={vi.fn()}
                onInteract={vi.fn()}
                onMinimize={vi.fn()}
            />
        );

        expect(screen.getByText('Play')).toBeTruthy();
        expect(screen.getByText(/will boot an emulator only after/i)).toBeTruthy();
    });
});

