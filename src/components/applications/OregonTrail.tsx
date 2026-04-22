import React from 'react';
import DosGameWindow from '../dos/DosGameWindow';

export interface OregonTrailAppProps extends WindowAppProps {}

const OregonTrailApp: React.FC<OregonTrailAppProps> = (props) => {
    return (
        <DosGameWindow
            {...props}
            appKey="trail"
            title="The Oregon Trail"
            icon="trailIcon"
            windowBarColor="#240C00"
            bundleUrl="trail.jsdos"
            initialWidth={920}
            initialHeight={750}
            instructions={[
                'This archive unlocks after you boot two games.',
                'Press Play to load the trail bundle.',
                'Pack patience; DOS games take a moment to settle.',
            ]}
        />
    );
};

export default OregonTrailApp;
