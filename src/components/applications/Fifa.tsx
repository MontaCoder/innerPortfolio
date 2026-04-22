import React from 'react';
import DosGameWindow from '../dos/DosGameWindow';

export interface fifaAppProps extends WindowAppProps {}

const Fifa: React.FC<fifaAppProps> = (props) => {
    return (
        <DosGameWindow
            {...props}
            appKey="fifa"
            title="Fifa"
            icon="fifa"
            windowBarColor="#1C1C1C"
            bundleUrl="fifa.jsdos"
            instructions={[
                'Load the sports archive only when you press Play.',
                'Keyboard focus moves into the emulator after boot.',
                'A second game boot unlocks the archive trail.',
            ]}
        />
    );
};

export default Fifa;
