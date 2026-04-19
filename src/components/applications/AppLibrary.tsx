import React, { useEffect, useMemo, useState } from 'react';
import { Icon } from '../general';
import Window from '../os/Window';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';
import {
    APP_CATEGORY_LABELS,
    APP_CATEGORY_ORDER,
    getAllApps,
    getLauncherApps,
} from '../os/appManifest';
import type { AppCategory, AppDefinition } from '../os/appManifest';

export interface AppLibraryProps extends WindowAppProps {}

type CategoryFilter = AppCategory | 'all';
const RECENT_APPS_STORAGE_KEY = 'inner-portfolio.recent-apps';

const readRecentAppKeys = (): string[] => {
    if (typeof window === 'undefined') {
        return [];
    }

    try {
        const rawValue = window.localStorage.getItem(RECENT_APPS_STORAGE_KEY);
        if (!rawValue) {
            return [];
        }

        const parsed = JSON.parse(rawValue) as unknown;
        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed.filter((item): item is string => typeof item === 'string');
    } catch {
        return [];
    }
};

const saveRecentAppKeys = (keys: string[]) => {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        window.localStorage.setItem(
            RECENT_APPS_STORAGE_KEY,
            JSON.stringify(keys)
        );
    } catch {
        // Ignore storage failures in private browsing or locked-down contexts.
    }
};

