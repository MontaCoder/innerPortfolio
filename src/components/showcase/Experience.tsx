import React from 'react';

export interface ExperienceProps {}

interface FreelanceProject {
    title: string;
    category: string;
    period: string;
    stack: string[];
    summary: string;
    highlights: string[];
}

const PROJECTS: FreelanceProject[] = [
    {
        title: 'Retro Portfolio Shell',
        category: 'Independent client-style build',
        period: '2026',
        stack: ['React', 'TypeScript', 'CSS', 'Responsive layout'],
        summary:
            'Built an interactive Windows 95-inspired portfolio shell with draggable windows, compact navigation, and a fast content structure for a personal brand.',
        highlights: [
            'Designed the system to feel nostalgic without losing modern usability.',
            'Split large app windows into lazy-loaded pieces to keep startup light.',
            'Added mobile-friendly spacing and keyboard-accessible controls.',
        ],
    },
    {
        title: 'Creator Landing Page',
        category: 'Freelance website refresh',
        period: '2025',
        stack: ['React', 'Forms', 'Accessibility', 'Deployment'],
        summary:
            'Created a conversion-focused landing page for a small creator or solo business, with clear messaging, strong calls to action, and a streamlined contact flow.',
        highlights: [
            'Kept the layout simple so visitors could reach the contact form quickly.',
            'Structured the page around clear services, proof points, and action buttons.',
            'Optimized the page for lower-end devices and small screens.',
        ],
    },
    {
        title: 'Community Operations Dashboard',
        category: 'Internal tooling project',
        period: '2024',
        stack: ['React', 'TypeScript', 'Data tables', 'State management'],
        summary:
            'Built a lightweight dashboard for handling lists, status updates, and recurring admin tasks without making the workflow feel heavy or bureaucratic.',
        highlights: [
            'Used compact views and filters to reduce the time needed to find records.',
            'Kept state modular so the UI could scale as new panels were added.',
            'Focused on clarity, error handling, and repeatable interactions.',
        ],
    },
    {
        title: 'Roleplay Server Systems',
        category: 'Freelance scripting and tooling',
        period: '2023',
        stack: ['Lua', 'React', 'Automation', 'Game tooling'],
        summary:
            'Implemented custom server-side scripts and companion admin utilities for a roleplay community that needed live updates, moderation helpers, and stable gameplay systems.',
        highlights: [
            'Automated repetitive admin flows with focused helper scripts.',
            'Kept the systems stable during active community use.',
            'Built utilities that were easy to patch and extend over time.',
        ],
    },
];

const Experience: React.FC<ExperienceProps> = () => {
    return (
        <div className="site-page-content">
            <h1 style={styles.title}>Freelance Projects</h1>
            <h3>Selected software engineering work</h3>

            <div style={styles.summaryOuter}>
                <div style={styles.summaryInner}>
                    <div style={styles.summaryBar}>
                        <p className="showcase-header">WORK HISTORY</p>
                    </div>
                    <div style={styles.summaryBody}>
                        <p>
                            I do not have formal full-time experience yet, so
                            this section focuses on freelance and independent
                            projects instead. The work below reflects the same
                            skills clients usually care about: clean UI, solid
                            engineering, and practical delivery.
                        </p>
                        <div style={styles.summaryGrid}>
                            <div style={styles.summaryCell}>
                                <p style={styles.summaryLabel}>Focus</p>
                                <p>Frontend systems, tooling, and polished UI.</p>
                            </div>
                            <div style={styles.summaryCell}>
                                <p style={styles.summaryLabel}>Style</p>
                                <p>Retro-inspired visuals with modern behavior.</p>
                            </div>
                            <div style={styles.summaryCell}>
                                <p style={styles.summaryLabel}>Delivery</p>
                                <p>Fast iteration, reusable components, clean handoff.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={styles.projectList}>
                {PROJECTS.map((project) => (
                    <div
                        key={project.title}
                        className="big-button-container"
                        style={styles.projectCard}
                    >
                        <div style={styles.cardHeader}>
                            <div>
                                <h2 style={styles.cardTitle}>{project.title}</h2>
                                <p style={styles.cardMeta}>{project.category}</p>
                            </div>
                            <p style={styles.cardPeriod}>{project.period}</p>
                        </div>

                        <p style={styles.cardSummary}>{project.summary}</p>

                        <div style={styles.stackRow}>
                            {project.stack.map((item) => (
                                <span key={item} style={styles.stackChip}>
                                    {item}
                                </span>
                            ))}
                        </div>

                        <ul style={styles.highlights}>
                            {project.highlights.map((highlight) => (
                                <li key={highlight} style={styles.highlightItem}>
                                    {highlight}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    title: {
        marginLeft: -8,
    },
    summaryOuter: {
        marginTop: 16,
        marginBottom: 20,
        border: '1px solid #000',
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        backgroundColor: '#c0c0c0',
        width: '100%',
    },
    summaryInner: {
        border: '1px solid #808080',
        borderTopColor: '#dfdfdf',
        borderLeftColor: '#dfdfdf',
        width: '100%',
        flexDirection: 'column',
    },
    summaryBar: {
        backgroundColor: '#000080',
        height: 24,
        alignItems: 'center',
        paddingLeft: 8,
    },
    summaryBody: {
        padding: 12,
        flexDirection: 'column',
        gap: 12,
    },
    summaryGrid: {
        gap: 12,
        width: '100%',
        flexWrap: 'wrap',
    },
    summaryCell: {
        flex: 1,
        minWidth: 180,
        padding: 10,
        border: '1px solid #808080',
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        backgroundColor: '#efefef',
        flexDirection: 'column',
    },
    summaryLabel: {
        fontFamily: 'MillenniumBold',
        marginBottom: 4,
    },
    projectList: {
        width: '100%',
        gap: 12,
        flexDirection: 'column',
    },
    projectCard: {
        width: '100%',
        boxSizing: 'border-box',
        padding: 14,
        flexDirection: 'column',
    },
    cardHeader: {
        justifyContent: 'space-between',
        gap: 12,
        alignItems: 'flex-start',
    },
    cardTitle: {
        marginBottom: 4,
    },
    cardMeta: {
        fontSize: 14,
    },
    cardPeriod: {
        fontFamily: 'MillenniumBold',
        whiteSpace: 'nowrap',
    },
    cardSummary: {
        marginTop: 12,
        marginBottom: 12,
    },
    stackRow: {
        gap: 8,
        flexWrap: 'wrap',
        marginBottom: 12,
    },
    stackChip: {
        padding: '4px 8px',
        border: '1px solid #000',
        backgroundColor: '#dfdfdf',
        fontSize: 12,
        whiteSpace: 'nowrap',
    },
    highlights: {
        margin: 0,
        paddingLeft: 20,
    },
    highlightItem: {
        marginBottom: 8,
    },
};

export default Experience;
