import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import GalleryPage from './components/GalleryPage';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';
import Menu from './components/Menu';
import { AuthProvider } from './contexts/AuthContext';
import photoDataManager from './utils/PhotoDataManager';
import styles from './styles/App.module.css';
import GlobalStyles from './styles/GlobalStyles';

const AppContent = () => {
    const location = useLocation();
    const [photoData, setPhotoData] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);

    // Load photo data on component mount and when refreshKey changes
    useEffect(() => {
        const loadPhotoData = () => {
            const allPhotos = photoDataManager.getAllPhotos();
            setPhotoData(allPhotos);
        };

        loadPhotoData();

        // Listen for storage changes (when photos are added/removed)
        const handleStorageChange = (e) => {
            if (e.key === 'photography-portfolio-photos') {
                loadPhotoData();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [refreshKey]);

    // Helper function to refresh data (can be called from admin page)
    const refreshPhotoData = () => {
        setRefreshKey(prev => prev + 1);
    };

    const abstractPhotos = photoData.filter(photo => photo.category === 'abstract');
    const landscapePhotos = photoData.filter(photo => photo.category === 'landscape');
    const monochromePhotos = photoData.filter(photo => photo.category === 'monochrome');
    const peoplePhotos = photoData.filter(photo => photo.category === 'people');
    const portraitPhotos = photoData.filter(photo => photo.category === 'portrait');
    const studioPhotos = photoData.filter(photo => photo.category ==='studio');
    const specialProjectPhotos = photoData.filter(photo => photo.category ==='special_project');

    // If on admin route only, render clean admin layout
    if (location.pathname === '/admin') {
        return (
            <Routes>
                <Route path="/admin" element={
                    <ProtectedRoute>
                        <AdminPage onPhotoAdded={refreshPhotoData} />
                    </ProtectedRoute>
                } />
            </Routes>
        );
    }

    // Otherwise render the main app layout
    return (
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
                    <Route path="/login" element={<LoginPage />} />
                    </Routes>
                </div>
            </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <GlobalStyles />
                <AppContent />
            </Router>
        </AuthProvider>
    );
}

export default App;