const AppLibrary: React.FC<AppLibraryProps> = (props) => {
    const { initWidth, initHeight } = useInitialWindowSize({ margin: 80 });
    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
    const [recentAppKeys, setRecentAppKeys] = useState<string[]>([]);

    const allApps = useMemo(() => getAllApps(), []);
    const launchableApps = useMemo(() => getLauncherApps(), []);
    const featuredApps = useMemo(
        () => launchableApps.filter((app) => app.featured),
        [launchableApps]
    );
    const recentApps = useMemo(
        () =>
            recentAppKeys
                .map((key) => launchableApps.find((app) => app.key === key))
                .filter((app): app is AppDefinition => Boolean(app)),
        [launchableApps, recentAppKeys]
    );
    const desktopVisibleCount = useMemo(
        () => allApps.filter((app) => app.showOnDesktop !== false).length,
        [allApps]
    );
    const hiddenCount = useMemo(
        () => allApps.filter((app) => app.showOnDesktop === false).length,
        [allApps]
    );

    const categoryOptions = useMemo(() => {
        const categories = new Set<AppCategory>();

        launchableApps.forEach((app) => {
            categories.add(app.category);
        });

        return APP_CATEGORY_ORDER.filter((category) => categories.has(category));
    }, [launchableApps]);

    const filteredApps = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        return launchableApps.filter((app) => {
            const categoryMatches =
                activeCategory === 'all' || app.category === activeCategory;
            const textMatches =
                normalizedQuery.length === 0 ||
                [app.name, app.description, app.category]
                    .join(' ')
                    .toLowerCase()
                    .includes(normalizedQuery);

            return categoryMatches && textMatches;
        });
    }, [activeCategory, launchableApps, query]);

    useEffect(() => {
        setRecentAppKeys(readRecentAppKeys());
    }, []);

    const handleLaunch = (key: string) => {
        props.onLaunchApplication?.(key);

        setRecentAppKeys((previousKeys) => {
            const nextKeys = [key, ...previousKeys.filter((item) => item !== key)]
                .slice(0, 6);

            saveRecentAppKeys(nextKeys);

            return nextKeys;
        });
    };

    return (
        <Window
            top={20}
            left={20}
            width={initWidth}
            height={initHeight}
            windowTitle="App Library"
            windowBarIcon="windowExplorerIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'Search and launch the portfolio'}
        >
            <div style={styles.shell}>
                <div style={styles.header}>
                    <div style={styles.headerText}>
                        <p className="showcase-header">PORTAL INDEX</p>
                        <h1 style={styles.title}>App Library</h1>
                        <p style={styles.description}>
                            Search every public app, game, and hidden surface
                            from the desktop shell.
                        </p>
                    </div>
                    <div style={styles.searchPanel}>
                        <label htmlFor="app-library-search" style={styles.label}>
                            Search
                        </label>
                        <input
                            id="app-library-search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Type an app, game, or feature..."
                            style={styles.searchInput}
                        />
                    </div>
                </div>

                <div style={styles.summaryGrid}>
                    <div className="big-button-container" style={styles.summaryCard}>
                        <p style={styles.summaryLabel}>Launchable apps</p>
                        <h2 style={styles.summaryValue}>{launchableApps.length}</h2>
                    </div>
                    <div className="big-button-container" style={styles.summaryCard}>
                        <p style={styles.summaryLabel}>Catalog entries</p>
                        <h2 style={styles.summaryValue}>{allApps.length}</h2>
                    </div>
                    <div className="big-button-container" style={styles.summaryCard}>
                        <p style={styles.summaryLabel}>Desktop icons</p>
                        <h2 style={styles.summaryValue}>{desktopVisibleCount}</h2>
                    </div>
                    <div className="big-button-container" style={styles.summaryCard}>
                        <p style={styles.summaryLabel}>Hidden surfaces</p>
                        <h2 style={styles.summaryValue}>{hiddenCount}</h2>
                    </div>
                </div>

                <div style={styles.quickLaunchHeader}>
                    <p className="showcase-header">FAST LAUNCH</p>
                    <p style={styles.quickLaunchDescription}>
                        Jump straight into the strongest portfolio surfaces.
                    </p>
                </div>

                <div style={styles.quickLaunchRow}>
                    {featuredApps.map((app) => (
                        <button
                            key={app.key}
                            type="button"
                            onClick={() => handleLaunch(app.key)}
                            style={styles.quickLaunchCard}
                        >
                            <Icon icon={app.shortcutIcon} style={styles.quickLaunchIcon} />
                            <div style={styles.quickLaunchText}>
                                <p style={styles.quickLaunchTitle}>{app.name}</p>
                                <p style={styles.quickLaunchMeta}>{app.description}</p>
                            </div>
                        </button>
                    ))}
                </div>

                <div style={styles.recentHeader}>
                    <p className="showcase-header">RECENT</p>
                    <p style={styles.quickLaunchDescription}>
                        Jump back into the apps you already opened during this
                        visit.
                    </p>
                </div>

                <div style={styles.recentRow}>
                    {recentApps.length > 0 ? (
                        recentApps.map((app) => (
                            <button
                                key={app.key}
                                type="button"
                                onClick={() => handleLaunch(app.key)}
                                style={styles.recentCard}
                            >
                                <Icon
                                    icon={app.shortcutIcon}
                                    style={styles.recentIcon}
                                />
                                <div style={styles.recentText}>
                                    <p style={styles.recentTitle}>{app.name}</p>
                                    <p style={styles.quickLaunchMeta}>
                                        {APP_CATEGORY_LABELS[app.category]}
                                    </p>
                                </div>
                            </button>
                        ))
                    ) : (
                        <div className="big-button-container" style={styles.emptyRecentState}>
                            <h3>No recent apps yet</h3>
                            <p>
                                Open a few windows and this section will track your
                                session so you can jump back faster.
                            </p>
                        </div>
                    )}
                </div>

                <div style={styles.filters}>
                    <FilterChip
                        label="All"
                        isActive={activeCategory === 'all'}
                        onClick={() => setActiveCategory('all')}
                    />
                    {categoryOptions.map((category) => (
                        <FilterChip
                            key={category}
                            label={APP_CATEGORY_LABELS[category]}
                            isActive={activeCategory === category}
                            onClick={() => setActiveCategory(category)}
                        />
                    ))}
                </div>

                <div style={styles.metaRow}>
                    <p>
                        Showing <b>{filteredApps.length}</b> of{' '}
                        <b>{launchableApps.length}</b> launchable apps
                    </p>
                    <p>
                        Hidden and experimental content lives in this catalog
                        rather than on the desktop.
                    </p>
                </div>

                <div style={styles.grid}>
                    {filteredApps.length > 0 ? (
                        filteredApps.map((app) => (
                            <AppCard key={app.key} app={app} onLaunch={handleLaunch} />
                        ))
                    ) : (
                        <div className="big-button-container" style={styles.emptyState}>
                            <h3>No matching apps</h3>
                            <p>
                                Clear the search or switch categories to reveal more
                                of the portfolio shell.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Window>
    );
};

interface FilterChipProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, isActive, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            style={Object.assign({}, styles.filterChip, isActive && styles.filterChipActive)}
        >
            {label}
        </button>
    );
};

