import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SidebarProvider } from './context/SidebarContext';
import AppContent from './AppContent';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <SidebarProvider>
          <AppContent />
        </SidebarProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
