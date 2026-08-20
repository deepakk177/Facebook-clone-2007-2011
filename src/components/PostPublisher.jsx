import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Edit3, Image, Send, Upload } from 'lucide-react';

export const PostPublisher = ({ targetUser = null }) => {
  const { activeUser, createPost } = useApp();
  const [activeTab, setActiveTab] = useState('status'); // status, photo
  const [statusText, setStatusText] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [showMediaInput, setShowMediaInput] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!statusText.trim() && !mediaUrl) return;

    createPost(statusText || 'Shared a photo', mediaUrl.trim() || null, targetUser ? targetUser.id : null);
    setStatusText('');
    setMediaUrl('');
    setShowMediaInput(false);
  };

  const isWallPost = targetUser && targetUser.id !== activeUser.id;

  return (
    <div className="fb-publisher-card">
      <div className="fb-publisher-tabs">
        <button
          type="button"
          className={`fb-publisher-tab ${activeTab === 'status' ? 'active' : ''}`}
          onClick={() => { setActiveTab('status'); setShowMediaInput(false); }}
        >
          <Edit3 size={12} /> {isWallPost ? `Wall Post for ${targetUser.firstName}` : 'Update Status'}
        </button>
        <button
          type="button"
          className={`fb-publisher-tab ${activeTab === 'photo' ? 'active' : ''}`}
          onClick={() => { setActiveTab('photo'); setShowMediaInput(true); }}
        >
          <Image size={12} /> Add Photo
        </button>
      </div>

      <form onSubmit={handleSubmit} className="fb-publisher-body">
        {!isWallPost && (
          <div className="fb-publisher-status-prefix">
            {activeUser.name} <span style={{ fontWeight: 'normal', color: '#555' }}>is</span>
          </div>
        )}

        <textarea
          className="fb-publisher-textarea"
          placeholder={
            isWallPost
              ? `Write something on ${targetUser.name}'s Wall...`
              : "What's on your mind?"
          }
          value={statusText}
          onChange={(e) => setStatusText(e.target.value)}
        />

        {(activeTab === 'photo' || showMediaInput) && (
          <div style={{ marginTop: '10px', background: '#fafafa', border: '1px solid #e5e5e5', padding: '10px' }}>
            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#3b5998', marginBottom: '6px' }}>
              CHOOSE OR UPLOAD A PHOTO:
            </div>

            {/* Native File Upload Input */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <label className="fb-btn fb-btn-default" style={{ fontSize: '11px', cursor: 'pointer' }}>
                <Upload size={12} /> Browse Computer...
                <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
              </label>
              <span style={{ fontSize: '10px', color: '#666' }}>
                {mediaUrl ? (mediaUrl.startsWith('data:') ? 'Photo loaded from computer!' : 'Image link attached') : 'Select image file'}
              </span>
            </div>

            {/* URL Input */}
            <input
              type="text"
              className="fb-input-url"
              placeholder="Or paste image URL (e.g. https://...)"
              value={mediaUrl.startsWith('data:') ? '[Local Image Selected]' : mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
            />

            {/* Image Preview */}
            {mediaUrl && (
              <div style={{ marginTop: '8px', position: 'relative', display: 'inline-block' }}>
                <img src={mediaUrl} style={{ maxHeight: '120px', borderRadius: '3px', border: '1px solid #ccc' }} alt="Preview" />
                <button
                  type="button"
                  onClick={() => setMediaUrl('')}
                  style={{ position: 'absolute', top: -5, right: -5, background: '#d9534f', color: '#fff', border: 'none', borderRadius: '50%', width: 18, height: 18, fontSize: '10px', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        )}

        <div className="fb-publisher-footer">
          <div style={{ fontSize: '10px', color: '#777' }}>
            {isWallPost ? `Target: ${targetUser.name}'s Wall` : 'Visible to: Everyone (Public)'}
          </div>
          <button type="submit" className="fb-btn fb-btn-primary" disabled={!statusText.trim() && !mediaUrl}>
            <Send size={11} /> Share
          </button>
        </div>
      </form>
    </div>
  );
};
