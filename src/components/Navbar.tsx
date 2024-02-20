// Adjust the import path as needed
import { useState } from 'react';
import { Tooltip, Stack } from '@mantine/core';
import {
  IconHome2,
  IconDeviceDesktopAnalytics,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
  IconCoins
} from '@tabler/icons-react';
import classes from './NavbarMinimal.module.css';
import { useAuth } from './auth/AuthContext'; 
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function NavbarMinimal() {
  const [active, setActive] = useState(0);
  const { logout } = useAuth(); 
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/')
  };

  const handleUserSwitch = () => {
    logout();
    navigate('/login')
  }

  const links = [
    { icon: IconHome2, label: 'Home', onClick: () => setActive(0), path:"/home" },
    { icon: IconDeviceDesktopAnalytics, label: 'Dashboard', onClick: () => setActive(1), path:"/dashboard"  },
    { icon: IconCoins, label: 'Transactions', onClick: () => setActive(2), path:"/transactions" },
    { icon: IconUser, label: 'Account', onClick: () => setActive(3), path:"/account" },
    { icon: IconSettings, label: 'Settings', onClick: () => setActive(4), path:"/settings" },
    { icon: IconSwitchHorizontal, label: 'Switch User', onClick: handleUserSwitch},
    { icon: IconLogout, label: 'Logout', onClick: handleLogout }, 
  ].map((link, index) => (
    <Tooltip key={link.label} label={link.label} position="right">
      <Link to={link.path||''} onClick={link.onClick} className={`${classes.link} ${pathname === link.path? 'active':''}`} data-active={active === index || undefined}>
        <link.icon className={classes.icon} />
      </Link>
    </Tooltip>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Stack>{links}</Stack>
      </div>
    </nav>
  );
}