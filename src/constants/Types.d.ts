declare interface StyleSheetCSS {
    [key: string]: React.CSSProperties;
}

declare interface WindowAppProps {
    onClose: () => void;
    onInteract: () => void;
    onMinimize: () => void;
    onLaunchApplication?: (key: string) => void;
}

declare type DesktopWindows = {
    [key in string]: {
        zIndex: number;
        component: React.ReactElement<any>;
        minimized: boolean;
        name: string;
        icon: IconName;
    };
};
