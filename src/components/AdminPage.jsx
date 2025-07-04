import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import photoDataManager from '../utils/PhotoDataManager';
import styles from '../styles/AdminPage.module.css';

const AdminPage = ({ onPhotoAdded }) => {
  const { logout } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [photoData, setPhotoData] = useState({
    title: '',
    category: 'abstract',
    description: ''
  });
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('abstract');
  const [currentHomepageImage, setCurrentHomepageImage] = useState('');
  const [homepageFile, setHomepageFile] = useState(null);
  const [homepageUploadStatus, setHomepageUploadStatus] = useState('');
  const [allPhotos, setAllPhotos] = useState([]);
  const [showExistingPhotos, setShowExistingPhotos] = useState(false);

  const categories = [
    'abstract',
    'landscape', 
    'monochrome',
    'people',
    'portrait',
    'studio',
    'special_project'
  ];

  // Load existing photos when component mounts or category changes
  useEffect(() => {
    const loadPhotos = () => {
      const photos = photoDataManager.getPhotosByCategory(selectedCategory);
      setExistingPhotos(photos);
    };
    loadPhotos();
  }, [selectedCategory]);

  // Load current homepage image and all photos on component mount
  useEffect(() => {
    const loadHomepageImage = () => {
      const imageUrl = photoDataManager.getHomepageImage();
      setCurrentHomepageImage(imageUrl);
    };
    
    const loadAllPhotos = () => {
      const photos = photoDataManager.getAllPhotos();
      setAllPhotos(photos);
    };
    
    loadHomepageImage();
    loadAllPhotos();
  }, []);

  const loadExistingPhotos = () => {
    const photos = photoDataManager.getPhotosByCategory(selectedCategory);
    setExistingPhotos(photos);
  };

  const handleDeletePhoto = (photoId, photoCategory) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      photoDataManager.deletePhoto(photoId, photoCategory);
      
      // Refresh existing photos display
      loadExistingPhotos();
      
      // Notify parent component to refresh
      if (onPhotoAdded) {
        onPhotoAdded();
      }
    }
  };

  const handleHomepageFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setHomepageFile(file);
    } else {
      alert('Please select a valid image file');
    }
  };

  const handleHomepageUpload = async () => {
    if (!homepageFile) {
      alert('Please select a file');
      return;
    }

    setHomepageUploadStatus('Uploading...');

    try {
      const formData = new FormData();
      formData.append('file', homepageFile);
      formData.append('upload_preset', 'photography-portfolio');
      formData.append('folder', 'photography-portfolio');

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dajuvlxyu/image/upload',
        {
          method: 'POST',
          body: formData
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Update homepage image
        photoDataManager.setHomepageImage(data.secure_url);
        setCurrentHomepageImage(data.secure_url);

        setHomepageUploadStatus({ 
          success: true, 
          message: 'Homepage image updated successfully!'
        });
        
        // Reset form
        setHomepageFile(null);
        document.getElementById('homepageFileInput').value = '';
      } else {
        setHomepageUploadStatus({ 
          success: false, 
          message: `Upload failed: ${data.error?.message || 'Unknown error'}` 
        });
      }
    } catch (error) {
      setHomepageUploadStatus({ 
        success: false, 
        message: `Upload failed: ${error.message}` 
      });
    }
  };

  const handleSetAsHomepage = (photoUrl) => {
    photoDataManager.setHomepageImage(photoUrl);
    setCurrentHomepageImage(photoUrl);
    
    setHomepageUploadStatus({ 
      success: true, 
      message: 'Homepage image updated successfully!'
    });
    
    // Hide the existing photos section after selection
    setShowExistingPhotos(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      if (!photoData.title) {
        setPhotoData(prev => ({ ...prev, title: file.name.split('.')[0] }));
      }
    } else {
      alert('Please select a valid image file');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPhotoData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    if (!photoData.title) {
      alert('Please enter a title');
      return;
    }

    setUploadStatus('Uploading...');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'photography-portfolio'); // Replace with your actual preset name
      formData.append('folder', 'photography-portfolio');

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dajuvlxyu/image/upload',
        {
          method: 'POST',
          body: formData
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Add photo directly to storage
        const newPhotoEntry = photoDataManager.addPhoto({
          category: photoData.category,
          url: data.secure_url,
          subtitle: photoData.description || ''
        });

        setUploadStatus({ 
          success: true, 
          message: 'Upload successful! Photo has been added to the gallery.',
          photoInfo: `Added: ${newPhotoEntry.id} - ${newPhotoEntry.category}`
        });
        
        // Notify parent component to refresh
        if (onPhotoAdded) {
          onPhotoAdded();
        }
        
        // Refresh existing photos display
        loadExistingPhotos();
        
        // Reset form
        setSelectedFile(null);
        setPhotoData({ title: '', category: 'abstract', description: '' });
        document.getElementById('fileInput').value = '';
      } else {
        setUploadStatus({ 
          success: false, 
          message: `Upload failed: ${data.error?.message || 'Unknown error'}` 
        });
      }
    } catch (error) {
      setUploadStatus({ 
        success: false, 
        message: `Upload failed: ${error.message}` 
      });
    }
  };

  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminHeader}>
        <h1>Admin Panel</h1>
        <button onClick={logout} className={styles.logoutButton}>
          Logout
        </button>
      </div>

      <div className={styles.homepageSection}>
        <h2>Update Homepage Image</h2>
        
        <div className={styles.currentHomepage}>
          <h3>Current Homepage Image:</h3>
          <img src={currentHomepageImage} alt="Current Homepage" className={styles.currentHomepageImage} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="homepageFileInput">Select New Homepage Image:</label>
          <input
            id="homepageFileInput"
            type="file"
            accept="image/*"
            onChange={handleHomepageFileChange}
            className={styles.fileInput}
          />
        </div>

        <button onClick={handleHomepageUpload} className={styles.uploadButton}>
          Update Homepage Image
        </button>

        <div className={styles.orDivider}>
          <span>OR</span>
        </div>

        <button 
          onClick={() => setShowExistingPhotos(!showExistingPhotos)}
          className={styles.toggleButton}
        >
          {showExistingPhotos ? 'Hide Existing Photos' : 'Choose from Existing Photos'}
        </button>

        {showExistingPhotos && (
          <div className={styles.existingPhotosSection}>
            <h3>Select a photo to set as homepage:</h3>
            <div className={styles.existingPhotosGrid}>
              {allPhotos.length === 0 ? (
                <p>No photos uploaded yet.</p>
              ) : (
                allPhotos.map(photo => (
                  <div key={`${photo.category}-${photo.id}`} className={styles.existingPhotoCard}>
                    <img src={photo.url} alt={photo.subtitle || 'Photo'} className={styles.existingPhotoThumbnail} />
                    <div className={styles.existingPhotoInfo}>
                      <p><strong>{photo.category}</strong> #{photo.id}</p>
                      {photo.subtitle && <p>{photo.subtitle}</p>}
                      <button 
                        onClick={() => handleSetAsHomepage(photo.url)}
                        className={styles.setHomepageButton}
                      >
                        Set as Homepage
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {homepageUploadStatus && (
          <div className={homepageUploadStatus.success ? styles.uploadSuccess : styles.uploadError}>
            <p>{homepageUploadStatus.message || homepageUploadStatus}</p>
          </div>
        )}

        {homepageFile && (
          <div className={styles.preview}>
            <h3>Preview:</h3>
            <img
              src={URL.createObjectURL(homepageFile)}
              alt="Preview"
              className={styles.previewImage}
            />
          </div>
        )}
      </div>

      <div className={styles.uploadSection}>
        <h2>Upload New Photo</h2>
        
        <div className={styles.formGroup}>
          <label htmlFor="fileInput">Select Image:</label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.fileInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            name="title"
            value={photoData.title}
            onChange={handleInputChange}
            placeholder="Enter photo title"
            className={styles.textInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={photoData.category}
            onChange={handleInputChange}
            className={styles.selectInput}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1).replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description (optional):</label>
          <textarea
            id="description"
            name="description"
            value={photoData.description}
            onChange={handleInputChange}
            placeholder="Enter photo description"
            className={styles.textArea}
            rows="3"
          />
        </div>

        <button onClick={handleUpload} className={styles.uploadButton}>
          Upload Photo
        </button>

        {uploadStatus && (
          <div className={uploadStatus.success ? styles.uploadSuccess : styles.uploadError}>
            <p>{uploadStatus.message || uploadStatus}</p>
            {uploadStatus.photoInfo && (
              <div className={styles.photoInfo}>
                <strong>{uploadStatus.photoInfo}</strong>
              </div>
            )}
          </div>
        )}

        {selectedFile && (
          <div className={styles.preview}>
            <h3>Preview:</h3>
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Preview"
              className={styles.previewImage}
            />
          </div>
        )}
      </div>

      <div className={styles.instructions}>
        <h3>Instructions:</h3>
        <ol>
          <li>Select an image file</li>
          <li>Enter a title and select category</li>
          <li>Click upload to add to Cloudinary and your gallery</li>
          <li>Photo will automatically appear on your website!</li>
        </ol>
        <p><strong>Note:</strong> Photos are stored in your browser's localStorage and will persist between sessions.</p>
      </div>

      <div className={styles.photoManagement}>
        <h2>Manage Existing Photos</h2>
        
        <div className={styles.categorySelector}>
          <label htmlFor="manageCategory">Select Category:</label>
          <select
            id="manageCategory"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.selectInput}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1).replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.photoGrid}>
          {existingPhotos.length === 0 ? (
            <p>No photos in this category yet.</p>
          ) : (
            existingPhotos.map(photo => (
              <div key={`${photo.category}-${photo.id}`} className={styles.photoCard}>
                <img src={photo.url} alt={photo.subtitle || 'Photo'} className={styles.photoThumbnail} />
                <div className={styles.photoInfo}>
                  <p><strong>ID:</strong> {photo.id}</p>
                  <p><strong>Category:</strong> {photo.category}</p>
                  {photo.subtitle && <p><strong>Subtitle:</strong> {photo.subtitle}</p>}
                  <button 
                    onClick={() => handleDeletePhoto(photo.id, photo.category)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
