import React from 'react';
import DosGameWindow from '../dos/DosGameWindow';

export interface monopolyAppProps extends WindowAppProps {}

const Monopoly: React.FC<monopolyAppProps> = (props) => {
    return (
        <DosGameWindow
            {...props}
            appKey="monopoly"
            title="Monopoly"
            icon="monopoly"
            windowBarColor="#1C1C1C"
            bundleUrl="monopoly.jsdos"
            instructions={[
                'Boot the board-game archive when ready.',
                'Use the emulator controls if the game captures your cursor.',
                'Game boots count toward hidden app unlocks.',
            ]}
        />
    );
};

export default Monopoly;
