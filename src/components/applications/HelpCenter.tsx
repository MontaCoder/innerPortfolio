import React, { useState } from 'react';
import Colors from '../../constants/colors';
import Window from '../os/Window';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';
import {
    completeTourStep,
    resetMontaSession,
    useMontaSession,
} from '../../session/montaSession';

export interface HelpCenterProps extends WindowAppProps {}

const TOUR_STEPS = [
    ['open-showcase', 'Open the portfolio window'],
    ['discover-library', 'Search the App Library'],
    ['discover-games', 'Inspect Game Center'],
    ['launch-game', 'Boot a game from a preflight screen'],
];

const HelpCenter: React.FC<HelpCenterProps> = (props) => {
    const { initWidth, initHeight } = useInitialWindowSize({ margin: 180 });
    const session = useMontaSession();
    const [message, setMessage] = useState('');

    const handleReset = () => {
        resetMontaSession();
        setMessage('Session reset. The tour will return after reopening Help.');
    };

    const showTourAgain = () => {
        resetMontaSession();
        completeTourStep('open-showcase');
        setMessage('Tour restored with Showcase marked from this boot.');
    };

    return (
        <Window
            top={64}
            left={104}
            width={initWidth}
            height={initHeight}
            windowTitle="MontaOS Help"
            windowBarIcon="computerSmall"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={`${session.visitedAppKeys.length} apps discovered`}
        >
            <div style={styles.shell}>
                <div style={styles.header}>
                    <p className="showcase-header">HELP CENTER</p>
                    <h1 style={styles.title}>MontaOS Help</h1>
                    <p style={styles.copy}>
                        Track your discoveries, unlocks, and tour progress.
                        Everything here is stored locally in this browser.
                    </p>
                </div>

                <div style={styles.grid}>
                    <div className="big-button-container" style={styles.panel}>
                        <h3>Tour Checklist</h3>
                        <div style={styles.list}>
                            {TOUR_STEPS.map(([key, label]) => {
                                const complete =
                                    session.completedTourSteps.includes(key);
                                return (
                                    <div key={key} style={styles.row}>
                                        <span
                                            style={Object.assign(
                                                {},
                                                styles.checkbox,
                                                complete && styles.checked
                                            )}
                                        >
                                            {complete ? '*' : ''}
                                        </span>
                                        <p style={styles.rowText}>{label}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="big-button-container" style={styles.panel}>
                        <h3>Session Stats</h3>
                        <div style={styles.statGrid}>
                            <Stat label="Apps" value={session.visitedAppKeys.length} />
                            <Stat
                                label="Recent"
                                value={session.recentAppKeys.length}
                            />
                            <Stat
                                label="Unlocks"
                                value={session.unlockedAppKeys.length}
                            />
                            <Stat
                                label="Achievements"
                                value={session.achievements.length}
                            />
                        </div>
                    </div>

                    <div className="big-button-container" style={styles.panel}>
                        <h3>Quick Tips</h3>
                        <div style={styles.list}>
                            <p>- Double-click desktop icons to open apps.</p>
                            <p>- Use Start for fast access to featured apps.</p>
                            <p>- Game windows only boot DOS after Play.</p>
                            <p>- App Library reveals launcher-only surfaces.</p>
                        </div>
                    </div>

                    <div className="big-button-container" style={styles.panel}>
                        <h3>Local Memory</h3>
                        <p style={styles.copy}>
                            Resetting clears discoveries, recent apps, hidden
                            unlocks, achievements, and tour progress.
                        </p>
                        <div style={styles.actions}>
                            <button
                                type="button"
                                className="site-button"
                                onClick={handleReset}
                            >
                                Reset Session
                            </button>
                            <button
                                type="button"
                                className="site-button"
                                onClick={showTourAgain}
                            >
                                Restart Tour
                            </button>
                        </div>
                        <p style={styles.message}>{message || '\xa0'}</p>
                    </div>
                </div>
            </div>
        </Window>
    );
};

interface StatProps {
    label: string;
    value: number;
}

const Stat: React.FC<StatProps> = ({ label, value }) => (
    <div style={styles.stat}>
        <p style={styles.statLabel}>{label}</p>
        <h2>{value}</h2>
    </div>
);

const styles: StyleSheetCSS = {
    shell: {
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        padding: 18,
        boxSizing: 'border-box',
        backgroundColor: '#efefef',
        flexDirection: 'column',
        gap: 16,
    },
    header: {
        flexDirection: 'column',
        gap: 8,
    },
    title: {
        marginLeft: -8,
    },
    copy: {
        fontFamily: 'MSSerif',
        fontSize: 15,
    },
    grid: {
        width: '100%',
        flexWrap: 'wrap',
        gap: 14,
        alignItems: 'stretch',
    },
    panel: {
        width: 'calc(50% - 7px)',
        minWidth: 280,
        flexDirection: 'column',
        gap: 12,
        backgroundColor: Colors.lightGray,
    },
    list: {
        flexDirection: 'column',
        gap: 8,
    },
    row: {
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
    checked: {
        backgroundColor: '#fbffc4',
    },
    rowText: {
        fontFamily: 'MSSerif',
        fontSize: 14,
    },
    statGrid: {
        flexWrap: 'wrap',
        gap: 10,
    },
    stat: {
        flex: '1 1 120px',
        flexDirection: 'column',
        border: '1px solid #808080',
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        backgroundColor: '#efefef',
        padding: 10,
    },
    statLabel: {
        fontFamily: 'MSSerif',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: Colors.darkGray,
    },
    actions: {
        gap: 8,
        flexWrap: 'wrap',
    },
    message: {
        fontFamily: 'MSSerif',
        fontSize: 13,
        color: Colors.blue,
    },
};

export default HelpCenter;

