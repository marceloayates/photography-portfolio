import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import GalleryPage from './components/GalleryPage';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';
import Menu from './components/Menu';
import photoData from './assets/photoData.jsx';
import styles from './styles/App.module.css';
import GlobalStyles from './GlobalStyles';

function App() {
    const landscapePhotos = photoData.filter(photo => photo.category === 'landscape');
    const portraitPhotos = photoData.filter(photo => photo.category === 'portrait');

    return (
        <Router>
            <GlobalStyles />
            <div className={styles.app}>
                <Link to="/">
                <h1 className={styles.title}>Marcelo Yates</h1>
                </Link>
                <div className={styles.contentContainer}>
                    <Menu />
                    <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/landscape" element={
                        <div className={styles.contentContainer}>
                            <GalleryPage title="Landscape Photography" photos={landscapePhotos} />
                        </div>} />
                    <Route path="/portraits" element={
                        <div className={styles.contentContainer}>
                            <GalleryPage title="Portrait Photography" photos={portraitPhotos} />
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
