import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { db } from '../services/db';
import { Sidebar } from '../components/Sidebar';
import { PostCard } from '../components/PostCard';
import { Search } from 'lucide-react';

export const SearchView = ({ query }) => {
  const { navigateTo, sendFriendRequest, activeUser } = useApp();
  const [filterType, setFilterType] = useState('all'); // all, people, posts

  const searchResults = db.search(query || '');

  return (
    <div className="fb-container fb-main-body">
      <div className="fb-grid-2col">
        <Sidebar />

        <main>
          <div className="fb-widget-box">
            <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
              <Search size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              Search Results for "{query}"
            </div>

            {/* Search Filter Tabs */}
            <div className="fb-profile-tabs" style={{ marginBottom: '15px' }}>
              <button className={`fb-profile-tab-item ${filterType === 'all' ? 'active' : ''}`} onClick={() => setFilterType('all')}>
                All Results ({searchResults.users.length + searchResults.posts.length})
              </button>
              <button className={`fb-profile-tab-item ${filterType === 'people' ? 'active' : ''}`} onClick={() => setFilterType('people')}>
                People ({searchResults.users.length})
              </button>
              <button className={`fb-profile-tab-item ${filterType === 'posts' ? 'active' : ''}`} onClick={() => setFilterType('posts')}>
                Posts ({searchResults.posts.length})
              </button>
            </div>

            {/* Empty state */}
            {searchResults.users.length === 0 && searchResults.posts.length === 0 && (
              <div style={{ padding: '30px', textAlign: 'center', color: '#777' }}>
                No people or posts matched your search query "{query}". Try another search!
              </div>
            )}

            {/* People Results */}
            {(filterType === 'all' || filterType === 'people') && searchResults.users.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <div className="fb-widget-title">PEOPLE</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {searchResults.users.map(user => {
                    const isFriend = activeUser.friends.includes(user.id);
                    const isSelf = user.id === activeUser.id;
                    return (
                      <div key={user.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', border: '1px solid #bdc7d8', background: '#fff' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={user.avatar} style={{ width: 45, height: 45, objectFit: 'contain', background: '#f0f2f5' }} alt="" />
                          <div>
                            <a style={{ fontWeight: 'bold', fontSize: '13px' }} onClick={() => navigateTo('profile', user.id)}>
                              {user.name}
                            </a>
                            <div style={{ fontSize: '10px', color: '#666' }}>{user.work}</div>
                            <div style={{ fontSize: '10px', color: '#888' }}>{user.education}</div>
                          </div>
                        </div>

                        {!isSelf && (
                          <div>
                            {isFriend ? (
                              <button className="fb-btn fb-btn-default" disabled>Friends</button>
                            ) : (
                              <button className="fb-btn fb-btn-primary" onClick={() => sendFriendRequest(user.id)}>
                                + Add Friend
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Posts Results */}
            {(filterType === 'all' || filterType === 'posts') && searchResults.posts.length > 0 && (
              <div>
                <div className="fb-widget-title">POSTS</div>
                {searchResults.posts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
