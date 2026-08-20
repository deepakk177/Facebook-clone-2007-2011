import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { db } from '../services/db';
import { Sidebar } from '../components/Sidebar';
import { PostPublisher } from '../components/PostPublisher';
import { PostCard } from '../components/PostCard';
import { UserPlus, UserCheck, Hand, Edit2, MessageSquare, Save, X, Camera, Check } from 'lucide-react';

export const ProfileView = ({ userId }) => {
  const {
    activeUser,
    activeUserId,
    sendFriendRequest,
    acceptFriendRequest,
    pokeUser,
    updateUserProfile,
    navigateTo
  } = useApp();

  const [activeTab, setActiveTab] = useState('wall'); // wall, info, photos, friends
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const profileUser = db.getUser(userId || activeUserId) || activeUser;
  const isSelf = profileUser.id === activeUserId;
  const isFriend = activeUser.friends.includes(profileUser.id);
  const isPendingSent = profileUser.pendingRequests.includes(activeUserId);
  const isPendingReceived = activeUser.pendingRequests.includes(profileUser.id);

  // Edit form state
  const [editForm, setEditForm] = useState({
    bio: profileUser.bio || '',
    hometown: profileUser.hometown || '',
    work: profileUser.work || '',
    education: profileUser.education || '',
    relationship: profileUser.relationship || '',
    interests: profileUser.interests || '',
    avatar: profileUser.avatar || ''
  });

  const handleSaveInfo = (e) => {
    e.preventDefault();
    updateUserProfile(profileUser.id, editForm);
    setIsEditingInfo(false);
  };

  const wallPosts = db.getPosts(profileUser.id);
  const profileFriends = profileUser.friends.map(id => db.getUser(id)).filter(Boolean);

  const photoList = (profileUser.photos && profileUser.photos.length > 0)
    ? profileUser.photos
    : [
        '/assets/imgs/1.jpg',
        '/assets/imgs/2.jpg',
        '/assets/imgs/3.jpg',
        '/assets/imgs/4.jpg',
        '/assets/imgs/5.jpg'
      ];

  const handleSetProfilePic = (imgUrl) => {
    if (confirm('Set this photo as your profile picture?')) {
      updateUserProfile(profileUser.id, { avatar: imgUrl });
      setSelectedPhoto(null);
    }
  };

  return (
    <div className="fb-container fb-main-body">
      <div className="fb-grid-2col">
        {/* Left Column Sidebar */}
        <Sidebar />

        {/* Main Profile Area */}
        <main>
          {/* Profile Header Card */}
          <div className="fb-profile-header-card">
            <div className="fb-profile-top">
              <div style={{ position: 'relative' }}>
                <img src={profileUser.avatar} className="fb-profile-main-avatar" alt="" />
                {isSelf && (
                  <button
                    onClick={() => {
                      const newUrl = prompt('Enter new avatar image URL:', profileUser.avatar);
                      if (newUrl) updateUserProfile(profileUser.id, { avatar: newUrl });
                    }}
                    className="fb-btn fb-btn-default"
                    style={{ position: 'absolute', bottom: 5, right: 5, fontSize: '9px', padding: '2px 4px' }}
                    title="Change profile picture"
                  >
                    <Camera size={10} /> Change
                  </button>
                )}
              </div>

              <div className="fb-profile-details">
                <div className="fb-profile-name">{profileUser.name}</div>
                <div style={{ fontSize: '11px', color: '#666', marginBottom: '8px' }}>
                  {profileUser.network} • {profileUser.hometown}
                </div>

                {/* Status bubble */}
                <div className="fb-profile-status-line">
                  <strong>{profileUser.firstName}</strong> {profileUser.status}
                </div>

                {/* Action Buttons */}
                <div className="fb-profile-actions">
                  {!isSelf && (
                    <>
                      {isFriend ? (
                        <button className="fb-btn fb-btn-default" disabled>
                          <UserCheck size={11} color="#67a54b" /> Friends
                        </button>
                      ) : isPendingSent ? (
                        <button className="fb-btn fb-btn-default" disabled>
                          Friend Request Sent
                        </button>
                      ) : isPendingReceived ? (
                        <button className="fb-btn fb-btn-success" onClick={() => acceptFriendRequest(profileUser.id)}>
                          Accept Friend Request
                        </button>
                      ) : (
                        <button className="fb-btn fb-btn-primary" onClick={() => sendFriendRequest(profileUser.id)}>
                          <UserPlus size={11} /> Add Friend
                        </button>
                      )}

                      <button className="fb-btn fb-btn-default" onClick={() => pokeUser(profileUser.id)}>
                        <Hand size={11} color="#3b5998" /> Poke {profileUser.firstName}
                      </button>

                      <button
                        className="fb-btn fb-btn-default"
                        onClick={() => {
                          setActiveTab('wall');
                          window.scrollTo({ top: 400, behavior: 'smooth' });
                        }}
                      >
                        <MessageSquare size={11} /> Write on Wall
                      </button>
                    </>
                  )}

                  {isSelf && (
                    <button className="fb-btn fb-btn-primary" onClick={() => { setActiveTab('info'); setIsEditingInfo(true); }}>
                      <Edit2 size={11} /> Edit My Profile
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Navigation Tabs */}
            <div className="fb-profile-tabs">
              <button className={`fb-profile-tab-item ${activeTab === 'wall' ? 'active' : ''}`} onClick={() => setActiveTab('wall')}>
                Wall
              </button>
              <button className={`fb-profile-tab-item ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>
                Info
              </button>
              <button className={`fb-profile-tab-item ${activeTab === 'photos' ? 'active' : ''}`} onClick={() => setActiveTab('photos')}>
                Photos ({photoList.length})
              </button>
              <button className={`fb-profile-tab-item ${activeTab === 'friends' ? 'active' : ''}`} onClick={() => setActiveTab('friends')}>
                Friends ({profileFriends.length})
              </button>
            </div>
          </div>

          {/* TAB CONTENT: WALL */}
          {activeTab === 'wall' && (
            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '15px' }}>
              {/* Left Info Snapshot & Friends Grid */}
              <div>
                <div className="fb-widget-box">
                  <div className="fb-widget-title">INFORMATION</div>
                  <ul className="fb-profile-meta-list">
                    <li><strong>Networks:</strong> {profileUser.network}</li>
                    <li><strong>Hometown:</strong> {profileUser.hometown}</li>
                    <li><strong>Relationship:</strong> {profileUser.relationship}</li>
                    <li><strong>Work:</strong> {profileUser.work}</li>
                  </ul>
                  <a style={{ fontSize: '10px', marginTop: '6px', display: 'inline-block' }} onClick={() => setActiveTab('info')}>
                    View Full Info »
                  </a>
                </div>

                <div className="fb-widget-box">
                  <div className="fb-widget-title">
                    <span>FRIENDS ({profileFriends.length})</span>
                    <a style={{ fontSize: '9px' }} onClick={() => setActiveTab('friends')}>See All</a>
                  </div>
                  {profileFriends.length === 0 ? (
                    <div style={{ fontSize: '10px', color: '#777' }}>No friends added yet.</div>
                  ) : (
                    <div className="fb-friend-grid">
                      {profileFriends.slice(0, 9).map(friend => (
                        <div key={friend.id} className="fb-friend-grid-item" onClick={() => navigateTo('profile', friend.id)} style={{ cursor: 'pointer' }}>
                          <img src={friend.avatar} className="fb-friend-grid-avatar" alt="" />
                          <span className="fb-friend-grid-name">{friend.firstName}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Wall Feed */}
              <div>
                <PostPublisher targetUser={profileUser} />

                <div style={{ background: '#6d84b4', color: '#fff', padding: '5px 10px', fontWeight: 'bold', fontSize: '11px', marginBottom: '10px' }}>
                  The Wall — {profileUser.firstName}'s Feed & Posts
                </div>

                {wallPosts.length === 0 ? (
                  <div className="fb-widget-box" style={{ padding: '20px', textAlign: 'center', color: '#777' }}>
                    No posts on {profileUser.firstName}'s Wall yet. Write something above!
                  </div>
                ) : (
                  wallPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB CONTENT: INFO */}
          {activeTab === 'info' && (
            <div className="fb-widget-box">
              {isEditingInfo ? (
                <form onSubmit={handleSaveInfo} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '14px', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>
                    Edit Profile Information
                  </div>

                  <div>
                    <label style={{ fontWeight: 'bold', fontSize: '11px' }}>Bio / About Me:</label>
                    <textarea
                      className="fb-form-control"
                      value={editForm.bio}
                      onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="fb-form-row">
                    <div style={{ flex: 1 }}>
                      <label style={{ fontWeight: 'bold', fontSize: '11px' }}>Hometown:</label>
                      <input
                        type="text"
                        className="fb-form-control"
                        value={editForm.hometown}
                        onChange={(e) => setEditForm({ ...editForm, hometown: e.target.value })}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontWeight: 'bold', fontSize: '11px' }}>Relationship Status:</label>
                      <input
                        type="text"
                        className="fb-form-control"
                        value={editForm.relationship}
                        onChange={(e) => setEditForm({ ...editForm, relationship: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="fb-form-row">
                    <div style={{ flex: 1 }}>
                      <label style={{ fontWeight: 'bold', fontSize: '11px' }}>Work:</label>
                      <input
                        type="text"
                        className="fb-form-control"
                        value={editForm.work}
                        onChange={(e) => setEditForm({ ...editForm, work: e.target.value })}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontWeight: 'bold', fontSize: '11px' }}>Education:</label>
                      <input
                        type="text"
                        className="fb-form-control"
                        value={editForm.education}
                        onChange={(e) => setEditForm({ ...editForm, education: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontWeight: 'bold', fontSize: '11px' }}>Interests & Hobbies:</label>
                    <input
                      type="text"
                      className="fb-form-control"
                      value={editForm.interests}
                      onChange={(e) => setEditForm({ ...editForm, interests: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                    <button type="submit" className="fb-btn fb-btn-success">
                      <Save size={12} /> Save Changes
                    </button>
                    <button type="button" className="fb-btn fb-btn-default" onClick={() => setIsEditingInfo(false)}>
                      <X size={12} /> Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="fb-widget-title" style={{ fontSize: '13px' }}>BASIC INFORMATION</div>
                  <ul className="fb-profile-meta-list" style={{ fontSize: '12px', lineHeight: '1.8' }}>
                    <li><strong>Full Name:</strong> {profileUser.name}</li>
                    <li><strong>Network:</strong> {profileUser.network}</li>
                    <li><strong>Hometown:</strong> {profileUser.hometown}</li>
                    <li><strong>Relationship:</strong> {profileUser.relationship}</li>
                  </ul>

                  <div className="fb-widget-title" style={{ fontSize: '13px', marginTop: '15px' }}>WORK & EDUCATION</div>
                  <ul className="fb-profile-meta-list" style={{ fontSize: '12px', lineHeight: '1.8' }}>
                    <li><strong>Work:</strong> {profileUser.work}</li>
                    <li><strong>Education:</strong> {profileUser.education}</li>
                  </ul>

                  <div className="fb-widget-title" style={{ fontSize: '13px', marginTop: '15px' }}>ABOUT & INTERESTS</div>
                  <div style={{ padding: '6px 0', fontSize: '12px' }}>
                    <p style={{ marginBottom: '8px' }}>{profileUser.bio}</p>
                    <div><strong>Interests:</strong> {profileUser.interests}</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: PHOTOS */}
          {activeTab === 'photos' && (
            <div className="fb-widget-box">
              <div className="fb-widget-title">PHOTOS & ALBUMS FOR {profileUser.name.toUpperCase()}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '12px' }}>
                {photoList.map((imgUrl, i) => (
                  <div
                    key={i}
                    style={{ border: '1px solid #ccc', padding: '6px', background: '#fff', cursor: 'pointer', position: 'relative' }}
                    onClick={() => setSelectedPhoto(imgUrl)}
                  >
                    <img src={imgUrl} style={{ width: '100%', height: '140px', objectFit: 'cover' }} alt="" />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
                      <span style={{ fontSize: '10px', color: '#666', fontWeight: 'bold' }}>
                        Photo {i + 1} {imgUrl === profileUser.avatar ? '(Profile Picture)' : ''}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB CONTENT: FRIENDS */}
          {activeTab === 'friends' && (
            <div className="fb-widget-box">
              <div className="fb-widget-title">{profileUser.firstName.toUpperCase()}'S FRIENDS ({profileFriends.length})</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginTop: '10px' }}>
                {profileFriends.map(friend => (
                  <div key={friend.id} style={{ display: 'flex', gap: '10px', padding: '8px', border: '1px solid #e5e5e5', background: '#fafafa' }}>
                    <img src={friend.avatar} style={{ width: 45, height: 45, objectFit: 'cover' }} alt="" />
                    <div>
                      <a style={{ fontWeight: 'bold', fontSize: '12px' }} onClick={() => navigateTo('profile', friend.id)}>
                        {friend.name}
                      </a>
                      <div style={{ fontSize: '10px', color: '#666' }}>{friend.network}</div>
                      <div style={{ fontSize: '9px', color: '#888' }}>{friend.friends.length} friends</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <div className="fb-modal-overlay" onClick={() => setSelectedPhoto(null)}>
          <div className="fb-modal-content" onClick={e => e.stopPropagation()} style={{ width: '640px' }}>
            <div className="fb-modal-header">
              <span>Photo Viewer — {profileUser.name}</span>
              <a onClick={() => setSelectedPhoto(null)} style={{ color: '#fff' }}>✕</a>
            </div>
            <div className="fb-modal-body" style={{ textAlign: 'center', background: '#111', padding: '20px' }}>
              <img src={selectedPhoto} style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain', border: '1px solid #333' }} alt="" />
            </div>
            <div className="fb-modal-footer">
              {isSelf && selectedPhoto !== profileUser.avatar && (
                <button className="fb-btn fb-btn-primary" onClick={() => handleSetProfilePic(selectedPhoto)}>
                  <Check size={11} /> Make Profile Picture
                </button>
              )}
              <button className="fb-btn fb-btn-default" onClick={() => setSelectedPhoto(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
