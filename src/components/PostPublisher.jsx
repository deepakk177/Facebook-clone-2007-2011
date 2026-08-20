import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Edit3, Image, Link, Send } from 'lucide-react';

export const PostPublisher = ({ targetUser = null }) => {
  const { activeUser, createPost } = useApp();
  const [activeTab, setActiveTab] = useState('status'); // status, photo
  const [statusText, setStatusText] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [showMediaInput, setShowMediaInput] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!statusText.trim()) return;

    createPost(statusText, mediaUrl.trim() || null, targetUser ? targetUser.id : null);
    setStatusText('');
    setMediaUrl('');
    setShowMediaInput(false);
  };

  const isWallPost = targetUser && targetUser.id !== activeUser.id;

  return (
    <div className="fb-publisher-card">
      <div className="fb-publisher-tabs">
        <button
          className={`fb-publisher-tab ${activeTab === 'status' ? 'active' : ''}`}
          onClick={() => { setActiveTab('status'); setShowMediaInput(false); }}
        >
          <Edit3 size={12} /> {isWallPost ? `Wall Post for ${targetUser.firstName}` : 'Update Status'}
        </button>
        <button
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
          <div style={{ marginTop: '8px' }}>
            <div style={{ fontSize: '10px', color: '#666', marginBottom: '2px' }}>IMAGE URL OR PRESET:</div>
            <input
              type="text"
              className="fb-input-url"
              placeholder="Paste image URL (e.g. https://... or /assets/imgs/globe.png)"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
            />
            <div style={{ display: 'flex', gap: '5px', marginTop: '4px' }}>
              <button
                type="button"
                className="fb-btn fb-btn-default"
                style={{ fontSize: '9px' }}
                onClick={() => setMediaUrl('/assets/imgs/globe.png')}
              >
                Preset 1 (Globe)
              </button>
              <button
                type="button"
                className="fb-btn fb-btn-default"
                style={{ fontSize: '9px' }}
                onClick={() => setMediaUrl('/assets/imgs/wall.jpg')}
              >
                Preset 2 (Wall)
              </button>
            </div>
          </div>
        )}

        <div className="fb-publisher-footer">
          <div style={{ fontSize: '10px', color: '#777' }}>
            {isWallPost ? `Target: ${targetUser.name}'s Wall` : 'Visible to: Everyone (Public)'}
          </div>
          <button type="submit" className="fb-btn fb-btn-primary" disabled={!statusText.trim()}>
            <Send size={11} /> Share
          </button>
        </div>
      </form>
    </div>
  );
};
