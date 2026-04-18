import React from 'react';
import me from '../../assets/pictures/currentme.webp';
import meNow from '../../assets/pictures/workingAtComputer.png';
import { Link } from 'react-router-dom';

export interface AboutProps {}

const SYSTEM_FACTS = [
    ['Name', 'Montassar Hajri'],
    ['Role', 'Software Engineer'],
    ['Focus', 'Web apps, tooling, and UX systems'],
    ['Mode', 'Build fast, polish hard'],
];

const HOBBIES = [
    'Music production',
    'Digital art',
    'Strength training',
    'Cooking',
    'Retro and modern games',
];

const About: React.FC<AboutProps> = () => {
    return (
        <div className="site-page-content">
            <h1 style={styles.title}>About</h1>
            <h3>Montassar Hajri</h3>

            <div style={styles.panelOuter}>
                <div style={styles.panelInner}>
                    <div style={styles.panelTopBar}>
                        <p className="showcase-header">SYSTEM PROFILE</p>
                    </div>
                    <div style={styles.panelBody}>
                        <div style={styles.panelImageSection}>
                            <img
                                src={me}
                                style={styles.profileImage}
                                alt="Portrait of Montassar Hajri"
                            />
                            <p style={styles.caption}>
                                <sub>
                                    <b>Snapshot:</b> Builder mode always on
                                </sub>
                            </p>
                        </div>
                        <div style={styles.panelInfoSection}>
                            <p>
                                I build software that feels playful to use,
                                reliable in production, and memorable after the
                                first click.
                            </p>
                            <br />
                            {SYSTEM_FACTS.map(([label, value]) => (
                                <div key={label} style={styles.factRow}>
                                    <p style={styles.factLabel}>{label}</p>
                                    <p>{value}</p>
                                </div>
                            ))}
                            <br />
                            <p>
                                Want to collaborate? Open the{' '}
                                <Link to="/contact">contact page</Link> or email{' '}
                                <a href="mailto:montassarhajri@outlook.com">
                                    montassarhajri@outlook.com
                                </a>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div style={styles.infoGrid}>
                <div className="big-button-container" style={styles.infoCard}>
                    <div style={styles.infoCardBody}>
                        <h3>Origin Story</h3>
                        <br />
                        <p>
                            My curiosity for how things work started with LEGO,
                            then moved into web experiments, then into full
                            products and game-inspired interfaces.
                        </p>
                        <br />
                        <p>
                            Today I focus on creating software that balances
                            personality with performance.
                        </p>
                    </div>
                </div>

                <div className="big-button-container" style={styles.infoCard}>
                    <div style={styles.infoCardBody}>
                        <h3>Outside Coding</h3>
                        <br />
                        {HOBBIES.map((hobby) => (
                            <p key={hobby} style={styles.hobbyLine}>
                                - {hobby}
                            </p>
                        ))}
                        <br />
                        <p>
                            More project context lives in{' '}
                            <Link to="/projects/software">Software Projects</Link>.
                        </p>
                    </div>
                </div>
            </div>

            <div style={styles.nowSection}>
                <img
                    src={meNow}
                    style={styles.nowImage}
                    alt="Montassar working at a computer"
                />
                <div style={styles.nowText}>
                    <h3>Currently</h3>
                    <br />
                    <p>
                        Shipping interactive portfolio experiences with a
                        Windows-95-inspired shell and modern frontend
                        architecture behind the scenes.
                    </p>
                </div>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    title: {
        marginLeft: -8,
    },
    panelOuter: {
        marginTop: 16,
        marginBottom: 24,
        border: '1px solid #000',
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        backgroundColor: '#c0c0c0',
        width: '100%',
    },
    panelInner: {
        border: '1px solid #808080',
        borderTopColor: '#dfdfdf',
        borderLeftColor: '#dfdfdf',
        flexDirection: 'column',
        width: '100%',
    },
    panelTopBar: {
        backgroundColor: '#000080',
        height: 24,
        alignItems: 'center',
        paddingLeft: 8,
    },
    panelBody: {
        padding: 12,
        gap: 16,
        width: '100%',
    },
    panelImageSection: {
        width: 240,
        flexShrink: 0,
        flexDirection: 'column',
        alignItems: 'center',
    },
    panelInfoSection: {
        flexDirection: 'column',
        flex: 1,
    },
    profileImage: {
        width: '100%',
        height: 'auto',
        border: '2px solid #000',
    },
    caption: {
        textAlign: 'center',
        marginTop: 8,
    },
    factRow: {
        justifyContent: 'space-between',
        borderBottom: '1px dashed #808080',
        paddingTop: 4,
        paddingBottom: 4,
        gap: 16,
    },
    factLabel: {
        fontFamily: 'MillenniumBold',
        minWidth: 96,
    },
    infoGrid: {
        width: '100%',
        gap: 12,
        marginBottom: 20,
        alignItems: 'stretch',
    },
    infoCard: {
        flex: 1,
        width: '100%',
    },
    infoCardBody: {
        flexDirection: 'column',
        width: '100%',
    },
    hobbyLine: {
        marginBottom: 6,
    },
    nowSection: {
        width: '100%',
        gap: 12,
        marginBottom: 24,
        padding: 12,
        border: '1px solid #808080',
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        backgroundColor: '#efefef',
    },
    nowImage: {
        width: 220,
        height: 'auto',
        border: '1px solid #000',
        flexShrink: 0,
    },
    nowText: {
        flexDirection: 'column',
        flex: 1,
    },
};

export default About;