interface AppCardProps {
    app: AppDefinition;
    onLaunch: (key: string) => void;
}

const AppCard: React.FC<AppCardProps> = ({ app, onLaunch }) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onLaunch(app.key);
        }
    };

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => onLaunch(app.key)}
            onKeyDown={handleKeyDown}
            style={styles.card}
        >
            <div style={styles.cardHeader}>
                <Icon icon={app.shortcutIcon} style={styles.cardIcon} />
                <div style={styles.cardHeaderText}>
                    <h3 style={styles.cardTitle}>{app.name}</h3>
                    <p style={styles.cardCategory}>{APP_CATEGORY_LABELS[app.category]}</p>
                </div>
            </div>

            <p style={styles.cardDescription}>{app.description}</p>

            <div style={styles.badgeRow}>
                {app.featured && <Badge label="Featured" />}
                {!app.showOnDesktop && <Badge label="Launcher-only" />}
                {app.launchOnBoot && <Badge label="Boot app" />}
            </div>

            <div style={styles.cardFooter}>
                <p style={styles.launchHint}>Open app</p>
                <p style={styles.launchArrow}>?</p>
            </div>
        </div>
    );
};

interface BadgeProps {
    label: string;
}

const Badge: React.FC<BadgeProps> = ({ label }) => {
    return <span style={styles.badge}>{label}</span>;
};

