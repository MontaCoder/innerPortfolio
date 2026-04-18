import React, { useEffect, useRef, useState } from 'react';

import { DosPlayer as Instance, DosPlayerFactoryType } from 'js-dos';

declare const Dos: DosPlayerFactoryType;

interface PlayerProps {
    width: number;
    height: number;
    bundleUrl: string;
}

const resolveBundleUrl = (bundleUrl: string) => {
    const baseUrl = new URL(import.meta.env.BASE_URL, window.location.origin);
    return new URL(bundleUrl, baseUrl).toString();
};

export default function DosPlayer(props: PlayerProps) {
    const rootRef = useRef<HTMLDivElement>(null);

    const [dos, setDos] = useState<Instance | null>(null);

    useEffect(() => {
        if (rootRef === null || rootRef.current === null) {
            return;
        }

        const root = rootRef.current as HTMLDivElement;
        const instance = Dos(root, { style: 'none' });

        setDos(instance);

        return () => {
            instance.stop();
        };
    }, [rootRef]);

    useEffect(() => {
        if (dos !== null) {
            void dos.run(resolveBundleUrl(props.bundleUrl));
        }
    }, [dos, props.bundleUrl]);
    return (
        <div
            ref={rootRef}
            style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            }}
        ></div>
    );
}
