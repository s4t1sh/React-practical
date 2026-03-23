import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersRequest, loadBookmarks, resetUsers, setSearchTerm } from '../../actions/userActions';
import SearchBar from '../../components/SearchBar';
import UserList from '../../components/UserList';
import TabNavigation from '../../components/TabNavigation';
import RefreshIcon from '@mui/icons-material/Refresh';

const Home = () => {
  const dispatch = useDispatch();
  const { users, bookmarks, loading, since, hasMore, searchTerm } = useSelector(
    (state) => state.user
  );
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    dispatch(loadBookmarks());
    if (users.length === 0) {
      dispatch(fetchUsersRequest());
    }
  }, [dispatch, users.length]);

  const filteredUsers = useMemo(() => {
    const dataToFilter = activeTab === 'users' ? users : bookmarks;
    if (!searchTerm) return dataToFilter;
    
    return dataToFilter.filter((user) =>
      user.login.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [activeTab, users, bookmarks, searchTerm]);

  const handleRefresh = () => {
    dispatch(setSearchTerm(''));
    setActiveTab('users');
    dispatch(resetUsers());
    dispatch(fetchUsersRequest(0));
  };

  const handleLoadMore = () => {
    dispatch(fetchUsersRequest(since));
  };

  return (
    <div className="max-w-6xl mx-auto mt-6 min-h-screen">
      <header className="relative font-bold text-4xl text-center mb-6">
        <h1>GitHub Users</h1>
        <button className="static transform-none lg:absolute lg:top-0 lg:right-0 cursor-pointer text-blue-500" onClick={handleRefresh} title="Pull to refresh">
          <RefreshIcon />
        </button>
      </header>
      
      <main className="app-content">
        <SearchBar />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <UserList
          users={filteredUsers}
          loading={loading}
          hasMore={activeTab === 'users' && !searchTerm && hasMore}
          onLoadMore={handleLoadMore}
          emptyMessage={
            activeTab === 'bookmarks' && bookmarks.length === 0
              ? "You haven't bookmarked any users yet."
              : "No users matching your search."
          }
        />
      </main>
    </div>
  );
};

export default Home;
