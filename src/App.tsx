import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { createTheme, MantineTheme, MantineProvider, MantineThemeOverride } from '@mantine/core';
import './App.css';
import '@mantine/core/styles.css';

// Import your components
import Welcome from './components/startup/Welcome'; // Ensure you have a Welcome component
import Login from './components/auth/Login'; // Your Login component
import Register from './components/startup/Register'; // Your Register component, previously Startup
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import {NavbarMinimal} from './components/Navbar'
import Darkmode from './components/features/Darkmode';
import { AuthProvider, useAuth } from './components/auth/AuthContext';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Transactions from './pages/Transactions';

export const queryClient = new QueryClient();

const theme: MantineThemeOverride = createTheme({
  primaryColor: 'teal',
  fontFamily: 'Open Sans, sans-serif'
});

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <MantineProvider theme={theme}>
        <Darkmode />
        <QueryClientProvider client={queryClient}>
          <div style={{display:'flex'}}>
          {isLoggedIn && <NavbarMinimal />}
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {isLoggedIn ? (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/account" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />


              </>
            ) : (
              <Route path="*" element={<Navigate replace to="/" />} />
            )}
              </Routes>
          </div>
        </QueryClientProvider>
      </MantineProvider>
    </Router>
  );
}

export default App;
