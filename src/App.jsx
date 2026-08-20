import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { DemoUserSwitcher } from './components/DemoUserSwitcher';
import { FeedView } from './views/FeedView';
import { ProfileView } from './views/ProfileView';
import { FriendsView } from './views/FriendsView';
import { SearchView } from './views/SearchView';
import { LoginView } from './views/LoginView';

export const App = () => {
  const { currentView, viewParam } = useApp();

  if (currentView === 'login') {
    return (
      <div>
        <LoginView />
        <DemoUserSwitcher />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#edf0f5' }}>
      <Header />

      {currentView === 'feed' && <FeedView />}
      {currentView === 'profile' && <ProfileView userId={viewParam} />}
      {currentView === 'friends' && <FriendsView />}
      {currentView === 'search' && <SearchView query={viewParam} />}

      <DemoUserSwitcher />
    </div>
  );
};

export default App;
