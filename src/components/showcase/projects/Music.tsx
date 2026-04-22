import React, { useMemo, useState } from 'react';
import house from '../../../assets/audio/house_master.mp3';
import edge from '../../../assets/audio/edge_unmastered.mp3';
import dnb from '../../../assets/audio/break.mp3';
import dnbDrums from '../../../assets/audio/dnb_drop_drums.mp3';
import houseProject from '../../../assets/pictures/projects/audio/houseProject.png';
import dnbDrumsProject from '../../../assets/pictures/projects/audio/dnbDrumsProject.png';
import { MusicPlayer } from '../../general';

export interface MusicProjectsProps {
    embedded?: boolean;
}

interface Track {
    id: string;
    src: string;
    title: string;
    subtitle: string;
    style: string;
    note: string;
    image?: string;
}

const TRACKS: Track[] = [
    {
        id: 'timeless',
        src: house,
        title: 'Timeless',
        subtitle: 'Montassar Hajri - 2022',
        style: 'House',
        note: 'A bright house sketch built around contrast: upbeat movement, a richer bridge, then a darker final build.',
        image: houseProject,
    },
    {
        id: 'edge',
        src: edge,
        title: 'Edge [W.I.P.]',
        subtitle: 'Montassar Hajri - 2021',
        style: 'Mid-tempo',
        note: 'A darker bass and percussion experiment where the sound design carries most of the character.',
    },
    {
        id: 'break',
        src: dnb,
        title: 'Break [Demo]',
        subtitle: 'Montassar Hajri - 2019/2022',
        style: 'Drum & bass',
        note: 'A revived DnB idea with a bassline and drum groove strong enough to keep coming back to.',
    },
    {
        id: 'break-drums',
        src: dnbDrums,
        title: 'Break [Drums and Sub]',
        subtitle: 'Montassar Hajri - 2019/2022',
        style: 'Drum mix',
        note: 'The isolated drums and sub from Break, useful for hearing the layers and sidechain pocket.',
        image: dnbDrumsProject,
    },
];

const MusicProjects: React.FC<MusicProjectsProps> = ({ embedded }) => {
    const [currentSong, setCurrentSong] = useState<string>('');
    const [selectedTrackId, setSelectedTrackId] = useState(TRACKS[0].id);

    const selectedTrack = useMemo(
        () =>
            TRACKS.find((track) => track.id === selectedTrackId) ?? TRACKS[0],
        [selectedTrackId]
    );

    return (
        <div
            className="site-page-content"
            style={embedded ? styles.embeddedPage : undefined}
        >
            <div style={styles.header}>
                <div style={styles.headerText}>
                    <h1>Music Studio</h1>
                    <h3>Tracks, notes, and production snapshots</h3>
                    <p style={styles.intro}>
                        A compact listening room for a few unreleased sketches,
                        demos, and mix experiments.
                    </p>
                </div>
                <div className="big-button-container" style={styles.statCard}>
                    <p style={styles.statLabel}>Playlist</p>
                    <h2>{TRACKS.length}</h2>
                    <p style={styles.statCopy}>One player active at a time.</p>
                </div>
            </div>

            <div style={styles.studioShell}>
                <div style={styles.playlist}>
                    {TRACKS.map((track) => (
                        <button
                            key={track.id}
                            type="button"
                            onClick={() => setSelectedTrackId(track.id)}
                            style={Object.assign(
                                {},
                                styles.trackButton,
                                track.id === selectedTrack.id &&
                                    styles.activeTrackButton
                            )}
                        >
                            <p style={styles.trackTitle}>{track.title}</p>
                            <p style={styles.trackMeta}>{track.style}</p>
                        </button>
                    ))}
                </div>

                <div className="big-button-container" style={styles.trackPanel}>
                    <div style={styles.trackHeader}>
                        <div style={styles.trackHeaderText}>
                            <p className="showcase-header" style={styles.kicker}>
                                NOW LOADED
                            </p>
                            <h2>{selectedTrack.title}</h2>
                            <p>{selectedTrack.subtitle}</p>
                        </div>
                        <span style={styles.styleBadge}>
                            {selectedTrack.style}
                        </span>
                    </div>

                    <MusicPlayer
                        src={selectedTrack.src}
                        title={selectedTrack.title}
                        subtitle={selectedTrack.subtitle}
                        currentSong={currentSong}
                        setCurrentSong={setCurrentSong}
                    />

                    <div style={styles.notePanel}>
                        <h4>Track Note</h4>
                        <p>{selectedTrack.note}</p>
                    </div>

                    {selectedTrack.image && (
                        <div style={styles.imagePanel}>
                            <img
                                src={selectedTrack.image}
                                alt={`Production screenshot for ${selectedTrack.title}`}
                                style={styles.projectImage}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    embeddedPage: {
        marginLeft: 0,
        padding: 24,
    },
    header: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 16,
        marginBottom: 18,
        flexWrap: 'wrap',
    },
    headerText: {
        flexDirection: 'column',
        gap: 8,
        flex: 1,
        minWidth: 280,
    },
    intro: {
        maxWidth: 720,
    },
    statCard: {
        width: 180,
        flexDirection: 'column',
        gap: 4,
    },
    statLabel: {
        fontFamily: 'MSSerif',
        fontSize: 12,
        textTransform: 'uppercase',
        color: '#404040',
        letterSpacing: 1,
    },
    statCopy: {
        fontFamily: 'MSSerif',
        fontSize: 13,
    },
    studioShell: {
        gap: 14,
        alignItems: 'stretch',
        width: '100%',
    },
    playlist: {
        width: 240,
        flexShrink: 0,
        flexDirection: 'column',
        gap: 10,
    },
    trackButton: {
        border: '1px solid #000',
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        borderRightColor: '#808080',
        borderBottomColor: '#808080',
        backgroundColor: '#c0c0c0',
        flexDirection: 'column',
        textAlign: 'left',
        padding: 12,
        cursor: 'pointer',
    },
    activeTrackButton: {
        backgroundColor: '#fbffc4',
    },
    trackTitle: {
        fontFamily: 'MillenniumBold',
        fontSize: 15,
    },
    trackMeta: {
        fontFamily: 'MSSerif',
        fontSize: 12,
        marginTop: 4,
    },
    trackPanel: {
        flex: 1,
        minWidth: 0,
        flexDirection: 'column',
        gap: 16,
    },
    trackHeader: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 12,
        flexWrap: 'wrap',
    },
    trackHeaderText: {
        flexDirection: 'column',
        gap: 4,
    },
    kicker: {
        color: '#000',
    },
    styleBadge: {
        border: '1px solid #000',
        backgroundColor: '#fff',
        padding: '4px 8px',
        fontFamily: 'MSSerif',
        fontSize: 12,
    },
    notePanel: {
        flexDirection: 'column',
        gap: 6,
        border: '1px solid #808080',
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        backgroundColor: '#efefef',
        padding: 12,
    },
    imagePanel: {
        width: '100%',
        maxHeight: 360,
        overflow: 'hidden',
        border: '1px solid #000',
        backgroundColor: '#000',
    },
    projectImage: {
        width: '100%',
        height: 'auto',
    },
};

export default MusicProjects;

