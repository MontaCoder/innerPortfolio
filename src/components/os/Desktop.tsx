import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import Colors from '../../constants/colors';
import ShutdownSequence from './ShutdownSequence';
import Toolbar from './Toolbar';
import DesktopShortcut, { DesktopShortcutProps } from './DesktopShortcut';
import {
    getAppByKey,
    getBootApps,
    getDesktopApps,
    getFeaturedApps,
} from './appManifest';

export interface DesktopProps {}

const Desktop: React.FC<DesktopProps> = (props) => {
    const [windows, setWindows] = useState<DesktopWindows>({});

    const [shutdown, setShutdown] = useState(false);
    const [numShutdowns, setNumShutdowns] = useState(1);

    const rebootDesktop = useCallback(() => {
        setWindows({});
    }, []);

    const getHighestZIndexFrom = useCallback((windowMap: DesktopWindows) => {
        let highestZIndex = 0;

        Object.keys(windowMap).forEach((key) => {
            const window = windowMap[key];
            if (window && window.zIndex > highestZIndex) {
                highestZIndex = window.zIndex;
            }
        });

        return highestZIndex;
    }, []);

    const removeWindow = useCallback((key: string) => {
        setWindows((prevWindows) => {
            const newWindows = { ...prevWindows };
            delete newWindows[key];
            return newWindows;
        });
    }, []);

    const minimizeWindow = useCallback((key: string) => {
        setWindows((prevWindows) => {
            const currentWindow = prevWindows[key];
            if (!currentWindow) {
                return prevWindows;
            }

            return {
                ...prevWindows,
                [key]: {
                    ...currentWindow,
                    minimized: true,
                },
            };
        });
    }, []);

    const toggleMinimize = useCallback(
        (key: string) => {
            setWindows((prevWindows) => {
                const currentWindow = prevWindows[key];
                if (!currentWindow) {
                    return prevWindows;
                }

                const highestIndex = getHighestZIndexFrom(prevWindows);
                const shouldToggle =
                    currentWindow.minimized ||
                    currentWindow.zIndex === highestIndex;

                return {
                    ...prevWindows,
                    [key]: {
                        ...currentWindow,
                        minimized: shouldToggle
                            ? !currentWindow.minimized
                            : currentWindow.minimized,
                        zIndex: highestIndex + 1,
                    },
                };
            });
        },
        [getHighestZIndexFrom]
    );

    const onWindowInteract = useCallback(
        (key: string) => {
            setWindows((prevWindows) => {
                const currentWindow = prevWindows[key];
                if (!currentWindow) {
                    return prevWindows;
                }

                return {
                    ...prevWindows,
                    [key]: {
                        ...currentWindow,
                        zIndex: 1 + getHighestZIndexFrom(prevWindows),
                    },
                };
            });
        },
        [getHighestZIndexFrom]
    );

    const openApplication = useCallback(
        (key: string) => {
            const app = getAppByKey(key);
            if (!app) {
                return;
            }

            setWindows((prevWindows) => {
                const highestIndex = getHighestZIndexFrom(prevWindows);
                const currentWindow = prevWindows[key];

                if (currentWindow) {
                    return {
                        ...prevWindows,
                        [key]: {
                            ...currentWindow,
                            minimized: false,
                            zIndex: highestIndex + 1,
                        },
                    };
                }

                return {
                    ...prevWindows,
                    [key]: {
                        zIndex: highestIndex + 1,
                        minimized: false,
                        component: (
                            <app.component
                                onInteract={() => onWindowInteract(key)}
                                onMinimize={() => minimizeWindow(key)}
                                onClose={() => removeWindow(key)}
                                onLaunchApplication={openApplication}
                                key={key}
                            />
                        ),
                        name: app.name,
                        icon: app.shortcutIcon,
                    },
                };
            });
        },
        [getHighestZIndexFrom, minimizeWindow, onWindowInteract, removeWindow]
    );

    const desktopApps = useMemo(() => getDesktopApps(), []);
    const featuredApps = useMemo(() => getFeaturedApps(), []);

    const shortcuts = useMemo(
        () =>
            desktopApps.map((app) => ({
                shortcutName: app.name,
                icon: app.shortcutIcon,
                onOpen: () => openApplication(app.key),
            })),
        [desktopApps, openApplication]
    );

    useEffect(() => {
        if (shutdown === true) {
            rebootDesktop();
            return;
        }

        getBootApps().forEach((app) => {
            openApplication(app.key);
        });
    }, [openApplication, rebootDesktop, shutdown]);

    const startShutdown = useCallback(() => {
        setTimeout(() => {
            setShutdown(true);
            setNumShutdowns((count) => count + 1);
        }, 600);
    }, []);

    return !shutdown ? (
        <div style={styles.desktop}>
            {/* For each window in windows, loop over and render  */}
            {Object.keys(windows).map((key) => {
                const element = windows[key].component;
                if (!element) return <div key={`win-${key}`}></div>;
                return (
                    <div
                        key={`win-${key}`}
                        style={Object.assign(
                            {},
                            { zIndex: windows[key].zIndex },
                            windows[key].minimized && styles.minimized
                        )}
                    >
                        <Suspense fallback={<div style={styles.appLoading}>Loading app...</div>}>
                            {React.cloneElement(element, {
                                key,
                                onInteract: () => onWindowInteract(key),
                                onClose: () => removeWindow(key),
                            })}
                        </Suspense>
                    </div>
                );
            })}
            <div style={styles.shortcuts}>
                {shortcuts.map((shortcut, i) => {
                    return (
                        <div
                            style={Object.assign({}, styles.shortcutContainer, {
                                top: i * 104,
                            })}
                            key={shortcut.shortcutName}
                        >
                            <DesktopShortcut
                                icon={shortcut.icon}
                                shortcutName={shortcut.shortcutName}
                                onOpen={shortcut.onOpen}
                            />
                        </div>
                    );
                })}
            </div>
            <Toolbar
                windows={windows}
                toggleMinimize={toggleMinimize}
                shutdown={startShutdown}
                onLaunchApplication={openApplication}
                featuredApps={featuredApps}
            />
        </div>
    ) : (
        <ShutdownSequence
            setShutdown={setShutdown}
            numShutdowns={numShutdowns}
        />
    );
};

const styles: StyleSheetCSS = {
    desktop: {
        minHeight: '100%',
        flex: 1,
        backgroundImage: '../../assets/pictures/currentme.jpg'
    },
    shutdown: {
        minHeight: '100%',
        flex: 1,
        backgroundColor: '#1d2e2f',
    },
    shortcutContainer: {
        position: 'absolute',
    },
    shortcuts: {
        position: 'absolute',
        top: 16,
        left: 6,
    },
    minimized: {
        pointerEvents: 'none',
        opacity: 0,
    },
    appLoading: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.lightGray,
        color: Colors.black,
        fontFamily: 'MSSerif',
        fontSize: 14,
    },
};

export default Desktop;
