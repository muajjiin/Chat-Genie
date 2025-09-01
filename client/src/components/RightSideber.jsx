import React from 'react';
import assets, { imagesDummyData } from '../assets/assets';

const RightSidebar = ({ selectedUser }) => {

  console.log("RightSidebar selectedUser:", selectedUser);

  if (!selectedUser) return null;

  // Determine profile picture
  const profilePic = selectedUser.profilePic
    ? assets[selectedUser.profilePic] || selectedUser.profilePic
    : assets.avatar_icon;

  return (
    <div className="bg-[#8185B2]/10 w-full relative overflow-y-scroll max-md:hidden">
      {/* User Info */}
      <div className="flex flex-col items-center gap-2 py-4">
        <img
          src={profilePic}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />

        <h1 className="flex items-center gap-2 text-xl font-medium">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          {selectedUser?.fullName || "No Name"}
        </h1>

        <p className="text-gray-400 text-center px-4">
          {selectedUser?.bio || "No bio available"}
        </p>
      </div>

      <hr className="border-gray-300 my-4" />

      {/* Media Grid */}
      <div className="px-5 text-xs">
        <p className="font-semibold mb-2">Media</p>
        <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80">
          {imagesDummyData.map((url, index) => (
            <div
              key={index}
              onClick={() => window.open(url)}
              className="cursor-pointer"
            >
              <img src={url} alt={`media-${index}`} className="h-full w-full rounded-md object-cover" />
            </div>
          ))}
        </div>
      </div>
      <button
  className='absolute bottom-5 left-1/2 transform -translate-x-1/2
    bg-gradient-to-r from-purple-400 to-indigo-600 text-white border-none text-sm font-light
    py-2 px-20 rounded-full cursor-pointer'
>
  Logout
</button>

    </div>
  );
};

export default RightSidebar;
