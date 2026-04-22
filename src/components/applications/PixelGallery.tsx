import React from 'react';
import Window from '../os/Window';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';
import ArtProjects from '../showcase/projects/Art';

export interface PixelGalleryProps extends WindowAppProps {}

const PixelGallery: React.FC<PixelGalleryProps> = (props) => {
    const { initWidth, initHeight } = useInitialWindowSize({ margin: 96 });

    return (
        <Window
            top={44}
            left={92}
            width={initWidth}
            height={initHeight}
            windowTitle="Pixel Gallery"
            windowBarIcon="showcaseIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText="Pixel art, animation, and process links"
        >
            <ArtProjects embedded />
        </Window>
    );
};

export default PixelGallery;

