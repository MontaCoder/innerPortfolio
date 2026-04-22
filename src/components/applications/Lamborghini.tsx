import React from 'react';
import DosGameWindow from '../dos/DosGameWindow';

export interface lamborghiniAppProps extends WindowAppProps {}

const Lamborghini: React.FC<lamborghiniAppProps> = (props) => {
    return (
        <DosGameWindow
            {...props}
            appKey="lamborghini"
            title="Lamborghini"
            icon="lamborghini"
            windowBarColor="#1C1C1C"
            bundleUrl="lamborg.jsdos"
            instructions={[
                'Start the racing bundle from this preflight screen.',
                'Use keyboard controls after the emulator is focused.',
                'Game boots are remembered during this visit.',
            ]}
        />
    );
};

export default Lamborghini;
