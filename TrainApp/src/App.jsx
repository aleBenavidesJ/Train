import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Grid, Tabs, Tab, Stack } from '@mui/material';
import Flow from './components/Flow';
import AdminFlow from './components/AdminFlow';
import LoginFlow from './components/LoginFlow';
import RegisterFlow from './components/RegisterFlow';
import BoleteriaFlow from './components/BoleteriaFlow';

const App = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [data, setData] = useState({ nodes: [], edges: [] });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState('home');

  useEffect(() => {
    const savedNodes = JSON.parse(localStorage.getItem('nodes')) || [];
    const savedEdges = JSON.parse(localStorage.getItem('edges')) || [];
    setData({ nodes: savedNodes, edges: savedEdges });
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const updateNodes = (newNodes) => {
    setData((prevData) => ({
      ...prevData,
      nodes: newNodes,
    }));
    localStorage.setItem('nodes', JSON.stringify(newNodes));
  };

  const updateEdges = (newEdges) => {
    setData((prevData) => ({
      ...prevData,
      edges: newEdges,
    }));
    localStorage.setItem('edges', JSON.stringify(newEdges));
  };

  const handleLogin = () => {
    setView('login');
  };

  const handleRegister = () => {
    setView('register');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setView('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView('home');
  };

  const handleBackToHome = () => {
    setView('home');
  };

  if (view === 'login') {
    return <LoginFlow onLoginSuccess={handleLoginSuccess} onBackToHome={handleBackToHome} onRegister={handleRegister} />;
  }

  if (view === 'register') {
    return <RegisterFlow onBackToHome={handleBackToHome} onLogin={handleLogin} />;
  }

  return (
    <Stack p={4} gap={4} height='100%'>
      <Stack direction='row' justifyContent='space-between' p={1}>
        <Typography variant='h4'>
          Train App
        </Typography>
        <Box>
          <Button variant='contained' onClick={handleLogin} sx={{ mr: 2 }}>
            Login
          </Button>
          {isLoggedIn && (
            <Button variant='contained' onClick={handleLogout} sx={{ bgcolor: 'red', '&:hover': { bgcolor: 'darkred' } }}>
              Log Out
            </Button>
          )}
        </Box>
      </Stack>
      <Grid container spacing={8} height='100%'>
        <Grid item xs={8}>
          {tabIndex === 0 && <Flow data={data} />}
          {tabIndex === 1 && (
            <AdminFlow
              data={data}
              updateNodes={updateNodes}
              updateEdges={updateEdges}
            />
          )}
          {tabIndex === 2 && (
            <div>
              <Typography variant="h6">Comprar Boletos</Typography>
              <BoleteriaFlow />
            </div>
          )}
          {tabIndex === 3 && <Typography variant="h6">zzzzzz</Typography>}
        </Grid>
        <Grid item xs={4}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            orientation="vertical"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Mapa de Rutas" />
            <Tab label="Administrar Rutas" />
            <Tab label="Comprar tiquetes" />
            <Tab label="Visualizar reservaciones" />
          </Tabs>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default App;
