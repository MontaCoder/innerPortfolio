import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Window from '../os/Window';
import VerticalNavbar from '../showcase/VerticalNavbar';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';

const Home = lazy(() => import('../showcase/Home'));
const About = lazy(() => import('../showcase/About'));
const Experience = lazy(() => import('../showcase/Experience'));
const Projects = lazy(() => import('../showcase/Projects'));
const Contact = lazy(() => import('../showcase/Contact'));
const SoftwareProjects = lazy(() => import('../showcase/projects/Software'));
const MusicProjects = lazy(() => import('../showcase/projects/Music'));
const ArtProjects = lazy(() => import('../showcase/projects/Art'));

export interface ShowcaseExplorerProps extends WindowAppProps {}

const ShowcaseExplorer: React.FC<ShowcaseExplorerProps> = (props) => {
    const { initWidth, initHeight } = useInitialWindowSize({ margin: 100 });

    return (
        <Window
            top={24}
            left={56}
            width={initWidth}
            height={initHeight}
            windowTitle="Montassar Hajri - Showcase 2024"
            windowBarIcon="windowExplorerIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'© Copyright 2024 Montassar Hajri'}
        >
            <Router>
                <div className="site-page">
                    <VerticalNavbar />
                    <Suspense fallback={<div className="site-page-content">Loading...</div>}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/experience" element={<Experience />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route
                                path="/projects/software"
                                element={<SoftwareProjects />}
                            />
                            <Route
                                path="/projects/music"
                                element={<MusicProjects />}
                            />
                            <Route path="/projects/art" element={<ArtProjects />} />
                        </Routes>
                    </Suspense>
                </div>
            </Router>
        </Window>
    );
};

export default ShowcaseExplorer;
