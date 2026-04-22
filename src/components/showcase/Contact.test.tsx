// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Contact, { validateEmail } from './Contact';

const sendMock = vi.hoisted(() => vi.fn());

vi.mock('@emailjs/browser', () => ({
    default: {
        send: sendMock,
    },
}));

describe('Guestbook contact', () => {
    beforeEach(() => {
        window.localStorage.clear();
        sendMock.mockReset();
    });

    it('validates email addresses', () => {
        expect(validateEmail('hello@example.com')).toBe(true);
        expect(validateEmail('not-an-email')).toBe(false);
    });

    it('shows a direct email fallback when EmailJS env values are missing', async () => {
        const user = userEvent.setup();

        render(<Contact embedded />);

        await user.type(screen.getByLabelText(/Your name/i), 'Visitor');
        await user.type(screen.getByLabelText(/Email/i), 'visitor@example.com');
        await user.type(screen.getByLabelText(/Message/i), 'Hello from tests');
        await user.click(screen.getByRole('button', { name: /Sign Guestbook/i }));

        expect(
            await screen.findByText(/Guestbook mail is temporarily unavailable/i)
        ).toBeTruthy();
        expect(sendMock).not.toHaveBeenCalled();
    });
});

