import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { db } from '../services/db';
import { Search, UserPlus, Bell, Check, X } from 'lucide-react';

export const Header = () => {
  const {
    activeUser,
    navigateTo,
    searchQuery,
    setSearchQuery,
    notifications,
    unreadNotifCount,
    pendingRequests,
    acceptFriendRequest,
    rejectFriendRequest
  } = useApp();

  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showNotifPopover, setShowNotifPopover] = useState(false);
  const [showReqPopover, setShowReqPopover] = useState(false);

  const searchRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSearchDropdown(e.target.value.trim().length > 0);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchDropdown(false);
      navigateTo('search', searchQuery);
    }
  };

  const searchResults = db.search(searchQuery);

  // Close search dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fb-header">
      <div className="fb-container fb-header-inner">
        {/* Logo */}
        <div className="fb-logo" onClick={() => navigateTo('feed')}>
          facebook <span>2007</span>
        </div>

        {/* Live Search Engine */}
        <div className="fb-search-wrap" ref={searchRef}>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="fb-search-input"
              placeholder="Search people and posts..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setShowSearchDropdown(searchQuery.trim().length > 0)}
            />
            <button type="submit" className="fb-search-btn">
              <Search size={14} />
            </button>
          </form>

          {showSearchDropdown && (
            <div className="fb-search-dropdown">
              {searchResults.users.length === 0 && searchResults.posts.length === 0 ? (
                <div style={{ padding: '10px', color: '#666' }}>No matches found for "{searchQuery}"</div>
              ) : (
                <>
                  {searchResults.users.length > 0 && (
                    <div>
                      <div style={{ background: '#f2f2f2', padding: '4px 8px', fontWeight: 'bold', fontSize: '10px', color: '#666' }}>PEOPLE</div>
                      {searchResults.users.slice(0, 5).map(u => (
                        <div
                          key={u.id}
                          className="fb-search-item"
                          onClick={() => {
                            setShowSearchDropdown(false);
                            navigateTo('profile', u.id);
                          }}
                        >
                          <img src={u.avatar} alt="" style={{ width: 24, height: 24, borderRadius: 2, objectFit: 'contain' }} />
                          <div>
                            <div style={{ fontWeight: 'bold', fontSize: '11px', color: '#3b5998' }}>{u.name}</div>
                            <div style={{ fontSize: '9px', color: '#777' }}>{u.work}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {searchResults.posts.length > 0 && (
                    <div>
                      <div style={{ background: '#f2f2f2', padding: '4px 8px', fontWeight: 'bold', fontSize: '10px', color: '#666' }}>POSTS</div>
                      {searchResults.posts.slice(0, 3).map(p => {
                        const author = db.getUser(p.authorId);
                        return (
                          <div
                            key={p.id}
                            className="fb-search-item"
                            onClick={() => {
                              setShowSearchDropdown(false);
                              navigateTo('search', searchQuery);
                            }}
                          >
                            <div style={{ fontSize: '11px', color: '#333' }}>
                              <strong>{author?.name}:</strong> {p.content.slice(0, 45)}...
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div
                    style={{ background: '#edf0f5', padding: '6px', textAlign: 'center', cursor: 'pointer', borderTop: '1px solid #ccc' }}
                    onClick={handleSearchSubmit}
                  >
                    <a style={{ fontWeight: 'bold', fontSize: '11px' }}>See all results for "{searchQuery}"</a>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Right Navigation & Notification Icons */}
        <div className="fb-header-nav">
          <div className="fb-nav-icons">
            {/* Friend Requests Icon */}
            <div style={{ position: 'relative' }}>
              <button
                className={`fb-nav-icon-btn ${showReqPopover ? 'active' : ''}`}
                onClick={() => {
                  setShowReqPopover(!showReqPopover);
                  setShowNotifPopover(false);
                }}
                title="Friend Requests"
              >
                <UserPlus size={15} />
                {pendingRequests.length > 0 && (
                  <span className="fb-badge">{pendingRequests.length}</span>
                )}
              </button>

              {showReqPopover && (
                <div className="fb-popover" style={{ right: '-50px' }}>
                  <div className="fb-popover-header">
                    <span>Friend Requests</span>
                    <a onClick={() => setShowReqPopover(false)} style={{ color: '#fff' }}>✕</a>
                  </div>
                  <div className="fb-popover-body">
                    {pendingRequests.length === 0 ? (
                      <div style={{ padding: '15px', textAlign: 'center', color: '#777' }}>No new friend requests.</div>
                    ) : (
                      pendingRequests.map(reqId => {
                        const reqUser = db.getUser(reqId);
                        if (!reqUser) return null;
                        return (
                          <div key={reqId} className="fb-popover-item" style={{ alignItems: 'center' }}>
                            <img src={reqUser.avatar} style={{ width: 36, height: 36, objectFit: 'contain' }} alt="" />
                            <div style={{ flex: 1 }}>
                              <a style={{ fontWeight: 'bold' }} onClick={() => navigateTo('profile', reqId)}>{reqUser.name}</a>
                              <div style={{ fontSize: '9px', color: '#777' }}>{reqUser.work}</div>
                              <div style={{ display: 'flex', gap: '5px', marginTop: '4px' }}>
                                <button className="fb-btn fb-btn-success" onClick={() => acceptFriendRequest(reqId)}>
                                  <Check size={10} /> Confirm
                                </button>
                                <button className="fb-btn fb-btn-default" onClick={() => rejectFriendRequest(reqId)}>
                                  <X size={10} /> Ignore
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Notifications Icon */}
            <div style={{ position: 'relative' }}>
              <button
                className={`fb-nav-icon-btn ${showNotifPopover ? 'active' : ''}`}
                onClick={() => {
                  setShowNotifPopover(!showNotifPopover);
                  setShowReqPopover(false);
                  db.markNotificationsRead(activeUser.id);
                }}
                title="Notifications"
              >
                <Bell size={15} />
                {unreadNotifCount > 0 && (
                  <span className="fb-badge">{unreadNotifCount}</span>
                )}
              </button>

              {showNotifPopover && (
                <div className="fb-popover" style={{ right: 0 }}>
                  <div className="fb-popover-header">
                    <span>Notifications</span>
                    <a onClick={() => setShowNotifPopover(false)} style={{ color: '#fff' }}>✕</a>
                  </div>
                  <div className="fb-popover-body">
                    {notifications.length === 0 ? (
                      <div style={{ padding: '15px', textAlign: 'center', color: '#777' }}>No notifications yet.</div>
                    ) : (
                      notifications.slice(0, 8).map(n => {
                        const actor = db.getUser(n.actorId);
                        return (
                          <div
                            key={n.id}
                            className={`fb-popover-item ${n.read ? '' : 'unread'}`}
                            onClick={() => {
                              setShowNotifPopover(false);
                              if (n.type === 'friend_request' || n.type === 'poke') {
                                navigateTo('profile', n.actorId);
                              } else {
                                navigateTo('feed');
                              }
                            }}
                          >
                            <img src={actor?.avatar || '/assets/imgs/1.jpg'} style={{ width: 32, height: 32, objectFit: 'contain' }} alt="" />
                            <div>
                              <div>{n.message}</div>
                              <div style={{ fontSize: '9px', color: '#888', marginTop: '2px' }}>
                                {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Active User Links */}
          <div className="fb-nav-user" onClick={() => navigateTo('profile', activeUser.id)} style={{ cursor: 'pointer' }}>
            <img src={activeUser.avatar} className="fb-nav-avatar" alt="" />
            <span>{activeUser.firstName}</span>
          </div>

          <a onClick={() => navigateTo('feed')} style={{ color: '#fff', fontWeight: 'bold' }}>Home</a>
          <a onClick={() => navigateTo('login')} style={{ color: '#fff', fontSize: '10px' }}>Logout</a>
        </div>
      </div>
    </header>
  );
};
