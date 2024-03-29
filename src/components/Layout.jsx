/** @format */

import { AppBar, Button, createTheme, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import DashboardPage from '../pages/DashboardPage';
import { ClientContext } from '../context/ClientContext';
import { useContext } from 'react';
import { MachineContext } from '../context/MachineContext';
let theme = createTheme();
const Layout = () => {
  const { setClientID } = useContext(ClientContext);
  const { setMachineID } = useContext(MachineContext);
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = () => {
    localStorage.clear();
    setMachineID(null)
    setClientID(null)
    navigate('/login');
  };
  return (
    <>
      <AppBar position='static' sx={{ bgcolor: 'white' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={Logo} alt='Iamredapple Logo' style={{ width: '50px', marginRight: '1rem' }} />
            {!isMobile && (
              <Typography sx={{ fontSize: '2vh', fontWeight: 'bold', color: 'rgba(0,0,0,0.8)' }}>
                Red Apple
              </Typography>
            )}
          </div>
          <Typography
            component='div'
            sx={{
              fontSize: { xs: '2vh', sm: '3vh', md: '3.5vh' },
              color: 'black',
              fontWeight: 'bold',
              textDecoration: 'underline',
            }}>
            Filter Inspection
          </Typography>
          <Button variant='contained' sx={{ fontSize: '1.5vh' }} onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div>
        <DashboardPage />
      </div>
    </>
  );
};

export default Layout;
