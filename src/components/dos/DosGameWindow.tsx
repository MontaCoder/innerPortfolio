import React, { useState } from 'react';
import Colors from '../../constants/colors';
import { IconName } from '../../assets/icons';
import { Icon } from '../general';
import Window from '../os/Window';
import { recordGamePlayed } from '../../session/montaSession';
import DosPlayer from './DosPlayer';

interface DosGameWindowProps extends WindowAppProps {
    appKey: string;
    title: string;
    bundleUrl: string;
    windowBarColor: string;
    icon: IconName;
    initialWidth?: number;
    initialHeight?: number;
    instructions: string[];
}

const resolveBundleUrl = (bundleUrl: string) => {
    const baseUrl = new URL(import.meta.env.BASE_URL, window.location.origin);
    return new URL(bundleUrl, baseUrl).toString();
};

const DosGameWindow: React.FC<DosGameWindowProps> = ({
    appKey,
    title,
    bundleUrl,
    windowBarColor,
    icon,
    initialWidth = 980,
    initialHeight = 670,
    instructions,
    onClose,
    onInteract,
    onMinimize,
}) => {
    const [width, setWidth] = useState(initialWidth);
    const [height, setHeight] = useState(initialHeight);
    const [hasStarted, setHasStarted] = useState(false);
    const [isCheckingBundle, setIsCheckingBundle] = useState(false);
    const [error, setError] = useState('');

    const startGame = async () => {
        setIsCheckingBundle(true);
        setError('');

        try {
            const response = await fetch(resolveBundleUrl(bundleUrl), {
                method: 'HEAD',
            });

            if (!response.ok) {
                throw new Error('Missing game bundle');
            }

            recordGamePlayed(appKey);
            setHasStarted(true);
        } catch {
            setError(
                'The game bundle could not be found. Try refreshing or launching another game.'
            );
        } finally {
            setIsCheckingBundle(false);
        }
    };

    return (
        <Window
            top={10}
            left={10}
            width={width}
            height={height}
            windowTitle={title}
            windowBarColor={windowBarColor}
            windowBarIcon="windowGameIcon"
            bottomLeftText={
                hasStarted ? 'Powered by JSDOS & DOSBox' : 'Ready to boot'
            }
            closeWindow={onClose}
            onInteract={onInteract}
            minimizeWindow={onMinimize}
            onWidthChange={setWidth}
            onHeightChange={setHeight}
        >
            {hasStarted ? (
                <DosPlayer
                    width={width}
                    height={height}
                    bundleUrl={bundleUrl}
                />
            ) : (
                <div style={styles.launchScreen}>
                    <div className="big-button-container" style={styles.panel}>
                        <div style={styles.header}>
                            <Icon icon={icon} style={styles.icon} />
                            <div style={styles.headerText}>
                                <p style={styles.kicker}>DOS ARCHIVE</p>
                                <h1 style={styles.title}>{title}</h1>
                            </div>
                        </div>

                        <p style={styles.copy}>
                            This window will boot an emulator only after you
                            press Play. Audio and keyboard input may be captured
                            by the game once it starts.
                        </p>

                        <div style={styles.instructions}>
                            {instructions.map((instruction) => (
                                <p key={instruction} style={styles.instruction}>
                                    - {instruction}
                                </p>
                            ))}
                        </div>

                        {error && <p style={styles.error}>{error}</p>}

                        <button
                            type="button"
                            className="site-button"
                            style={styles.playButton}
                            onClick={startGame}
                            disabled={isCheckingBundle}
                        >
                            {isCheckingBundle ? 'Checking...' : 'Play'}
                        </button>
                    </div>
                </div>
            )}
        </Window>
    );
};

const styles: StyleSheetCSS = {
    launchScreen: {
        width: '100%',
        height: '100%',
        padding: 24,
        boxSizing: 'border-box',
        backgroundColor: '#111',
        justifyContent: 'center',
        alignItems: 'center',
    },
    panel: {
        width: '100%',
        maxWidth: 720,
        flexDirection: 'column',
        gap: 16,
        backgroundColor: Colors.lightGray,
    },
    header: {
        alignItems: 'center',
        gap: 16,
    },
    icon: {
        width: 48,
        height: 48,
        flexShrink: 0,
    },
    headerText: {
        flexDirection: 'column',
        minWidth: 0,
    },
    kicker: {
        fontFamily: 'MSSerif',
        fontSize: 12,
        color: Colors.darkGray,
        letterSpacing: 1,
    },
    title: {
        fontSize: 48,
        lineHeight: 0.95,
    },
    copy: {
        fontFamily: 'MSSerif',
        fontSize: 15,
    },
    instructions: {
        flexDirection: 'column',
        gap: 6,
        padding: 12,
        backgroundColor: Colors.white,
        border: `1px solid ${Colors.darkGray}`,
    },
    instruction: {
        fontFamily: 'MSSerif',
        fontSize: 14,
    },
    error: {
        color: Colors.red,
        fontFamily: 'MSSerif',
        fontSize: 14,
    },
    playButton: {
        alignSelf: 'flex-start',
        minWidth: 140,
        height: 34,
    },
};

export default DosGameWindow;

