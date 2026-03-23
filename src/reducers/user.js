import * as types from '../actions/userActions';

const initialState = {
  users: [],
  bookmarks: [],
  loading: false,
  error: null,
  searchTerm: '',
  since: 0,
  hasMore: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.FETCH_USERS_SUCCESS: {
      const newUsers = action.payload.users;
      const lastUser = newUsers[newUsers.length - 1];
      return {
        ...state,
        loading: false,
        users: [...state.users, ...newUsers],
        since: lastUser ? lastUser.id : state.since,
        hasMore: newUsers.length > 0,
      };
    }
    case types.FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case types.TOGGLE_BOOKMARK: {
      const user = action.payload.user;
      const isBookmarked = state.bookmarks.some((b) => b.id === user.id);
      let updatedBookmarks;
      if (isBookmarked) {
        updatedBookmarks = state.bookmarks.filter((b) => b.id !== user.id);
      } else {
        updatedBookmarks = [...state.bookmarks, user];
      }
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      return {
        ...state,
        bookmarks: updatedBookmarks,
      };
    }
    case types.LOAD_BOOKMARKS: {
      const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      return {
        ...state,
        bookmarks: storedBookmarks,
      };
    }
    case types.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload.term,
      };
    case types.RESET_USERS:
      return {
        ...state,
        users: [],
        since: 0,
        hasMore: true,
      };
    default:
      return state;
  }
};

export default userReducer;
