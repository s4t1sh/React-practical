import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBookmark } from '../../actions/userActions';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';


const UserItem = ({ user }) => {
  const dispatch = useDispatch();
  const bookmarks = useSelector(state => state.user.bookmarks);
  const isBookmarked = bookmarks.some(b => b.id === user.id);

  const handleToggleBookmark = () => {
    dispatch(toggleBookmark(user));
  };

  return (
    <div className="flex justify-between items-center py-3 px-5 rounded-lg border-[1px] border-gray-200">
      <div className="flex items-center gap-3">
        <img src={user.avatar_url} alt={user.login} className="w-10 h-10 rounded-full" />
        <span className="text-lg font-medium">{user.login}</span>
      </div>
      <button onClick={handleToggleBookmark} className="cursor-pointer hover:bg-gray-100 p-2 rounded-full">
        {isBookmarked ? (
          <StarIcon className="text-yellow-300" />
        ) : (
          <StarOutlineIcon className="text-gray-500" />
        )}
      </button>
    </div>
  );
};

export default UserItem;
