import React from 'react';
import Window from '../os/Window';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';
import Contact from '../showcase/Contact';

export interface GuestbookProps extends WindowAppProps {}

const Guestbook: React.FC<GuestbookProps> = (props) => {
    const { initWidth, initHeight } = useInitialWindowSize({ margin: 96 });

    return (
        <Window
            top={40}
            left={88}
            width={initWidth}
            height={initHeight}
            windowTitle="Guestbook.exe"
            windowBarIcon="windowExplorerIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText="Contact, visitor card, and session receipt"
        >
            <Contact embedded />
        </Window>
    );
};

export default Guestbook;

