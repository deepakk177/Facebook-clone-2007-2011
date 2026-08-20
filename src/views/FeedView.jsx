import React from 'react';
import { useApp } from '../context/AppContext';
import { db } from '../services/db';
import { Sidebar } from '../components/Sidebar';
import { PostPublisher } from '../components/PostPublisher';
import { PostCard } from '../components/PostCard';
import { Hand, UserPlus, Sparkles, Check, X } from 'lucide-react';

export const FeedView = () => {
  const { activeUser, pokeUser, acceptFriendRequest, rejectFriendRequest, pokes, navigateTo, allUsers, sendFriendRequest } = useApp();

  const posts = db.getPosts();

  // Find suggested friends (users not yet friends with activeUser)
  const suggested = allUsers.filter(u =>
    u.id !== activeUser.id &&
    !activeUser.friends.includes(u.id) &&
    !u.pendingRequests.includes(activeUser.id)
  );

  return (
    <div className="fb-container fb-main-body">
      <div className="fb-grid-3col">
        {/* Left Column Sidebar */}
        <Sidebar />

        {/* Middle Main Feed */}
        <main>
          {/* Status Publisher */}
          <PostPublisher />

          {/* Posts Feed Header */}
          <div style={{ background: '#6d84b4', color: '#fff', padding: '6px 10px', fontWeight: 'bold', fontSize: '11px', marginBottom: '10px' }}>
            News Feed — Recent Updates
          </div>

          {posts.length === 0 ? (
            <div className="fb-widget-box" style={{ textAlign: 'center', padding: '30px', color: '#777' }}>
              No posts in your feed yet. Be the first to share an update above!
            </div>
          ) : (
            posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </main>

        {/* Right Sidebar Widgets */}
        <aside>
          {/* Pokes Widget */}
          {pokes.length > 0 && (
            <div className="fb-widget-box" style={{ background: '#fff9e6', borderColor: '#f0c040' }}>
              <div className="fb-widget-title" style={{ color: '#8a6d3b' }}>
                <span><Hand size={12} /> POKES ({pokes.length})</span>
              </div>
              {pokes.map(poke => {
                const poker = db.getUser(poke.fromId);
                if (!poker) return null;
                return (
                  <div key={poke.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0', fontSize: '11px' }}>
                    <div>
                      <a style={{ fontWeight: 'bold' }} onClick={() => navigateTo('profile', poker.id)}>{poker.name}</a> poked you.
                    </div>
                    <button className="fb-btn fb-btn-success" style={{ fontSize: '10px', padding: '2px 6px' }} onClick={() => pokeUser(poker.id)}>
                      Poke Back
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pending Friend Requests */}
          {activeUser.pendingRequests.length > 0 && (
            <div className="fb-widget-box">
              <div className="fb-widget-title">
                <span><UserPlus size={12} /> FRIEND REQUESTS ({activeUser.pendingRequests.length})</span>
              </div>
              {activeUser.pendingRequests.map(reqId => {
                const reqUser = db.getUser(reqId);
                if (!reqUser) return null;
                return (
                  <div key={reqId} style={{ display: 'flex', gap: '8px', padding: '6px 0', borderBottom: '1px solid #eee' }}>
                    <img src={reqUser.avatar} style={{ width: 36, height: 36, objectFit: 'cover' }} alt="" />
                    <div style={{ flex: 1 }}>
                      <a style={{ fontWeight: 'bold' }} onClick={() => navigateTo('profile', reqId)}>{reqUser.name}</a>
                      <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                        <button className="fb-btn fb-btn-success" style={{ fontSize: '9px', padding: '1px 5px' }} onClick={() => acceptFriendRequest(reqId)}>
                          <Check size={9} /> Confirm
                        </button>
                        <button className="fb-btn fb-btn-default" style={{ fontSize: '9px', padding: '1px 5px' }} onClick={() => rejectFriendRequest(reqId)}>
                          <X size={9} /> Ignore
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* People You May Know */}
          {suggested.length > 0 && (
            <div className="fb-widget-box">
              <div className="fb-widget-title">
                <span>PEOPLE YOU MAY KNOW</span>
              </div>
              {suggested.slice(0, 3).map(u => (
                <div key={u.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f2f2f2' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src={u.avatar} style={{ width: 32, height: 32, objectFit: 'cover' }} alt="" />
                    <div>
                      <a style={{ fontWeight: 'bold', fontSize: '11px' }} onClick={() => navigateTo('profile', u.id)}>{u.name}</a>
                      <div style={{ fontSize: '9px', color: '#777' }}>{u.network}</div>
                    </div>
                  </div>
                  <button className="fb-btn fb-btn-default" style={{ fontSize: '9px', padding: '2px 5px' }} onClick={() => sendFriendRequest(u.id)}>
                    + Add Friend
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Retro Facebook Ad Card */}
          <div className="fb-widget-box" style={{ background: '#fcfcfc' }}>
            <div className="fb-widget-title" style={{ fontSize: '10px', color: '#888' }}>SPONSORED</div>
            <div style={{ fontWeight: 'bold', color: '#3b5998', fontSize: '11px', marginBottom: '4px' }}>
              Welcome to 2007-2011 Facebook!
            </div>
            <p style={{ fontSize: '10px', color: '#555', lineHeight: '1.3' }}>
              Experience authentic classic Wall posts, real-time pokes, instant friend search, and notifications.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
