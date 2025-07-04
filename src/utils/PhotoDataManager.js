import photoDataArray from '../photoData.jsx';

const STORAGE_KEY = 'photography-portfolio-photos';
const HOMEPAGE_IMAGE_KEY = 'photography-portfolio-homepage-image';

class PhotoDataManager {
  constructor() {
    this.initializeStorage();
  }

  // Initialize localStorage with existing photos if not already present
  initializeStorage() {
    const existingData = localStorage.getItem(STORAGE_KEY);
    if (!existingData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(photoDataArray));
    }
  }

  // Get all photos
  getAllPhotos() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : photoDataArray;
  }

  // Get photos by category
  getPhotosByCategory(category) {
    const allPhotos = this.getAllPhotos();
    return allPhotos.filter(photo => photo.category === category);
  }

  // Add a new photo
  addPhoto(photoData) {
    const allPhotos = this.getAllPhotos();
    
    // Generate unique ID for the category
    const categoryPhotos = allPhotos.filter(p => p.category === photoData.category);
    const maxId = categoryPhotos.length > 0 ? Math.max(...categoryPhotos.map(p => p.id || 0)) : 0;
    
    const newPhoto = {
      id: maxId + 1,
      category: photoData.category,
      url: photoData.url,
      subtitle: photoData.subtitle || ''
    };

    allPhotos.push(newPhoto);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allPhotos));
    
    return newPhoto;
  }

  // Delete a photo
  deletePhoto(id, category) {
    const allPhotos = this.getAllPhotos();
    const filteredPhotos = allPhotos.filter(photo => !(photo.id === id && photo.category === category));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPhotos));
    return filteredPhotos;
  }

  // Update a photo
  updatePhoto(id, category, updatedData) {
    const allPhotos = this.getAllPhotos();
    const photoIndex = allPhotos.findIndex(photo => photo.id === id && photo.category === category);
    
    if (photoIndex !== -1) {
      allPhotos[photoIndex] = { ...allPhotos[photoIndex], ...updatedData };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allPhotos));
      return allPhotos[photoIndex];
    }
    
    return null;
  }

  // Reset to original data (useful for testing)
  resetToOriginal() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(photoDataArray));
    return photoDataArray;
  }

  // Export current data (for backup)
  exportData() {
    return this.getAllPhotos();
  }

  // Import data (for restore)
  importData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  }

  // Homepage image management
  getHomepageImage() {
    const defaultImage = "https://res.cloudinary.com/dajuvlxyu/image/upload/v1745715123/IMG_4187_gdcftn.jpg";
    const stored = localStorage.getItem(HOMEPAGE_IMAGE_KEY);
    return stored || defaultImage;
  }

  setHomepageImage(imageUrl) {
    localStorage.setItem(HOMEPAGE_IMAGE_KEY, imageUrl);
    return imageUrl;
  }
}

// Create singleton instance
const photoDataManager = new PhotoDataManager();

export default photoDataManager;
