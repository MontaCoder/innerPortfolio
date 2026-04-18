import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useCallback } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';

export interface LinkProps {
    text: string;
    to: string;
    containerStyle?: React.CSSProperties;
    outsideTo?: string;
}

const Link: React.FC<LinkProps> = (props) => {
    const navigate = useNavigate();

    // get current location of react router
    const location = useLocation();
    const [isHere, setIsHere] = useState(false);

    // if current path is the same as the link path
    useEffect(() => {
        if (location.pathname === `/${props.to}`) {
            setIsHere(true);
        } else {
            setIsHere(false);
        }
    }, [location, props.to]);

    const [active, setActive] = useState(false);
    const navigateTimerRef = useRef<number | null>(null);
    const activeTimerRef = useRef<number | null>(null);

    const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setActive(true);

        if (navigateTimerRef.current !== null) {
            window.clearTimeout(navigateTimerRef.current);
            navigateTimerRef.current = null;
        }
        if (activeTimerRef.current !== null) {
            window.clearTimeout(activeTimerRef.current);
            activeTimerRef.current = null;
        }

        if (location.pathname !== `/${props.to}`) {
            navigateTimerRef.current = window.setTimeout(() => {
                navigate(`/${props.to}`);
                navigateTimerRef.current = null;
            }, 100);
        }

        activeTimerRef.current = window.setTimeout(() => {
            setActive(false);
            activeTimerRef.current = null;
        }, 100);
    }, [location.pathname, navigate, props.to]);

    useEffect(() => {
        return () => {
            if (navigateTimerRef.current !== null) {
                window.clearTimeout(navigateTimerRef.current);
            }
            if (activeTimerRef.current !== null) {
                window.clearTimeout(activeTimerRef.current);
            }
        };
    }, []);

    return (
        <RouterLink
            to={`/${props.to}`}
            onClick={handleClick}
            style={Object.assign({}, { display: 'flex' }, props.containerStyle)}
        >
            {isHere && <div style={styles.hereIndicator} />}
            <h4
                className="router-link"
                style={Object.assign(
                    {},
                    styles.link,
                    active && { color: 'red' }
                )}
            >
                {props.text}
            </h4>
        </RouterLink>
    );
};

const styles: StyleSheetCSS = {
    link: {
        cursor: 'pointer',
        fontWeight: 'bolder',
        textDecoration: 'underline',
    },
    hereIndicator: {
        width: 4,
        height: 4,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: 'rgb(85, 26, 139)',
        alignSelf: 'center',
        borderRadius: '50%',
        marginRight: 6,
        textDecoration: 'none',
    },
};

export default Link;
