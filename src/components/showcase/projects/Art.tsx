import React, { useMemo, useState } from 'react';
import girlRun from '../../../assets/pictures/projects/art/girl-run.gif';
import gsts from '../../../assets/pictures/projects/art/gsts.png';
import fx from '../../../assets/pictures/projects/art/fx.gif';
import grunt from '../../../assets/pictures/projects/art/grunt.gif';

export interface ArtProjectsProps {
    embedded?: boolean;
}

interface GalleryItem {
    id: string;
    title: string;
    type: string;
    src: string;
    alt: string;
    caption: string;
    links?: Array<{ label: string; href: string }>;
}

const GALLERY_ITEMS: GalleryItem[] = [
    {
        id: 'girl-run',
        title: 'Eight Frame Run Cycle',
        type: 'Animation',
        src: girlRun,
        alt: 'Pixel-art run cycle animation',
        caption:
            'A timing and silhouette study from early pixel-art practice. Original sprite by kevink.',
        links: [
            {
                label: 'Process video',
                href: 'https://www.youtube.com/watch?v=pDtUX3ZVHJ0',
            },
        ],
    },
    {
        id: 'gsts',
        title: 'Guntattchment Saga Lineup',
        type: 'Game art',
        src: gsts,
        alt: 'Pixel-art enemy lineup',
        caption:
            'Enemy lineup work from a game project called Guntattchment Saga.',
    },
    {
        id: 'fx',
        title: 'FX Timing Study',
        type: 'Effects',
        src: fx,
        alt: 'Pixel-art effects animation',
        caption:
            'A small animation study focused on punchy timing and readable shapes.',
        links: [
            {
                label: 'Process video',
                href: 'https://www.youtube.com/watch?v=xXEDKQ3wSfM',
            },
        ],
    },
    {
        id: 'grunt',
        title: 'Creature Animation',
        type: 'Character',
        src: grunt,
        alt: 'Pixel-art creature animation',
        caption:
            'Creature movement practice for making tiny sprites feel heavier and more alive.',
        links: [
            {
                label: 'Process video',
                href: 'https://www.youtube.com/watch?v=leZzb-Y0SKQ',
            },
        ],
    },
];

const ArtProjects: React.FC<ArtProjectsProps> = ({ embedded }) => {
    const [selectedItemId, setSelectedItemId] = useState(GALLERY_ITEMS[0].id);

    const selectedItem = useMemo(
        () =>
            GALLERY_ITEMS.find((item) => item.id === selectedItemId) ??
            GALLERY_ITEMS[0],
        [selectedItemId]
    );

    return (
        <div
            className="site-page-content"
            style={embedded ? styles.embeddedPage : undefined}
        >
            <div style={styles.header}>
                <div style={styles.headerText}>
                    <h1>Pixel Gallery</h1>
                    <h3>Art, animation, and process clips</h3>
                    <p style={styles.intro}>
                        A compact gallery for the creative side of the desktop:
                        animation studies, game sprites, and process links.
                    </p>
                </div>
                <div className="big-button-container" style={styles.statCard}>
                    <p style={styles.statLabel}>Gallery items</p>
                    <h2>{GALLERY_ITEMS.length}</h2>
                    <p style={styles.statCopy}>GIFs and stills from the archive.</p>
                </div>
            </div>

            <div style={styles.galleryShell}>
                <div className="big-button-container" style={styles.viewer}>
                    <div style={styles.imageFrame}>
                        <img
                            src={selectedItem.src}
                            alt={selectedItem.alt}
                            style={styles.image}
                        />
                    </div>
                    <div style={styles.viewerCopy}>
                        <p className="showcase-header" style={styles.kicker}>
                            {selectedItem.type}
                        </p>
                        <h2>{selectedItem.title}</h2>
                        <p>{selectedItem.caption}</p>
                        <div style={styles.links}>
                            {selectedItem.links?.map((link) => (
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

                <div style={styles.thumbnailRail}>
                    {GALLERY_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => setSelectedItemId(item.id)}
                            style={Object.assign(
                                {},
                                styles.thumbnailButton,
                                item.id === selectedItem.id &&
                                    styles.activeThumbnail
                            )}
                        >
                            <img
                                src={item.src}
                                alt=""
                                style={styles.thumbnailImage}
                            />
                            <div style={styles.thumbnailText}>
                                <p style={styles.thumbnailTitle}>{item.title}</p>
                                <p style={styles.thumbnailType}>{item.type}</p>
                            </div>
                        </button>
                    ))}
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
        width: 220,
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
    galleryShell: {
        gap: 14,
        alignItems: 'stretch',
        width: '100%',
    },
    viewer: {
        flex: 1,
        minWidth: 0,
        flexDirection: 'column',
        gap: 16,
    },
    imageFrame: {
        minHeight: 320,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111',
        border: '1px solid #000',
        padding: 12,
    },
    image: {
        maxWidth: '100%',
        maxHeight: 420,
        imageRendering: 'pixelated',
        objectFit: 'contain',
    },
    viewerCopy: {
        flexDirection: 'column',
        gap: 8,
    },
    kicker: {
        color: '#000',
    },
    links: {
        gap: 16,
        flexWrap: 'wrap',
    },
    thumbnailRail: {
        width: 280,
        flexDirection: 'column',
        gap: 10,
        flexShrink: 0,
    },
    thumbnailButton: {
        width: '100%',
        border: '1px solid #000',
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        borderRightColor: '#808080',
        borderBottomColor: '#808080',
        backgroundColor: '#c0c0c0',
        textAlign: 'left',
        padding: 10,
        gap: 10,
        cursor: 'pointer',
        alignItems: 'center',
    },
    activeThumbnail: {
        backgroundColor: '#fbffc4',
    },
    thumbnailImage: {
        width: 54,
        height: 54,
        objectFit: 'contain',
        backgroundColor: '#111',
        imageRendering: 'pixelated',
        flexShrink: 0,
    },
    thumbnailText: {
        flexDirection: 'column',
        minWidth: 0,
    },
    thumbnailTitle: {
        fontFamily: 'MillenniumBold',
        fontSize: 14,
    },
    thumbnailType: {
        fontFamily: 'MSSerif',
        fontSize: 12,
        marginTop: 3,
    },
};

export default ArtProjects;

