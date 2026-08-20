import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { db } from '../services/db';
import { Sidebar } from '../components/Sidebar';
import { PostPublisher } from '../components/PostPublisher';
import { PostCard } from '../components/PostCard';
import { UserPlus, UserCheck, Hand, Edit2, MessageSquare, Save, X, Camera, Check, Plus, Upload } from 'lucide-react';

export const ProfileView = ({ userId }) => {
  const {
    activeUser,
    activeUserId,
    sendFriendRequest,
    acceptFriendRequest,
    pokeUser,
    updateUserProfile,
    navigateTo,
    refreshDb
  } = useApp();

  const [activeTab, setActiveTab] = useState('wall'); // wall, info, photos, friends
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const [selectedPhotoObj, setSelectedPhotoObj] = useState(null);

  // New Photo Form State
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');

  const profileUser = db.getUser(userId || activeUserId) || activeUser;
  const isSelf = profileUser.id === activeUserId;
  const isFriend = activeUser.friends.includes(profileUser.id);
  const isPendingSent = profileUser.pendingRequests.includes(activeUserId);
  const isPendingReceived = activeUser.pendingRequests.includes(profileUser.id);

  // Edit form state
  const [editForm, setEditForm] = useState({
    bio: profileUser.bio || '',
    age: profileUser.age || 31,
    work: profileUser.work || '',
    phone: profileUser.phone || '',
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

  const handleFileUploadForAlbum = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhotoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhotoSubmit = (e) => {
    e.preventDefault();
    if (!newPhotoUrl) return;

    db.addPhoto(profileUser.id, newPhotoUrl, newPhotoCaption.trim() || 'New Photo');
    setNewPhotoUrl('');
    setNewPhotoCaption('');
    setShowAddPhotoModal(false);
    refreshDb();
  };

  const wallPosts = db.getPosts(profileUser.id);
  const profileFriends = profileUser.friends.map(id => db.getUser(id)).filter(Boolean);

  // Parse photos with captions
  const photoList = (profileUser.photos && profileUser.photos.length > 0)
    ? profileUser.photos.map(p => typeof p === 'string' ? { url: p, caption: '' } : p)
    : [
        { url: '/assets/imgs/1.jpg', caption: 'Photo 1' }
      ];

  const handleSetProfilePic = (imgUrl) => {
    if (confirm('Set this photo as your profile picture?')) {
      updateUserProfile(profileUser.id, { avatar: imgUrl });
      setSelectedPhotoObj(null);
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
                  {profileUser.work} • Age {profileUser.age}
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
                    <li><strong>Age:</strong> {profileUser.age}</li>
                    <li><strong>Occupation:</strong> {profileUser.work}</li>
                    <li><strong>Phone:</strong> {profileUser.phone}</li>
                    <li><strong>Relationship:</strong> {profileUser.relationship}</li>
                    <li><strong>Education:</strong> {profileUser.education}</li>
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
                      <label style={{ fontWeight: 'bold', fontSize: '11px' }}>Age:</label>
                      <input
                        type="number"
                        className="fb-form-control"
                        value={editForm.age}
                        onChange={(e) => setEditForm({ ...editForm, age: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontWeight: 'bold', fontSize: '11px' }}>Phone Number:</label>
                      <input
                        type="text"
                        className="fb-form-control"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="fb-form-row">
                    <div style={{ flex: 1 }}>
                      <label style={{ fontWeight: 'bold', fontSize: '11px' }}>Occupation / Work:</label>
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

                  <div className="fb-form-row">
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
                  <div className="fb-widget-title" style={{ fontSize: '13px' }}>BASIC & CONTACT INFORMATION</div>
                  <ul className="fb-profile-meta-list" style={{ fontSize: '12px', lineHeight: '1.8' }}>
                    <li><strong>Full Name:</strong> {profileUser.name}</li>
                    <li><strong>Age:</strong> {profileUser.age} years old</li>
                    <li><strong>Phone Number:</strong> {profileUser.phone}</li>
                    <li><strong>Relationship:</strong> {profileUser.relationship}</li>
                  </ul>

                  <div className="fb-widget-title" style={{ fontSize: '13px', marginTop: '15px' }}>OCCUPATION & EDUCATION</div>
                  <ul className="fb-profile-meta-list" style={{ fontSize: '12px', lineHeight: '1.8' }}>
                    <li><strong>Occupation:</strong> {profileUser.work}</li>
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
              <div className="fb-widget-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>PHOTOS & ALBUMS FOR {profileUser.name.toUpperCase()}</span>
                {isSelf && (
                  <button className="fb-btn fb-btn-success" onClick={() => setShowAddPhotoModal(true)}>
                    <Plus size={11} /> Add Photo
                  </button>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '12px' }}>
                {photoList.map((photoObj, i) => (
                  <div
                    key={i}
                    style={{ border: '1px solid #ccc', padding: '6px', background: '#fff', cursor: 'pointer', position: 'relative' }}
                    onClick={() => setSelectedPhotoObj(photoObj)}
                  >
                    <img src={photoObj.url} style={{ width: '100%', height: '140px', objectFit: 'contain', background: '#f0f2f5' }} alt="" />
                    <div style={{ marginTop: '5px', textAlign: 'center' }}>
                      <span style={{ fontSize: '11px', color: '#3b5998', fontWeight: 'bold' }}>
                        {photoObj.caption || `Photo ${i + 1}`}
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
                    <img src={friend.avatar} style={{ width: 45, height: 45, objectFit: 'contain', background: '#fff' }} alt="" />
                    <div>
                      <a style={{ fontWeight: 'bold', fontSize: '12px' }} onClick={() => navigateTo('profile', friend.id)}>
                        {friend.name}
                      </a>
                      <div style={{ fontSize: '10px', color: '#666' }}>{friend.work}</div>
                      <div style={{ fontSize: '9px', color: '#888' }}>{friend.friends.length} friends</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Photo Modal */}
      {showAddPhotoModal && (
        <div className="fb-modal-overlay" onClick={() => setShowAddPhotoModal(false)}>
          <div className="fb-modal-content" onClick={e => e.stopPropagation()} style={{ width: '500px' }}>
            <div className="fb-modal-header">
              <span>Add New Photo to Album</span>
              <a onClick={() => setShowAddPhotoModal(false)} style={{ color: '#fff' }}>✕</a>
            </div>
            <form onSubmit={handleAddPhotoSubmit}>
              <div className="fb-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ fontWeight: 'bold', fontSize: '11px', display: 'block', marginBottom: '4px' }}>
                    Select Image File from Computer:
                  </label>
                  <label className="fb-btn fb-btn-default" style={{ cursor: 'pointer' }}>
                    <Upload size={12} /> Browse Image File...
                    <input type="file" accept="image/*" onChange={handleFileUploadForAlbum} style={{ display: 'none' }} />
                  </label>
                </div>

                <div>
                  <label style={{ fontWeight: 'bold', fontSize: '11px', display: 'block', marginBottom: '4px' }}>
                    Or Enter Image URL:
                  </label>
                  <input
                    type="text"
                    className="fb-form-control"
                    placeholder="https://... or Data URL"
                    value={newPhotoUrl.startsWith('data:') ? '[Local File Selected]' : newPhotoUrl}
                    onChange={e => setNewPhotoUrl(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ fontWeight: 'bold', fontSize: '11px', display: 'block', marginBottom: '4px' }}>
                    Photo Caption:
                  </label>
                  <input
                    type="text"
                    className="fb-form-control"
                    placeholder="e.g. Summer Vacation, Class Project..."
                    value={newPhotoCaption}
                    onChange={e => setNewPhotoCaption(e.target.value)}
                  />
                </div>

                {newPhotoUrl && (
                  <div style={{ textAlign: 'center', marginTop: '6px' }}>
                    <img src={newPhotoUrl} style={{ maxHeight: '160px', borderRadius: '3px', border: '1px solid #ccc' }} alt="Preview" />
                  </div>
                )}
              </div>

              <div className="fb-modal-footer">
                <button type="submit" className="fb-btn fb-btn-success" disabled={!newPhotoUrl}>
                  <Upload size={11} /> Upload to Album
                </button>
                <button type="button" className="fb-btn fb-btn-default" onClick={() => setShowAddPhotoModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Photo Lightbox Modal */}
      {selectedPhotoObj && (
        <div className="fb-modal-overlay" onClick={() => setSelectedPhotoObj(null)}>
          <div className="fb-modal-content" onClick={e => e.stopPropagation()} style={{ width: '640px' }}>
            <div className="fb-modal-header">
              <span>{selectedPhotoObj.caption || 'Photo Viewer'} — {profileUser.name}</span>
              <a onClick={() => setSelectedPhotoObj(null)} style={{ color: '#fff' }}>✕</a>
            </div>
            <div className="fb-modal-body" style={{ textAlign: 'center', background: '#111', padding: '20px' }}>
              <img src={selectedPhotoObj.url} style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain', border: '1px solid #333' }} alt="" />
              {selectedPhotoObj.caption && (
                <div style={{ color: '#fff', marginTop: '10px', fontSize: '13px', fontWeight: 'bold' }}>
                  {selectedPhotoObj.caption}
                </div>
              )}
            </div>
            <div className="fb-modal-footer">
              {isSelf && selectedPhotoObj.url !== profileUser.avatar && (
                <button className="fb-btn fb-btn-primary" onClick={() => handleSetProfilePic(selectedPhotoObj.url)}>
                  <Check size={11} /> Make Profile Picture
                </button>
              )}
              <button className="fb-btn fb-btn-default" onClick={() => setSelectedPhotoObj(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
