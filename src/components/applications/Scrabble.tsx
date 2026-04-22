import React from 'react';
import DosGameWindow from '../dos/DosGameWindow';

export interface ScrabbleAppProps extends WindowAppProps {}

const ScrabbleApp: React.FC<ScrabbleAppProps> = (props) => {
    return (
        <DosGameWindow
            {...props}
            appKey="scrabble"
            title="Scrabble"
            icon="scrabbleIcon"
            windowBarColor="#941d13"
            bundleUrl="scrabble.jsdos"
            initialWidth={920}
            initialHeight={750}
            instructions={[
                'Boot the word game from the archive.',
                'Use keyboard input after the DOS screen is active.',
                'The first game boot unlocks Henordle.',
            ]}
        />
    );
};

export default ScrabbleApp;
