import React from 'react';
import DosGameWindow from '../dos/DosGameWindow';

export interface kingsBeachAppProps extends WindowAppProps {}

const KingsBeach: React.FC<kingsBeachAppProps> = (props) => {
    return (
        <DosGameWindow
            {...props}
            appKey="kingsBeach"
            title="Kings Beach"
            icon="kingsBeach"
            windowBarColor="#1C1C1C"
            bundleUrl="kingsBeach.jsdos"
            instructions={[
                'A small postcard from the DOS shelf.',
                'Press Play only when you are ready to load the emulator.',
                'Try another game afterward to unlock the deeper archive.',
            ]}
        />
    );
};

export default KingsBeach;
