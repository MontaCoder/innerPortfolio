import React, { useMemo, useState } from 'react';
import Colors from '../../constants/colors';
import { Icon } from '../general';
import Window from '../os/Window';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';
import { getAppByKey } from '../os/appManifest';
import type { AppDefinition } from '../os/appManifest';
import { hasUnlockedApp, useMontaSession } from '../../session/montaSession';

export interface GameCenterProps extends WindowAppProps {}

const GAME_KEYS = [
    'doom',
    'scrabble',
    'kingsBeach',
    'monopoly',
    'fifa',
    'lamborghini',
    'henordle',
    'trail',
];

const GAME_NOTES: Record<string, string> = {
    doom: 'Fastest way to test the DOS shelf. Boots from a local js-dos bundle.',
    scrabble: 'A quieter word-game branch of the archive.',
    kingsBeach: 'A nostalgic postcard slot from the game shelf.',
    monopoly: 'Board-game era pacing inside a desktop window.',
    fifa: 'Sports archive with keyboard-heavy controls.',
    lamborghini: 'Racing window with a compact DOS bundle.',
    henordle: 'Hidden word puzzle. Unlocks when you inspect Game Center or boot a game.',
    trail: 'Deep archive entry. Unlocks after two game boots.',
};

const GameCenter: React.FC<GameCenterProps> = (props) => {
    const { initWidth, initHeight } = useInitialWindowSize({ margin: 110 });
    const session = useMontaSession();
    const [selectedKey, setSelectedKey] = useState('doom');

    const games = useMemo(
        () =>
            GAME_KEYS.map((key) => getAppByKey(key)).filter(
                (app): app is AppDefinition => Boolean(app)
            ),
        []
    );

    const selectedGame = getAppByKey(selectedKey) ?? games[0];
    const playedCount = session.achievements.filter((achievement) =>
        achievement.startsWith('played:')
    ).length;

    const getStatus = (key: string) => {
        const app = getAppByKey(key);

        if (app?.unlockState === 'locked' && !hasUnlockedApp(session, key)) {
            return 'Locked';
        }

        if (session.achievements.includes(`played:${key}`)) {
            return 'Booted';
        }

        if (app?.unlockState === 'locked') {
            return 'Unlocked';
        }

        return 'Installed';
    };

    const selectedStatus = selectedGame ? getStatus(selectedGame.key) : 'Locked';
    const canLaunchSelected = selectedGame && selectedStatus !== 'Locked';

    return (
        <Window
            top={32}
            left={68}
            width={initWidth}
            height={initHeight}
            windowTitle="Game Center"
            windowBarIcon="windowGameIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={`${playedCount} game boots recorded`}
        >
            <div style={styles.shell}>
                <div style={styles.header}>
                    <div style={styles.headerCopy}>
                        <p className="showcase-header">DOS SHELF</p>
                        <h1 style={styles.title}>Game Center</h1>
                        <p style={styles.description}>
                            Pick a cartridge, read the controls, then launch a
                            preflight window. Games do not boot until you press
                            Play.
                        </p>
                    </div>
                    <div className="big-button-container" style={styles.unlockCard}>
                        <p style={styles.statLabel}>Archive progress</p>
                        <h2>{playedCount}/2</h2>
                        <p style={styles.statCopy}>
                            Boot two games to unlock The Oregon Trail.
                        </p>
                    </div>
                </div>

                <div style={styles.body}>
                    <div style={styles.gameGrid}>
                        {games.map((game) => {
                            const status = getStatus(game.key);
                            const isSelected = game.key === selectedKey;
                            const isLocked = status === 'Locked';

                            return (
                                <button
                                    key={game.key}
                                    type="button"
                                    onClick={() => setSelectedKey(game.key)}
                                    style={Object.assign(
                                        {},
                                        styles.gameCard,
                                        isSelected && styles.selectedCard,
                                        isLocked && styles.lockedCard
                                    )}
                                >
                                    <div style={styles.cardTop}>
                                        <Icon
                                            icon={game.shortcutIcon}
                                            style={styles.cardIcon}
                                        />
                                        <span style={styles.status}>
                                            {status}
                                        </span>
                                    </div>
                                    <h3 style={styles.cardTitle}>{game.name}</h3>
                                    <p style={styles.cardDescription}>
                                        {game.description}
                                    </p>
                                </button>
                            );
                        })}
                    </div>

                    {selectedGame && (
                        <div className="big-button-container" style={styles.detail}>
                            <div style={styles.detailHeader}>
                                <Icon
                                    icon={selectedGame.shortcutIcon}
                                    style={styles.detailIcon}
                                />
                                <div style={styles.detailTitle}>
                                    <p style={styles.statLabel}>
                                        {selectedStatus}
                                    </p>
                                    <h2>{selectedGame.name}</h2>
                                </div>
                            </div>
                            <p style={styles.detailCopy}>
                                {GAME_NOTES[selectedGame.key]}
                            </p>
                            <div style={styles.instructions}>
                                <p>- Press Launch to open the game window.</p>
                                <p>- Press Play inside that window to boot DOS.</p>
                                <p>- Booted games are remembered in this browser.</p>
                            </div>
                            <button
                                type="button"
                                className="site-button"
                                style={styles.launchButton}
                                disabled={!canLaunchSelected}
                                onClick={() =>
                                    props.onLaunchApplication?.(selectedGame.key)
                                }
                            >
                                {canLaunchSelected ? 'Launch' : 'Locked'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Window>
    );
};

const styles: StyleSheetCSS = {
    shell: {
        width: '100%',
        height: '100%',
        padding: 16,
        boxSizing: 'border-box',
        flexDirection: 'column',
        gap: 14,
        backgroundColor: '#efefef',
    },
    header: {
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
    },
    headerCopy: {
        flexDirection: 'column',
        gap: 8,
        flex: 1,
        minWidth: 280,
    },
    title: {
        marginLeft: -8,
    },
    description: {
        maxWidth: 680,
        fontFamily: 'MSSerif',
        fontSize: 15,
    },
    unlockCard: {
        width: 220,
        flexDirection: 'column',
        gap: 6,
        backgroundColor: Colors.lightGray,
    },
    statLabel: {
        fontFamily: 'MSSerif',
        fontSize: 12,
        color: Colors.darkGray,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    statCopy: {
        fontFamily: 'MSSerif',
        fontSize: 13,
    },
    body: {
        flex: 1,
        minHeight: 0,
        gap: 14,
    },
    gameGrid: {
        flex: 1,
        minWidth: 0,
        alignContent: 'flex-start',
        alignItems: 'stretch',
        flexWrap: 'wrap',
        gap: 12,
        overflowY: 'auto',
        paddingRight: 4,
    },
    gameCard: {
        width: 'calc(50% - 6px)',
        minWidth: 220,
        minHeight: 170,
        border: '1px solid #000',
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        borderRightColor: '#808080',
        borderBottomColor: '#808080',
        backgroundColor: '#c0c0c0',
        flexDirection: 'column',
        textAlign: 'left',
        padding: 12,
        gap: 8,
        cursor: 'pointer',
    },
    selectedCard: {
        backgroundColor: '#fbffc4',
    },
    lockedCard: {
        opacity: 0.62,
    },
    cardTop: {
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
    },
    cardIcon: {
        width: 36,
        height: 36,
    },
    status: {
        border: `1px solid ${Colors.black}`,
        backgroundColor: Colors.white,
        padding: '3px 6px',
        fontFamily: 'MSSerif',
        fontSize: 11,
    },
    cardTitle: {
        margin: 0,
    },
    cardDescription: {
        fontFamily: 'MSSerif',
        fontSize: 13,
    },
    detail: {
        width: 320,
        flexDirection: 'column',
        gap: 14,
        backgroundColor: Colors.lightGray,
        overflowY: 'auto',
    },
    detailHeader: {
        alignItems: 'center',
        gap: 12,
    },
    detailIcon: {
        width: 48,
        height: 48,
        flexShrink: 0,
    },
    detailTitle: {
        flexDirection: 'column',
        minWidth: 0,
    },
    detailCopy: {
        fontFamily: 'MSSerif',
        fontSize: 15,
    },
    instructions: {
        flexDirection: 'column',
        gap: 6,
        padding: 10,
        backgroundColor: Colors.white,
        border: `1px solid ${Colors.darkGray}`,
    },
    launchButton: {
        alignSelf: 'flex-start',
        minWidth: 120,
    },
};

export default GameCenter;
