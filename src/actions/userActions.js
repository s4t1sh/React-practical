// Action Types
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const TOGGLE_BOOKMARK = 'TOGGLE_BOOKMARK';
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const LOAD_BOOKMARKS = 'LOAD_BOOKMARKS';
export const RESET_USERS = 'RESET_USERS';

// Action Creators
export const fetchUsersRequest = (since = 0) => ({
  type: FETCH_USERS_REQUEST,
  payload: { since },
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: { users },
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: { error },
});

export const toggleBookmark = (user) => ({
  type: TOGGLE_BOOKMARK,
  payload: { user },
});

export const setSearchTerm = (term) => ({
  type: SET_SEARCH_TERM,
  payload: { term },
});

export const loadBookmarks = () => ({
  type: LOAD_BOOKMARKS,
});

export const resetUsers = () => ({
  type: RESET_USERS,
});
