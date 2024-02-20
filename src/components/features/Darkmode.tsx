import React from 'react';
import { ActionIcon, useMantineColorScheme, Box } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

const Darkmode = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Box p="md" style={{ position: 'absolute', top: 0, right: 0, padding: '10px' }}>
      <ActionIcon
        onClick={toggleColorScheme}
        size="lg"
        title="Toggle color scheme"
      >
        {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
      </ActionIcon>
    </Box>
  );
};

export default Darkmode;
