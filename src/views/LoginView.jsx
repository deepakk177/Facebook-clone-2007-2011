import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { db } from '../services/db';

export const LoginView = () => {
  const { switchUser, navigateTo, refreshDb } = useApp();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthDay: '1',
    birthMonth: 'Jan',
    birthYear: '1995',
    gender: 'male'
  });

  const handleInlineLogin = (e) => {
    e.preventDefault();
    if (!loginEmail.trim()) return;

    // Check if user exists by email, or log in as Mark Zuck
    const foundUser = db.getUsers().find(u => u.email.toLowerCase() === loginEmail.toLowerCase().trim());
    if (foundUser) {
      switchUser(foundUser.id);
    } else {
      // Default to Mark Zuck for testing if email not found
      switchUser('user_zuck');
    }
    navigateTo('feed');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!signupForm.firstName.trim() || !signupForm.email.trim()) {
      alert('Please fill out your name and email address.');
      return;
    }

    const newUser = db.createUser({
      firstName: signupForm.firstName,
      lastName: signupForm.lastName,
      email: signupForm.email,
      hometown: 'Palo Alto, CA',
      avatar: signupForm.gender === 'female' ? '/assets/imgs/2.jpg' : '/assets/imgs/1.jpg'
    });

    switchUser(newUser.id);
    navigateTo('feed');
    refreshDb();
  };

  return (
    <div className="fb-login-page">
      {/* Header Bar with Inline Login */}
      <header className="fb-login-header">
        <div className="fb-container fb-login-header-inner">
          <div className="fb-logo" style={{ fontSize: '32px' }}>
            facebook
          </div>

          <form onSubmit={handleInlineLogin} className="fb-login-form-inline">
            <div className="fb-login-field-group">
              <label>Email Address</label>
              <input
                type="text"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                placeholder="zuck@facebook.com"
              />
            </div>
            <div className="fb-login-field-group">
              <label>Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="fb-btn fb-btn-primary" style={{ height: '24px' }}>
              Log In
            </button>
          </form>
        </div>
      </header>

      {/* Main Container */}
      <div className="fb-container fb-login-main">
        <div className="fb-login-grid">
          {/* Left Column: Nostalgic Text & Globe */}
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#0e385f', lineHeight: '1.3', marginBottom: '20px' }}>
              Facebook helps you connect and share with the people in your life.
            </h2>
            <img src="/assets/imgs/globe.png" alt="World Map" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
          </div>

          {/* Right Column: Sign Up Form */}
          <div className="fb-signup-card">
            <div className="fb-signup-title">Create a new account</div>
            <div className="fb-signup-sub">It's free and always will be.</div>

            <form onSubmit={handleSignup}>
              <div className="fb-form-row">
                <input
                  type="text"
                  className="fb-form-control"
                  placeholder="First Name"
                  value={signupForm.firstName}
                  onChange={e => setSignupForm({ ...signupForm, firstName: e.target.value })}
                  required
                />
                <input
                  type="text"
                  className="fb-form-control"
                  placeholder="Last Name"
                  value={signupForm.lastName}
                  onChange={e => setSignupForm({ ...signupForm, lastName: e.target.value })}
                  required
                />
              </div>

              <div className="fb-form-row">
                <input
                  type="email"
                  className="fb-form-control"
                  placeholder="Email Address"
                  value={signupForm.email}
                  onChange={e => setSignupForm({ ...signupForm, email: e.target.value })}
                  required
                />
              </div>

              <div className="fb-form-row">
                <input
                  type="password"
                  className="fb-form-control"
                  placeholder="New Password"
                  value={signupForm.password}
                  onChange={e => setSignupForm({ ...signupForm, password: e.target.value })}
                  required
                />
              </div>

              <div style={{ margin: '10px 0' }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Birthday</div>
                <div className="fb-form-row">
                  <select
                    className="fb-form-control"
                    value={signupForm.birthMonth}
                    onChange={e => setSignupForm({ ...signupForm, birthMonth: e.target.value })}
                  >
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <select
                    className="fb-form-control"
                    value={signupForm.birthDay}
                    onChange={e => setSignupForm({ ...signupForm, birthDay: e.target.value })}
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <select
                    className="fb-form-control"
                    value={signupForm.birthYear}
                    onChange={e => setSignupForm({ ...signupForm, birthYear: e.target.value })}
                  >
                    {Array.from({ length: 50 }, (_, i) => 2011 - i).map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ margin: '10px 0', fontSize: '12px' }}>
                <label style={{ marginRight: '15px' }}>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={signupForm.gender === 'female'}
                    onChange={e => setSignupForm({ ...signupForm, gender: e.target.value })}
                  /> Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={signupForm.gender === 'male'}
                    onChange={e => setSignupForm({ ...signupForm, gender: e.target.value })}
                  /> Male
                </label>
              </div>

              <div style={{ fontSize: '10px', color: '#777', margin: '10px 0' }}>
                By clicking Create Account, you agree to our Terms and confirm that you have read our Data Policy.
              </div>

              <button type="submit" className="fb-btn fb-btn-success" style={{ fontSize: '14px', padding: '8px 20px' }}>
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
