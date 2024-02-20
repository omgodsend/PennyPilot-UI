// src/components/Login.tsx

import React, { useState, FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Define a type for your error to avoid using 'any'
interface LoginError {
  message: string;
}

const Login: FunctionComponent = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/v1/pennypilot/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) throw new Error('Login failed');
      
      const authToken = response.headers.get('Authorization');
      if (!authToken) throw new Error('Token not found');
      
      const token = authToken.startsWith('Bearer') ? authToken.slice('Bearer'.length).trim() : authToken;
  
      await login(token);
      navigate('/dashboard');
    } catch (error) {
      const typedError = error as LoginError;
      setError(typedError.message);    
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
