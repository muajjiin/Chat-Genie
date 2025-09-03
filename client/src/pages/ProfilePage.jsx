import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  const [selectedImg, setSelectedImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Sync form fields with authUser when loaded
  useEffect(() => {
    if (authUser) {
      setName(authUser.fullname || "");
      setBio(authUser.bio || "");
    }
  }, [authUser]);

  // Preview selected image
  useEffect(() => {
    if (!selectedImg) {
      setPreviewImg(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImg);
    setPreviewImg(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let body = { fullname: name, bio };

      if (selectedImg) {
        const base64image = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(selectedImg);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (err) => reject(err);
        });
        body.profilePic = base64image;
      }

      await updateProfile(body);
      navigate('/');
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("Profile update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1'>
          <h3 className='text-lg'>Profile Details</h3>

          {/* Image Upload */}
          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer text-gray-300 font-medium'>
            <input 
              type="file" 
              id='avatar' 
              accept='.png, .jpg, .jpeg'  
              hidden
              onChange={(e) => setSelectedImg(e.target.files[0])}
            />
            <img 
              src={previewImg || assets.avatar_icon} 
              alt="Profile" 
              className={`w-12 h-12 object-cover ${selectedImg ? 'rounded-full' : ''}`} 
            />
            <span>Upload your profile pic</span>
          </label> 

          {/* Name Input */}
          <input  
            type="text" 
            placeholder='Your name'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500' 
          /> 

          {/* Bio Textarea */}
          <textarea    
            placeholder='Write profile bio'
            required
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500' 
          ></textarea>

          {/* Error Message */}
          {error && <p className='text-red-500'>{error}</p>}

          {/* Submit Button */}
          <button 
            type='submit' 
            disabled={loading} 
            className='bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer disabled:opacity-50'
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </form>

        {/* Side Logo */}
        <img 
          src={assets.logo_icon} 
          alt="Logo"
          className={`max-w-44 aspect-square mx-10 max-sm:mt-10 ${selectedImg ? 'rounded-full' : ''}`} 
        />
      </div>
    </div>
  );
};

export default ProfilePage;
