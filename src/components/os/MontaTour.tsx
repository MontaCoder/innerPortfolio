import React, { useMemo } from 'react';
import Colors from '../../constants/colors';
import {
    completeTourStep,
    MontaSessionState,
} from '../../session/montaSession';

interface MontaTourProps {
    session: MontaSessionState;
    onLaunchApplication: (key: string) => void;
}

interface TourStep {
    key: string;
    label: string;
    complete: boolean;
}

const MontaTour: React.FC<MontaTourProps> = ({
    session,
    onLaunchApplication,
}) => {
    const steps = useMemo<TourStep[]>(
        () => [
            {
                key: 'open-showcase',
                label: 'Open the portfolio window',
                complete:
                    session.completedTourSteps.includes('open-showcase') ||
                    session.visitedAppKeys.includes('showcase'),
            },
            {
                key: 'discover-library',
                label: 'Search the App Library',
                complete:
                    session.completedTourSteps.includes('discover-library') ||
                    session.visitedAppKeys.includes('appLibrary'),
            },
            {
                key: 'discover-games',
                label: 'Inspect Game Center',
                complete:
                    session.completedTourSteps.includes('discover-games') ||
                    session.visitedAppKeys.includes('gameCenter'),
            },
            {
                key: 'find-hidden',
                label: 'Unlock a hidden experiment',
                complete:
                    session.unlockedAppKeys.includes('henordle') ||
                    session.unlockedAppKeys.includes('trail') ||
                    session.visitedAppKeys.includes('henordle') ||
                    session.visitedAppKeys.includes('trail'),
            },
        ],
        [session]
    );

    const dismissed = session.completedTourSteps.includes('tour-dismissed');
    const completeCount = steps.filter((step) => step.complete).length;
    const isComplete = completeCount === steps.length;

    if (dismissed || isComplete) {
        return null;
    }

    return (
        <div className="big-button-container" style={styles.tour}>
            <div style={styles.header}>
                <div style={styles.headerText}>
                    <p style={styles.kicker}>FIRST RUN</p>
                    <h3>MontaOS Tour</h3>
                </div>
                <button
                    type="button"
                    className="site-button"
                    style={styles.closeButton}
                    onClick={() => completeTourStep('tour-dismissed')}
                    aria-label="Hide MontaOS tour"
                >
                    x
                </button>
            </div>

            <p style={styles.copy}>
                Explore the desktop like a tiny operating system. Your session
                remembers what you discover.
            </p>

            <div style={styles.progressOuter}>
                <div
                    style={Object.assign({}, styles.progressInner, {
                        transform: `scaleX(${completeCount / steps.length})`,
                    })}
                />
            </div>

            <div style={styles.steps}>
                {steps.map((step) => (
                    <div key={step.key} style={styles.step}>
                        <span
                            style={Object.assign(
                                {},
                                styles.checkbox,
                                step.complete && styles.checkboxComplete
                            )}
                        >
                            {step.complete ? '*' : ''}
                        </span>
                        <p style={styles.stepText}>{step.label}</p>
                    </div>
                ))}
            </div>

            <div style={styles.actions}>
                <button
                    type="button"
                    className="site-button"
                    onClick={() => onLaunchApplication('showcase')}
                >
                    Showcase
                </button>
                <button
                    type="button"
                    className="site-button"
                    onClick={() => onLaunchApplication('appLibrary')}
                >
                    Library
                </button>
                <button
                    type="button"
                    className="site-button"
                    onClick={() => onLaunchApplication('gameCenter')}
                >
                    Games
                </button>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    tour: {
        position: 'absolute',
        right: 12,
        top: 12,
        width: 320,
        backgroundColor: Colors.lightGray,
        padding: 14,
        zIndex: 100001,
        flexDirection: 'column',
        gap: 10,
        boxSizing: 'border-box',
    },
    header: {
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 8,
    },
    headerText: {
        flexDirection: 'column',
        gap: 2,
    },
    kicker: {
        fontFamily: 'MSSerif',
        fontSize: 11,
        letterSpacing: 1,
        color: Colors.darkGray,
    },
    closeButton: {
        width: 28,
        minWidth: 28,
        height: 26,
        padding: 0,
    },
    copy: {
        fontFamily: 'MSSerif',
        fontSize: 13,
    },
    progressOuter: {
        width: '100%',
        height: 8,
        backgroundColor: Colors.white,
        border: `1px solid ${Colors.darkGray}`,
        overflow: 'hidden',
    },
    progressInner: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.blue,
        transformOrigin: 'left',
    },
    steps: {
        flexDirection: 'column',
        gap: 6,
    },
    step: {
        alignItems: 'center',
        gap: 8,
    },
    checkbox: {
        width: 16,
        height: 16,
        border: `1px solid ${Colors.black}`,
        backgroundColor: Colors.white,
        color: Colors.blue,
        fontFamily: 'MSSerif',
        fontSize: 14,
        lineHeight: '16px',
        textAlign: 'center',
        flexShrink: 0,
    },
    checkboxComplete: {
        backgroundColor: '#fbffc4',
    },
    stepText: {
        fontFamily: 'MSSerif',
        fontSize: 13,
    },
    actions: {
        flexWrap: 'wrap',
        gap: 8,
    },
};

export default MontaTour;

