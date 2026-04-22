import React, { useEffect, useMemo, useState } from 'react';
import { PROJECT_CASE_STUDIES } from '../../../data/projectCaseStudies';
import type { ProjectCaseStudy } from '../../../data/projectCaseStudies';
import { VideoAsset } from '../../general';

export interface SoftwareProjectsProps {
    embedded?: boolean;
}

interface GitHubRepo {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
    archived: boolean;
    fork: boolean;
    homepage: string | null;
}

type ActivePanel = 'cases' | 'repos';

const REPO_ENDPOINT =
    'https://api.github.com/users/MontaCoder/repos?per_page=100&sort=updated';

const SoftwareProjects: React.FC<SoftwareProjectsProps> = ({ embedded }) => {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activePanel, setActivePanel] = useState<ActivePanel>('cases');
    const [selectedSlug, setSelectedSlug] = useState(
        PROJECT_CASE_STUDIES[0]?.slug ?? ''
    );

    useEffect(() => {
        const controller = new AbortController();

        const fetchRepos = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(REPO_ENDPOINT, {
                    signal: controller.signal,
                    headers: {
                        Accept: 'application/vnd.github+json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Unable to load repositories right now.');
                }

                const data = (await response.json()) as GitHubRepo[];
                setRepos(data);
                setError(null);
            } catch (err: unknown) {
                if (err instanceof DOMException && err.name === 'AbortError') {
                    return;
                }
                setError('Could not load repositories from GitHub.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchRepos();

        return () => {
            controller.abort();
        };
    }, []);

    const featuredRepos = useMemo(() => {
        return repos
            .filter((repo) => !repo.fork && !repo.archived)
            .sort(
                (a, b) =>
                    new Date(b.updated_at).getTime() -
                    new Date(a.updated_at).getTime()
            )
            .slice(0, 12);
    }, [repos]);

    const selectedProject =
        PROJECT_CASE_STUDIES.find((project) => project.slug === selectedSlug) ??
        PROJECT_CASE_STUDIES[0];

    return (
        <div
            className="site-page-content"
            style={embedded ? styles.embeddedPage : undefined}
        >
            <div style={styles.header}>
                <div style={styles.headerText}>
                    <h1>Project Arcade</h1>
                    <h3>Software case studies</h3>
                    <p style={styles.intro}>
                        Curated interactive builds first, live repository feed
                        second. Pick a cartridge to inspect the problem, role,
                        stack, build details, and media.
                    </p>
                </div>
                <div style={styles.panelTabs}>
                    <button
                        type="button"
                        className="site-button"
                        style={Object.assign(
                            {},
                            styles.panelTab,
                            activePanel === 'cases' && styles.activeTab
                        )}
                        onClick={() => setActivePanel('cases')}
                    >
                        Cases
                    </button>
                    <button
                        type="button"
                        className="site-button"
                        style={Object.assign(
                            {},
                            styles.panelTab,
                            activePanel === 'repos' && styles.activeTab
                        )}
                        onClick={() => setActivePanel('repos')}
                    >
                        Repos
                    </button>
                </div>
            </div>

            {activePanel === 'cases' ? (
                <CaseStudyPanel
                    selectedProject={selectedProject}
                    selectedSlug={selectedSlug}
                    onSelectProject={setSelectedSlug}
                />
            ) : (
                <RepoPanel
                    isLoading={isLoading}
                    error={error}
                    repos={featuredRepos}
                />
            )}
        </div>
    );
};

interface CaseStudyPanelProps {
    selectedProject: ProjectCaseStudy;
    selectedSlug: string;
    onSelectProject: (slug: string) => void;
}

const CaseStudyPanel: React.FC<CaseStudyPanelProps> = ({
    selectedProject,
    selectedSlug,
    onSelectProject,
}) => {
    return (
        <div style={styles.caseShell}>
            <div style={styles.caseList}>
                {PROJECT_CASE_STUDIES.map((project) => (
                    <button
                        key={project.slug}
                        type="button"
                        onClick={() => onSelectProject(project.slug)}
                        style={Object.assign(
                            {},
                            styles.caseButton,
                            project.slug === selectedSlug && styles.activeCase
                        )}
                    >
                        <p style={styles.caseButtonTitle}>{project.title}</p>
                        <p style={styles.caseButtonMeta}>{project.role}</p>
                    </button>
                ))}
            </div>

            <div className="big-button-container" style={styles.caseDetail}>
                <div style={styles.mediaFrame}>
                    {selectedProject.media[0]?.type === 'video' && (
                        <VideoAsset src={selectedProject.media[0].src} />
                    )}
                    {selectedProject.media[0]?.type === 'image' && (
                        <img
                            src={selectedProject.media[0].src}
                            alt={selectedProject.media[0].alt}
                            style={styles.previewImage}
                        />
                    )}
                    {!selectedProject.media[0] && (
                        <div style={styles.mediaFallback}>
                            <p className="showcase-header">
                                REPOSITORY CASE FILE
                            </p>
                            <h3>{selectedProject.title}</h3>
                            <p>
                                No local preview asset is attached yet. Open the
                                repository for the source and project details.
                            </p>
                        </div>
                    )}
                </div>

                <div style={styles.detailContent}>
                    <p className="showcase-header" style={styles.caseKicker}>
                        CASE FILE
                    </p>
                    <h2>{selectedProject.title}</h2>
                    <p style={styles.summary}>{selectedProject.summary}</p>

                    <div style={styles.stackRow}>
                        {selectedProject.stack.map((item) => (
                            <span key={item} style={styles.stackChip}>
                                {item}
                            </span>
                        ))}
                    </div>

                    <div style={styles.factGrid}>
                        <div style={styles.factCard}>
                            <h4>Problem</h4>
                            <p>{selectedProject.problem}</p>
                        </div>
                        <div style={styles.factCard}>
                            <h4>Outcome</h4>
                            <p>{selectedProject.outcome}</p>
                        </div>
                    </div>

                    <div style={styles.highlights}>
                        <h4>Build Highlights</h4>
                        {selectedProject.buildHighlights.map((highlight) => (
                            <p key={highlight}>- {highlight}</p>
                        ))}
                    </div>

                    <div style={styles.links}>
                        {selectedProject.links.map((link) => (
                            <a
                                key={link.href}
                                rel="noreferrer"
                                target="_blank"
                                href={link.href}
                            >
                                <p>[{link.label}]</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

interface RepoPanelProps {
    isLoading: boolean;
    error: string | null;
    repos: GitHubRepo[];
}

const RepoPanel: React.FC<RepoPanelProps> = ({ isLoading, error, repos }) => {
    if (isLoading) {
        return (
            <div className="big-button-container" style={styles.statusCard}>
                <p>Loading repositories...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="big-button-container" style={styles.statusCard}>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div style={styles.repoGrid}>
            {repos.map((repo) => {
                const updatedDate = new Date(
                    repo.updated_at
                ).toLocaleDateString();

                return (
                    <div
                        key={repo.id}
                        className="big-button-container"
                        style={styles.repoCard}
                    >
                        <div style={styles.repoHeader}>
                            <h3>{repo.name}</h3>
                            <p style={styles.repoMeta}>
                                {repo.language || 'Code'}
                            </p>
                        </div>

                        <p style={styles.repoDescription}>
                            {repo.description || 'No description provided yet.'}
                        </p>

                        <div style={styles.repoStats}>
                            <p>
                                <b>*</b> {repo.stargazers_count}
                            </p>
                            <p>
                                <b>Forks</b> {repo.forks_count}
                            </p>
                            <p>
                                <b>Updated</b> {updatedDate}
                            </p>
                        </div>

                        <div style={styles.repoLinks}>
                            <a
                                rel="noreferrer"
                                target="_blank"
                                href={repo.html_url}
                            >
                                <p>[Repository]</p>
                            </a>
                            {repo.homepage && (
                                <a
                                    rel="noreferrer"
                                    target="_blank"
                                    href={repo.homepage}
                                >
                                    <p>[Live]</p>
                                </a>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const styles: StyleSheetCSS = {
    header: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 16,
        marginBottom: 18,
        flexWrap: 'wrap',
    },
    embeddedPage: {
        marginLeft: 0,
        padding: 24,
    },
    headerText: {
        flexDirection: 'column',
        gap: 8,
        flex: 1,
        minWidth: 280,
    },
    intro: {
        maxWidth: 760,
    },
    panelTabs: {
        gap: 8,
        flexWrap: 'wrap',
    },
    panelTab: {
        minWidth: 96,
    },
    activeTab: {
        backgroundColor: '#fbffc4',
    },
    caseShell: {
        width: '100%',
        gap: 14,
        alignItems: 'stretch',
    },
    caseList: {
        width: 260,
        flexDirection: 'column',
        gap: 10,
        flexShrink: 0,
    },
    caseButton: {
        border: '1px solid #000',
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        borderRightColor: '#808080',
        borderBottomColor: '#808080',
        backgroundColor: '#c0c0c0',
        padding: 12,
        textAlign: 'left',
        flexDirection: 'column',
        cursor: 'pointer',
    },
    activeCase: {
        backgroundColor: '#fbffc4',
    },
    caseButtonTitle: {
        fontFamily: 'MillenniumBold',
        fontSize: 15,
    },
    caseButtonMeta: {
        fontFamily: 'MSSerif',
        fontSize: 12,
        marginTop: 4,
    },
    caseDetail: {
        flex: 1,
        minWidth: 0,
        padding: 14,
        flexDirection: 'column',
        gap: 16,
    },
    mediaFrame: {
        width: '100%',
        aspectRatio: '16 / 9',
        backgroundColor: '#000',
        overflow: 'hidden',
        border: '1px solid #000',
    },
    mediaFallback: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: 10,
        padding: 20,
        boxSizing: 'border-box',
        backgroundColor: '#000080',
        color: '#fff',
    },
    previewImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    detailContent: {
        flexDirection: 'column',
        gap: 12,
    },
    caseKicker: {
        color: '#000',
    },
    summary: {
        maxWidth: 780,
    },
    stackRow: {
        gap: 8,
        flexWrap: 'wrap',
    },
    stackChip: {
        padding: '4px 8px',
        border: '1px solid #000',
        backgroundColor: '#dfdfdf',
        fontSize: 12,
        whiteSpace: 'nowrap',
    },
    factGrid: {
        gap: 12,
        flexWrap: 'wrap',
    },
    factCard: {
        flex: 1,
        minWidth: 220,
        flexDirection: 'column',
        gap: 6,
        border: '1px solid #808080',
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        backgroundColor: '#efefef',
        padding: 12,
    },
    highlights: {
        flexDirection: 'column',
        gap: 6,
    },
    links: {
        gap: 16,
        flexWrap: 'wrap',
    },
    statusCard: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    repoGrid: {
        width: '100%',
        flexWrap: 'wrap',
        gap: 12,
        alignItems: 'stretch',
    },
    repoCard: {
        width: 'calc(50% - 6px)',
        minHeight: 220,
        padding: 14,
        boxSizing: 'border-box',
        flexDirection: 'column',
    },
    repoHeader: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
        gap: 8,
    },
    repoMeta: {
        fontSize: 14,
    },
    repoDescription: {
        minHeight: 72,
        marginBottom: 12,
    },
    repoStats: {
        justifyContent: 'space-between',
        marginBottom: 12,
        gap: 8,
        flexWrap: 'wrap',
    },
    repoLinks: {
        gap: 16,
    },
};

export default SoftwareProjects;
