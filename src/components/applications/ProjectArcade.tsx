import React from 'react';
import Window from '../os/Window';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';
import SoftwareProjects from '../showcase/projects/Software';

export interface ProjectArcadeProps extends WindowAppProps {}

const ProjectArcade: React.FC<ProjectArcadeProps> = (props) => {
    const { initWidth, initHeight } = useInitialWindowSize({ margin: 96 });

    return (
        <Window
            top={28}
            left={72}
            width={initWidth}
            height={initHeight}
            windowTitle="Project Arcade"
            windowBarIcon="showcaseIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText="Curated case studies and live repos"
        >
            <SoftwareProjects embedded />
        </Window>
    );
};

export default ProjectArcade;
