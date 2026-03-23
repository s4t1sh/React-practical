import React from 'react';


const TabNavigation = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex gap-4 mb-6 justify-center">
      <button
        className={`py-2 px-4 rounded-lg ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        onClick={() => onTabChange('users')}
      >
        Users
      </button>
      <button
        className={`py-2 px-4 rounded-lg ${activeTab === 'bookmarks' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        onClick={() => onTabChange('bookmarks')}
      >
        Bookmarked Users
      </button>
    </div>
  );
};

export default TabNavigation;