const styles: StyleSheetCSS = {
    shell: {
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: 16,
        boxSizing: 'border-box',
        gap: 12,
    },
    header: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 16,
        flexWrap: 'wrap',
    },
    headerText: {
        flexDirection: 'column',
        gap: 6,
        flex: 1,
        minWidth: 280,
    },
    title: {
        marginLeft: -8,
    },
    description: {
        maxWidth: 560,
    },
    summaryGrid: {
        width: '100%',
        gap: 12,
        flexWrap: 'wrap',
    },
    summaryCard: {
        flexDirection: 'column',
        flex: '1 1 180px',
        padding: 14,
        boxSizing: 'border-box',
        minHeight: 92,
    },
    summaryLabel: {
        fontFamily: 'MSSerif',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#404040',
        marginBottom: 4,
    },
    summaryValue: {
        margin: 0,
        fontSize: 40,
        lineHeight: 1,
    },
    quickLaunchHeader: {
        width: '100%',
        gap: 8,
        alignItems: 'baseline',
        flexWrap: 'wrap',
    },
    quickLaunchDescription: {
        fontFamily: 'MSSerif',
        fontSize: 13,
        color: '#404040',
    },
    quickLaunchRow: {
        width: '100%',
        flexWrap: 'wrap',
        gap: 12,
    },
    recentHeader: {
        width: '100%',
        gap: 8,
        alignItems: 'baseline',
        flexWrap: 'wrap',
    },
    recentRow: {
        width: '100%',
        flexWrap: 'wrap',
        gap: 12,
    },
    recentCard: {
        flex: '1 1 200px',
        minWidth: 200,
        padding: 12,
        boxSizing: 'border-box',
        cursor: 'pointer',
        border: '1px solid #000',
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        borderRightColor: '#808080',
        borderBottomColor: '#808080',
        backgroundColor: '#efefef',
        alignItems: 'center',
        gap: 10,
        textAlign: 'left',
    },
    recentIcon: {
        width: 24,
        height: 24,
        flexShrink: 0,
    },
    recentText: {
        flexDirection: 'column',
        minWidth: 0,
        flex: 1,
    },
    recentTitle: {
        fontFamily: 'MSSerif',
        fontSize: 14,
        marginBottom: 2,
    },
    quickLaunchCard: {
        flex: '1 1 240px',
        minWidth: 240,
        padding: 12,
        boxSizing: 'border-box',
        cursor: 'pointer',
        border: '1px solid #000',
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        borderRightColor: '#808080',
        borderBottomColor: '#808080',
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        gap: 10,
        textAlign: 'left',
    },
    quickLaunchIcon: {
        width: 28,
        height: 28,
        flexShrink: 0,
    },
    quickLaunchText: {
        flexDirection: 'column',
        minWidth: 0,
        flex: 1,
    },
    quickLaunchTitle: {
        fontFamily: 'MSSerif',
        fontSize: 14,
        marginBottom: 2,
    },
    quickLaunchMeta: {
        fontFamily: 'MSSerif',
        fontSize: 12,
        color: '#404040',
    },
    searchPanel: {
        flexDirection: 'column',
        gap: 6,
        minWidth: 280,
        maxWidth: 360,
        flex: 1,
    },
    label: {
        fontFamily: 'MSSerif',
        fontSize: 14,
    },
    searchInput: {
        width: '100%',
        boxSizing: 'border-box',
        border: '1px solid #000',
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        borderRightColor: '#808080',
        borderBottomColor: '#808080',
        backgroundColor: '#fff',
        padding: '10px 12px',
        fontFamily: 'MSSerif',
        fontSize: 14,
        outline: 'none',
    },
    filters: {
        flexWrap: 'wrap',
        gap: 8,
        width: '100%',
    },
    filterChip: {
        cursor: 'pointer',
        border: '1px solid #000',
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        borderRightColor: '#808080',
        borderBottomColor: '#808080',
        backgroundColor: '#dcdcdc',
        padding: '8px 12px',
        fontFamily: 'MSSerif',
        fontSize: 13,
    },
    filterChipActive: {
        backgroundColor: '#000080',
        color: '#fff',
    },
    metaRow: {
        justifyContent: 'space-between',
        gap: 12,
        flexWrap: 'wrap',
        fontFamily: 'MSSerif',
        fontSize: 13,
    },
    grid: {
        width: '100%',
        flexWrap: 'wrap',
        gap: 12,
        alignItems: 'stretch',
    },
    emptyState: {
        width: '100%',
        padding: 20,
        boxSizing: 'border-box',
        flexDirection: 'column',
        gap: 8,
    },
    emptyRecentState: {
        width: '100%',
        padding: 16,
        boxSizing: 'border-box',
        flexDirection: 'column',
        gap: 8,
    },
    card: {
        width: 'calc(50% - 6px)',
        minWidth: 280,
        minHeight: 180,
        boxSizing: 'border-box',
        padding: 14,
        backgroundColor: '#c0c0c0',
        border: '1px solid #000',
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        borderRightColor: '#808080',
        borderBottomColor: '#808080',
        flexDirection: 'column',
        gap: 12,
        cursor: 'pointer',
        outline: 'none',
    },
    cardHeader: {
        alignItems: 'center',
        gap: 12,
    },
    cardHeaderText: {
        flexDirection: 'column',
        gap: 2,
        flex: 1,
    },
    cardIcon: {
        width: 32,
        height: 32,
        flexShrink: 0,
    },
    cardTitle: {
        margin: 0,
    },
    cardCategory: {
        fontSize: 12,
        fontFamily: 'MSSerif',
    },
    cardDescription: {
        flex: 1,
        fontFamily: 'MSSerif',
        fontSize: 14,
    },
    badgeRow: {
        flexWrap: 'wrap',
        gap: 8,
    },
    badge: {
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: 999,
        border: '1px solid #000',
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        backgroundColor: '#efefef',
        padding: '4px 8px',
        fontFamily: 'MSSerif',
        fontSize: 11,
    },
    cardFooter: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto',
    },
    launchHint: {
        fontFamily: 'MSSerif',
        fontSize: 13,
    },
    launchArrow: {
        fontFamily: 'MSSerif',
        fontSize: 20,
    },
};

export default AppLibrary;
