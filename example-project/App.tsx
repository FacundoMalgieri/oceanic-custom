import React, { useState, useEffect } from 'react';
import { UserProfile } from './types';
import './App.scss';

/**
 * Main application component showcasing the Oceanic Custom theme
 * Features beautiful syntax highlighting and consistent UI styling
 */
const App: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Mock user data for demo purposes
  useEffect(() => {
    const mockUsers: UserProfile[] = [
      {
        id: 1,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        role: 'admin',
        active: true,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
        createdAt: new Date('2024-01-15'),
        preferences: { theme: 'oceanic', notifications: true, language: 'en', timezone: 'UTC' }
      },
      {
        id: 2,
        name: 'Bob Smith',
        email: 'bob@example.com',
        role: 'moderator',
        active: true,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
        createdAt: new Date('2024-02-20'),
        preferences: { theme: 'dark', notifications: false, language: 'en', timezone: 'UTC' }
      },
      {
        id: 3,
        name: 'Carol Davis',
        email: 'carol@example.com',
        role: 'user',
        active: false,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol',
        createdAt: new Date('2024-03-10'),
        preferences: { theme: 'light', notifications: true, language: 'es', timezone: 'UTC' }
      }
    ];

    // Simulate loading delay
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const handleUserClick = (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      alert(`Selected user: ${user.name} (${user.email})`);
    }
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }


  return (
    <div className="app">
      <header className="app-header">
        <h1>🌊 Oceanic Custom Theme Demo</h1>
        <p>Beautiful syntax highlighting for modern development</p>
      </header>

      <main className="user-list">
        {users.map((user) => (
          <div
            key={user.id}
            className={`user-card ${user.active ? 'active' : 'inactive'}`}
            onClick={() => handleUserClick(user.id)}
          >
            <div className="user-avatar">
              <img src={user.avatar} alt={`${user.name}'s avatar`} />
            </div>
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <span className="user-role">{user.role}</span>
            </div>
          </div>
        ))}
      </main>

      <footer className="app-footer">
        <p>© 2024 Oceanic Custom Theme - Created with ❤️</p>
      </footer>
    </div>
  );
};

export default App;
