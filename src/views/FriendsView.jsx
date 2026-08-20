import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { db } from '../services/db';
import { Sidebar } from '../components/Sidebar';
import { Users, UserPlus, Search, Check, X, UserX } from 'lucide-react';

export const FriendsView = () => {
  const {
    activeUser,
    acceptFriendRequest,
    rejectFriendRequest,
    sendFriendRequest,
    navigateTo,
    allUsers,
    refreshDb
  } = useApp();

  const [activeTab, setActiveTab] = useState('all'); // all, requests, suggested
  const [filterQuery, setFilterQuery] = useState('');

  const myFriends = activeUser.friends.map(id => db.getUser(id)).filter(Boolean);
  const pendingUsers = activeUser.pendingRequests.map(id => db.getUser(id)).filter(Boolean);

  const suggestedUsers = allUsers.filter(u =>
    u.id !== activeUser.id &&
    !activeUser.friends.includes(u.id) &&
    !u.pendingRequests.includes(activeUser.id)
  );

  const filterList = (list) => {
    if (!filterQuery.trim()) return list;
    const q = filterQuery.toLowerCase();
    return list.filter(u => u.name.toLowerCase().includes(q) || u.work.toLowerCase().includes(q));
  };

  const handleUnfriend = (friendId) => {
    if (confirm('Are you sure you want to remove this friend?')) {
      db.removeFriend(activeUser.id, friendId);
      refreshDb();
    }
  };

  return (
    <div className="fb-container fb-main-body">
      <div className="fb-grid-2col">
        <Sidebar />

        <main>
          <div className="fb-widget-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                <Users size={18} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Friends Center
              </div>
              <div style={{ position: 'relative', width: '200px' }}>
                <input
                  type="text"
                  className="fb-form-control"
                  placeholder="Filter friends..."
                  value={filterQuery}
                  onChange={e => setFilterQuery(e.target.value)}
                  style={{ paddingRight: '25px' }}
                />
                <Search size={12} style={{ position: 'absolute', right: 8, top: 9, color: '#888' }} />
              </div>
            </div>

            {/* Sub Tabs */}
            <div className="fb-profile-tabs" style={{ marginBottom: '15px' }}>
              <button className={`fb-profile-tab-item ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
                All Friends ({myFriends.length})
              </button>
              <button className={`fb-profile-tab-item ${activeTab === 'requests' ? 'active' : ''}`} onClick={() => setActiveTab('requests')}>
                Friend Requests ({pendingUsers.length})
              </button>
              <button className={`fb-profile-tab-item ${activeTab === 'suggested' ? 'active' : ''}`} onClick={() => setActiveTab('suggested')}>
                Find Friends ({suggestedUsers.length})
              </button>
            </div>

            {/* Tab 1: All Friends */}
            {activeTab === 'all' && (
              <div>
                {filterList(myFriends).length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '30px', color: '#777' }}>
                    No friends matching "{filterQuery}".
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {filterList(myFriends).map(friend => (
                      <div key={friend.id} style={{ display: 'flex', gap: '10px', padding: '8px', border: '1px solid #bdc7d8', background: '#fff' }}>
                        <img src={friend.avatar} style={{ width: 50, height: 50, objectFit: 'contain', background: '#f0f2f5' }} alt="" />
                        <div style={{ flex: 1 }}>
                          <a style={{ fontWeight: 'bold', fontSize: '12px' }} onClick={() => navigateTo('profile', friend.id)}>
                            {friend.name}
                          </a>
                          <div style={{ fontSize: '10px', color: '#666' }}>{friend.work}</div>
                          <div style={{ display: 'flex', gap: '5px', marginTop: '6px' }}>
                            <button className="fb-btn fb-btn-default" style={{ fontSize: '9px', padding: '1px 5px' }} onClick={() => navigateTo('profile', friend.id)}>
                              View Profile
                            </button>
                            <button className="fb-btn fb-btn-default" style={{ fontSize: '9px', padding: '1px 5px', color: '#d9534f' }} onClick={() => handleUnfriend(friend.id)}>
                              <UserX size={9} /> Unfriend
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Pending Requests */}
            {activeTab === 'requests' && (
              <div>
                {pendingUsers.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '30px', color: '#777' }}>
                    You have no pending friend requests.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {pendingUsers.map(reqUser => (
                      <div key={reqUser.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', border: '1px solid #bdc7d8', background: '#eceff5' }}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <img src={reqUser.avatar} style={{ width: 45, height: 45, objectFit: 'contain', background: '#fff' }} alt="" />
                          <div>
                            <a style={{ fontWeight: 'bold', fontSize: '12px' }} onClick={() => navigateTo('profile', reqUser.id)}>
                              {reqUser.name}
                            </a>
                            <div style={{ fontSize: '10px', color: '#666' }}>{reqUser.work}</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button className="fb-btn fb-btn-success" onClick={() => acceptFriendRequest(reqUser.id)}>
                            <Check size={11} /> Confirm Friend
                          </button>
                          <button className="fb-btn fb-btn-default" onClick={() => rejectFriendRequest(reqUser.id)}>
                            <X size={11} /> Ignore
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Suggested Friends */}
            {activeTab === 'suggested' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {suggestedUsers.map(u => (
                  <div key={u.id} style={{ display: 'flex', gap: '10px', padding: '8px', border: '1px solid #bdc7d8', background: '#fff' }}>
                    <img src={u.avatar} style={{ width: 50, height: 50, objectFit: 'contain', background: '#f0f2f5' }} alt="" />
                    <div style={{ flex: 1 }}>
                      <a style={{ fontWeight: 'bold', fontSize: '12px' }} onClick={() => navigateTo('profile', u.id)}>
                        {u.name}
                      </a>
                      <div style={{ fontSize: '10px', color: '#666' }}>{u.work}</div>
                      <button className="fb-btn fb-btn-primary" style={{ fontSize: '9px', marginTop: '6px' }} onClick={() => sendFriendRequest(u.id)}>
                        + Add Friend
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
