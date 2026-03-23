import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../store/userSlice';
import debounce from 'lodash/debounce';


const SearchBar = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const debouncedSearch = useCallback(
    debounce((term) => {
      dispatch(setSearchTerm(term));
    }, 300),
    []
  );

  const handleChange = (e) => {
    const term = e.target.value;
    setValue(term);
    debouncedSearch(term);
  };

  return (
    <div className="my-5 flex justify-center">
      <input
        type="text"
        placeholder="Search users by name..."
        value={value}
        onChange={handleChange}
        className="max-w-lg w-full py-3 px-5 rounded-full border border-gray-300 focus:outline-none focus:ring-[1px] focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
