import React, { useEffect, useMemo, useState } from 'react';

export interface SoftwareProjectsProps {}

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

const REPO_ENDPOINT =
    'https://api.github.com/users/MontaCoder/repos?per_page=100&sort=updated';

const SoftwareProjects: React.FC<SoftwareProjectsProps> = () => {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
            .slice(0, 18);
    }, [repos]);

    return (
        <div className="site-page-content">
            <h1>Software</h1>
            <h3>Projects</h3>
            <br />
            <p>
                Live repository feed from{' '}
                <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://github.com/MontaCoder?tab=repositories"
                >
                    github.com/MontaCoder
                </a>
                .
            </p>
            <br />

            {isLoading && (
                <div className="big-button-container" style={styles.statusCard}>
                    <p>Loading repositories...</p>
                </div>
            )}

            {!isLoading && error && (
                <div className="big-button-container" style={styles.statusCard}>
                    <p>{error}</p>
                </div>
            )}

            {!isLoading && !error && (
                <div style={styles.repoGrid}>
                    {featuredRepos.map((repo) => {
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
                                    {repo.description ||
                                        'No description provided yet.'}
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
            )}
        </div>
    );
};

const styles: StyleSheetCSS = {
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
