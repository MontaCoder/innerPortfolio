import React from 'react';
import Window from '../os/Window';

export interface CreditsProps extends WindowAppProps {}

const Credits: React.FC<CreditsProps> = (props) => {
    return (
        <Window
            top={72}
            left={96}
            width={760}
            height={520}
            windowTitle="Credits"
            windowBarIcon="windowExplorerIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'© Copyright 2026 Montassar Hajri'}
        >
            <div className="site-page" style={styles.page}>
                <div style={styles.creditCardOuter}>
                    <div style={styles.creditCardInner}>
                        <h2>Credits</h2>
                        <br />
                        <p>This portfolio was designed and engineered by</p>
                        <h1 style={styles.name}>Montassar Hajri</h1>
                        <p>
                            Creative direction, frontend engineering, UI design,
                            and content by Montassar Hajri.
                        </p>
                        <br />
                        <p>Thank you for visiting.</p>
                    </div>
                </div>
            </div>
        </Window>
    );
};

const styles: StyleSheetCSS = {
    page: {
        width: '100%',
        backgroundColor: '#008081',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    creditCardOuter: {
        width: '100%',
        maxWidth: 620,
        border: '1px solid #000',
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        backgroundColor: '#c0c0c0',
    },
    creditCardInner: {
        border: '1px solid #808080',
        borderTopColor: '#dfdfdf',
        borderLeftColor: '#dfdfdf',
        padding: 24,
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    name: {
        marginTop: 8,
        marginBottom: 8,
        fontSize: 56,
        lineHeight: 0.95,
    },
};

export default Credits;
