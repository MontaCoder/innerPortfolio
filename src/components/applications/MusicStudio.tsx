import React from 'react';
import Window from '../os/Window';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';
import MusicProjects from '../showcase/projects/Music';

export interface MusicStudioProps extends WindowAppProps {}

const MusicStudio: React.FC<MusicStudioProps> = (props) => {
    const { initWidth, initHeight } = useInitialWindowSize({ margin: 96 });

    return (
        <Window
            top={36}
            left={84}
            width={initWidth}
            height={initHeight}
            windowTitle="Music Studio"
            windowBarIcon="cd"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText="Local audio sketches and production notes"
        >
            <MusicProjects embedded />
        </Window>
    );
};

export default MusicStudio;

