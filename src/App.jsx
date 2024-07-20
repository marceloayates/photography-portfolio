import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import GalleryPage from './components/GalleryPage';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';
import Menu from './components/Menu';
import photoData from './photoData.jsx';
import styles from './styles/App.module.css';
import GlobalStyles from './styles/GlobalStyles';

function App() {
    const abstractPhotos = photoData.filter(photo => photo.category === 'abstract');
    const landscapePhotos = photoData.filter(photo => photo.category === 'landscape');
    const monochromePhotos = photoData.filter(photo => photo.category === 'monochrome');
    const peoplePhotos = photoData.filter(photo => photo.category === 'people');
    const portraitPhotos = photoData.filter(photo => photo.category === 'portrait');
    const studioPhotos = photoData.filter(photo => photo.category ==='studio');
    const specialProjectPhotos = photoData.filter(photo => photo.category ==='special_project');

    return (
        <Router>
            <GlobalStyles />
            <div className={styles.app}>
            <Link to="/" className={`${styles.title} ${styles.mobileTitle}`}>
                    Marcelo Yates
                </Link>
                <div className={styles.contentContainer}>
                    <Menu />
                    <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/special_projects" element={
                        <div className={styles.contentContainer}>
                            <GalleryPage title="Special Projects" photos={specialProjectPhotos} />
                        </div>} />
                    <Route path="/abstract" element={
                        <div className={styles.contentContainer}>
                            <GalleryPage title="Abstract Photography" photos={abstractPhotos} />
                        </div>} />
                    <Route path="/landscape" element={
                        <div className={styles.contentContainer}>
                            <GalleryPage title="Landscape Photography" photos={landscapePhotos} />
                        </div>} />
                    <Route path="/monochrome" element={
                        <div className={styles.contentContainer}>
                            <GalleryPage title="Monochrome Photography" photos={monochromePhotos} />
                        </div>} />
                    <Route path="/people" element={
                        <div className={styles.contentContainer}>
                            <GalleryPage title="People Photography" photos={peoplePhotos} />
                        </div>} />
                    <Route path="/portraits" element={
                        <div className={styles.contentContainer}>
                            <GalleryPage title="Portrait Photography" photos={portraitPhotos} />
                        </div>} />
                    <Route path="/studio" element={
                        <div className={styles.contentContainer}>
                            <GalleryPage title="Studio Photography" photos={studioPhotos} />
                        </div>} />
                    <Route path="/contact" element={
                        <div className={styles.contentContainer}>
                            <ContactPage />
                        </div>} />
                    <Route path="/about" element={
                        <div className={styles.contentContainer}>
                            <AboutPage />
                        </div>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
