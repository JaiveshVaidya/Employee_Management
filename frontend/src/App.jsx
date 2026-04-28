import React from 'react';
import EmployeeList from './components/EmployeeList';
import { Users } from 'lucide-react';

function App() {
  return (
    <div className="app-container">
      <header className="header animate-fade-in">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ 
            backgroundColor: 'var(--primary-color)', 
            padding: '0.75rem', 
            borderRadius: '12px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Users size={28} />
          </div>
          <div>
            <h1>Nexus Business Platform</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Enterprise Resource Management System</p>
          </div>
        </div>
      </header>
      
      <main className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <EmployeeList />
      </main>
    </div>
  );
}

export default App;
