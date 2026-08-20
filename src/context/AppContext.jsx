import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../services/db';
import confetti from 'canvas-confetti';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activeUserId, setActiveUserId] = useState('user_meera_sen');
  const [currentView, setCurrentView] = useState('feed'); // feed, profile, friends, search, login
  const [viewParam, setViewParam] = useState(null); // profile user ID or sub-tab
  const [searchQuery, setSearchQuery] = useState('');
  const [dbVersion, setDbVersion] = useState(0);

  // Helper trigger to refresh UI after DB updates
  const refreshDb = () => {
    setDbVersion(prev => prev + 1);
  };

  const activeUser = db.getUser(activeUserId) || db.getUsers()[0];

  // Actions
  const switchUser = (userId) => {
    const u = db.getUser(userId);
    if (u) {
      setActiveUserId(userId);
      refreshDb();
    }
  };

  const navigateTo = (view, param = null) => {
    setCurrentView(view);
    setViewParam(param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const createPost = (content, mediaUrl = null, targetUserId = null) => {
    const post = db.addPost(activeUserId, content, mediaUrl, targetUserId);
    refreshDb();
    return post;
  };

  const deletePost = (postId) => {
    db.deletePost(postId, activeUserId);
    refreshDb();
  };

  const toggleLike = (postId) => {
    db.toggleLike(postId, activeUserId);
    refreshDb();
  };

  const addComment = (postId, text) => {
    db.addComment(postId, activeUserId, text);
    refreshDb();
  };

  const sendFriendRequest = (toId) => {
    db.sendFriendRequest(activeUserId, toId);
    refreshDb();
  };

  const acceptFriendRequest = (fromId) => {
    db.acceptFriendRequest(activeUserId, fromId);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    refreshDb();
  };

  const rejectFriendRequest = (fromId) => {
    db.rejectFriendRequest(activeUserId, fromId);
    refreshDb();
  };

  const pokeUser = (toId) => {
    db.pokeUser(activeUserId, toId);
    refreshDb();
  };

  const resetDatabase = () => {
    db.reset();
    setActiveUserId('user_meera_sen');
    setCurrentView('feed');
    refreshDb();
  };

  const updateUserProfile = (userId, updates) => {
    db.updateUser(userId, updates);
    refreshDb();
  };

  const notifications = db.getNotifications(activeUserId);
  const unreadNotifCount = notifications.filter(n => !n.read).length;
  const pendingRequests = activeUser ? activeUser.pendingRequests : [];
  const pokes = db.getPokes(activeUserId);

  return (
    <AppContext.Provider value={{
      activeUserId,
      activeUser,
      switchUser,
      currentView,
      viewParam,
      navigateTo,
      searchQuery,
      setSearchQuery,
      dbVersion,
      refreshDb,
      createPost,
      deletePost,
      toggleLike,
      addComment,
      sendFriendRequest,
      acceptFriendRequest,
      rejectFriendRequest,
      pokeUser,
      resetDatabase,
      updateUserProfile,
      notifications,
      unreadNotifCount,
      pendingRequests,
      pokes,
      allUsers: db.getUsers()
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
