import React from 'react';
import { useApp } from '../context/AppContext';
import { Rss, User, Users, Image, Settings, RefreshCw, MessageSquare } from 'lucide-react';

export const Sidebar = () => {
  const { activeUser, currentView, viewParam, navigateTo, pendingRequests, resetDatabase } = useApp();

  const isFeed = currentView === 'feed';
  const isMyProfile = currentView === 'profile' && (viewParam === null || viewParam === activeUser.id);
  const isFriends = currentView === 'friends';

  return (
    <aside>
      {/* User Mini Profile Block */}
      <div className="fb-sidebar-box">
        <div className="fb-sidebar-user-block">
          <img src={activeUser.avatar} className="fb-sidebar-avatar" alt="" />
          <div>
            <div style={{ fontWeight: 'bold', color: '#3b5998', fontSize: '12px' }}>{activeUser.name}</div>
            <a onClick={() => navigateTo('profile', activeUser.id)} style={{ fontSize: '10px' }}>
              Edit My Profile
            </a>
          </div>
        </div>

        {/* Navigation Section */}
        <ul className="fb-sidebar-menu">
          <li className={`fb-sidebar-item ${isFeed ? 'active' : ''}`}>
            <a onClick={() => navigateTo('feed')}>
              <Rss size={13} color="#3b5998" /> News Feed
            </a>
          </li>
          <li className={`fb-sidebar-item ${isMyProfile ? 'active' : ''}`}>
            <a onClick={() => navigateTo('profile', activeUser.id)}>
              <User size={13} color="#3b5998" /> My Wall & Profile
            </a>
          </li>
          <li className={`fb-sidebar-item ${isFriends ? 'active' : ''}`}>
            <a onClick={() => navigateTo('friends')}>
              <Users size={13} color="#3b5998" /> Friends
              {pendingRequests.length > 0 && (
                <span className="fb-badge" style={{ position: 'static', marginLeft: 'auto' }}>
                  {pendingRequests.length}
                </span>
              )}
            </a>
          </li>
          <li className="fb-sidebar-item">
            <a onClick={() => navigateTo('profile', activeUser.id)}>
              <Image size={13} color="#3b5998" /> Photos
            </a>
          </li>
        </ul>

        <div className="fb-sidebar-section-title">APPLICATIONS</div>
        <ul className="fb-sidebar-menu">
          <li className="fb-sidebar-item">
            <a onClick={() => navigateTo('feed')}>
              <MessageSquare size={13} color="#666" /> Pokes & Requests
            </a>
          </li>
          <li className="fb-sidebar-item">
            <a onClick={() => resetDatabase()} title="Re-seed initial demo database">
              <RefreshCw size={13} color="#d9534f" /> Reset Demo Data
            </a>
          </li>
        </ul>
      </div>

      {/* Network Badge Card */}
      <div className="fb-sidebar-box" style={{ padding: '10px', fontSize: '10px', color: '#666' }}>
        <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '4px' }}>PRIMARY NETWORK</div>
        <div>{activeUser.network}</div>
        <div style={{ marginTop: '8px', borderTop: '1px solid #eee', paddingTop: '6px', fontSize: '9px', color: '#888' }}>
          Facebook © 2007-2011<br/>All rights reserved.
        </div>
      </div>
    </aside>
  );
};
