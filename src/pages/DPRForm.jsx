import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X, CheckCircle2 } from 'lucide-react';
import projectData from '../data/projects.json';

const DPRForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectData.find(p => p.id === id);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    weather: 'Sunny',
    description: '',
    workerCount: ''
  });
  
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // If wrong project ID, just show an error
  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
        <button 
          onClick={() => navigate('/projects')}
          className="text-primary-600 hover:underline flex items-center"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Projects
        </button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Check max 3 photos total
    if (photos.length + files.length > 3) {
      setErrors(prev => ({ ...prev, photos: 'Maximum 3 photos allowed' }));
      return;
    }

    const newPhotos = files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    
    setPhotos(prev => [...prev, ...newPhotos]);
    if (errors.photos) {
       setErrors(prev => ({ ...prev, photos: '' }));
    }
  };

  const removePhoto = (index) => {
    setPhotos(prev => {
      const newPhotos = [...prev];
      URL.revokeObjectURL(newPhotos[index].url);
      newPhotos.splice(index, 1);
      return newPhotos;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.description.trim()) newErrors.description = 'Work description is required';
    if (formData.description.trim().length < 10) newErrors.description = 'Description must be at least 10 characters';
    if (!formData.workerCount) newErrors.workerCount = 'Worker count is required';
    if (parseInt(formData.workerCount) <= 0) newErrors.workerCount = 'Worker count must be greater than 0';
    if (photos.length === 0) newErrors.photos = 'At least 1 photo is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Auto redirect after 2 seconds
      setTimeout(() => {
        navigate('/projects');
      }, 2000);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
          <CheckCircle2 size={64} className="mx-auto text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Submitted!</h2>
          <p className="text-gray-600 mb-6">Your Daily Progress Report has been saved successfully.</p>
          <p className="text-sm text-gray-500">Redirecting to projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <button 
            onClick={() => navigate('/projects')}
            className="mr-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded p-1"
            aria-label="Back to projects"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">Daily Progress Report</h1>
            <p className="text-sm text-gray-500">{project.name}</p>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <form onSubmit={handleSubmit} className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
          <div className="p-6 space-y-6">
            
            {/* General Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-100">General Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    max={new Date().toISOString().split('T')[0]}
                    className={`mt-1 block w-full px-3 py-2 border ${errors.date ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                  />
                  {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
                </div>
                
                <div>
                  <label htmlFor="weather" className="block text-sm font-medium text-gray-700">Weather *</label>
                  <select
                    id="weather"
                    name="weather"
                    value={formData.weather}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  >
                    <option value="Sunny">Sunny ☀️</option>
                    <option value="Cloudy">Cloudy ☁️</option>
                    <option value="Rainy">Rainy 🌧️</option>
                    <option value="Windy">Windy 💨</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Work Details */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-100">Work Details</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="workerCount" className="block text-sm font-medium text-gray-700">Total Worker Count *</label>
                  <input
                    type="number"
                    id="workerCount"
                    name="workerCount"
                    min="1"
                    placeholder="e.g. 15"
                    value={formData.workerCount}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full md:w-1/3 px-3 py-2 border ${errors.workerCount ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                  />
                  {errors.workerCount && <p className="mt-1 text-xs text-red-500">{errors.workerCount}</p>}
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Work Description *</label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    placeholder="Describe the work completed today..."
                    value={formData.description}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full px-3 py-2 border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                  />
                  <div className="flex justify-between mt-1">
                    {errors.description ? (
                      <p className="text-xs text-red-500">{errors.description}</p>
                    ) : (
                      <span className="text-xs text-gray-500">Minimum 10 characters</span>
                    )}
                    <span className="text-xs text-gray-500">{formData.description.length} chars</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Photos */}
            <div>
              <div className="flex justify-between items-end mb-4 border-b border-gray-100 pb-2">
                <h2 className="text-lg font-medium text-gray-900">Site Photos *</h2>
                <span className="text-sm text-gray-500">{photos.length}/3 uploaded</span>
              </div>
              
              <div className="space-y-4">
                {photos.length < 3 && (
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="photo-upload" className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors ${errors.photos && photos.length === 0 ? 'border-red-300 hover:bg-red-50' : 'border-gray-300'}`}>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload size={24} className="text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500"><span className="font-semibold text-primary-600">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500">JPEG, PNG (max. 3 photos)</p>
                      </div>
                      <input 
                        id="photo-upload" 
                        type="file" 
                        className="hidden" 
                        accept="image/png, image/jpeg, image/jpg" 
                        multiple 
                        onChange={handlePhotoUpload} 
                      />
                    </label>
                  </div>
                )}
                
                {errors.photos && <p className="text-xs text-red-500 text-center">{errors.photos}</p>}

                {photos.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 shadow-sm group">
                        <img 
                          src={photo.url} 
                          alt={`Upload preview ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute top-2 right-2 p-1 bg-white/80 hover:bg-red-100 hover:text-red-600 rounded-full text-gray-700 transition-colors backdrop-blur-sm shadow-sm"
                          aria-label="Remove photo"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/projects')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default DPRForm;
