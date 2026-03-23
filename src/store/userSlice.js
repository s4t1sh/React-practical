import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers as fetchUsersApi } from '../api/api';

const initialState = {
  users: [],
  bookmarks: JSON.parse(localStorage.getItem('bookmarks') || '[]'),
  loading: false,
  error: null,
  searchTerm: '',
  since: 0,
  hasMore: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setUsers: (state, action) => {
      const newUsers = action.payload;
      state.users = [...state.users, ...newUsers];
      state.since = newUsers.length > 0 ? newUsers[newUsers.length - 1].id : state.since;
      state.hasMore = newUsers.length > 0;
      state.loading = false;
      state.error = null;
    },
    toggleBookmark: (state, action) => {
      const user = action.payload;
      const index = state.bookmarks.findIndex((b) => b.id === user.id);
      if (index !== -1) {
        state.bookmarks.splice(index, 1);
      } else {
        state.bookmarks.push(user);
      }
      localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    resetUsers: (state) => {
      state.users = [];
      state.since = 0;
      state.hasMore = true;
    },
    loadBookmarks: (state) => {
      state.bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    },
  },
});

export const { 
  setLoading, 
  setError, 
  setUsers, 
  toggleBookmark, 
  setSearchTerm, 
  resetUsers, 
  loadBookmarks 
} = userSlice.actions;

export const fetchUsers = (since) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetchUsersApi(since);
    dispatch(setUsers(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export default userSlice.reducer;
