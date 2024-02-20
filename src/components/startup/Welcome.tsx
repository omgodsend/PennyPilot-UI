import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Title, Text, Group, Center } from '@mantine/core';


const Welcome = () => {
  const navigate = useNavigate();

  const isFirstTimeUser = sessionStorage.getItem('firstTimeUser') === null;

  const handleLogin = () => navigate('/login');
  const handleRegister = () => navigate('/register');

  return (
    <Center style={{ height: '100vh', width: '100vw' }}> {/* This will center the Container vertically and horizontally */}
    <div style={{ width: '100%', maxWidth: '600px' }}> {/* You can set a max-width for better layout control */}
      <Title size={"35"} align="center">Welcome to Penny Pilot!</Title>
      <Text size="sm" align="center" mt="sm">
        {isFirstTimeUser ? "Let's get started by creating an account." : "Welcome back! Please log in."}
      </Text>
      <Center mt="lg"> {/* Center the button */}
        <Button onClick={handleRegister}>Register</Button>
      </Center>
      <Center mt="xl">
        <Text>Already a member?</Text>
        <Button onClick={handleLogin} ml={10} variant="outline">Login</Button>
      </Center>
    </div>
  </Center>

  );
};

export default Welcome;
