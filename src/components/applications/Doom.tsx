import React from 'react';
import DosGameWindow from '../dos/DosGameWindow';

export interface DoomAppProps extends WindowAppProps {}

const DoomApp: React.FC<DoomAppProps> = (props) => {
    return (
        <DosGameWindow
            {...props}
            appKey="doom"
            title="Doom"
            icon="doomIcon"
            windowBarColor="#1C1C1C"
            bundleUrl="doom.jsdos"
            instructions={[
                'Click Play to load the DOS bundle.',
                'Use the keyboard once the emulator has focus.',
                'Opening a game unlocks more hidden MontaOS experiments.',
            ]}
        />
    );
};

export default DoomApp;
