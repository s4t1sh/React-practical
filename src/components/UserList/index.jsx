import UserItem from '../UserItem';


const UserList = ({ users, loading, hasMore, onLoadMore, emptyMessage }) => {
  if (users.length === 0 && !loading) {
    return <div className="text-center">{emptyMessage || 'No users found.'}</div>;
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full mb-8"> 
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
      {hasMore && (
        <button 
          onClick={onLoadMore} 
          disabled={loading} 
          className="py-2 px-4 rounded-lg bg-blue-500 text-white"
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default UserList;
