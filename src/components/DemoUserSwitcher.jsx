import React from 'react';
import { useApp } from '../context/AppContext';
import { db } from '../services/db';
import { Users, RotateCcw } from 'lucide-react';

export const DemoUserSwitcher = () => {
  const { activeUserId, switchUser, allUsers, resetDatabase } = useApp();

  return (
    <div className="fb-demo-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
        <Users size={14} />
        <strong>2007 Multi-User Switcher:</strong>
        <span style={{ opacity: 0.8 }}>(Switch profiles to test wall posts, friend requests, and pokes)</span>
      </div>

      <div className="fb-demo-user-list">
        {allUsers.map(user => {
          const isActive = user.id === activeUserId;
          const userNotifs = db.getNotifications(user.id).filter(n => !n.read).length;
          const pendingReqs = user.pendingRequests.length;

          return (
            <button
              key={user.id}
              className={`fb-demo-user-chip ${isActive ? 'active' : ''}`}
              onClick={() => switchUser(user.id)}
            >
              <img src={user.avatar} style={{ width: 18, height: 18, borderRadius: 2, objectFit: 'cover' }} alt="" />
              <span>{user.firstName}</span>
              {(userNotifs > 0 || pendingReqs > 0) && (
                <span style={{ background: '#dc0d17', color: '#fff', fontSize: '8px', padding: '0 4px', borderRadius: '3px', marginLeft: '2px' }}>
                  {userNotifs + pendingReqs}
                </span>
              )}
            </button>
          );
        })}

        <button
          onClick={resetDatabase}
          className="fb-btn fb-btn-default"
          style={{ fontSize: '10px', padding: '2px 6px', marginLeft: '10px' }}
          title="Reset database to default seed state"
        >
          <RotateCcw size={10} /> Reset Data
        </button>
      </div>
    </div>
  );
};
