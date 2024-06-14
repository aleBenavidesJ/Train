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
  const [userType, setUserType] = useState(null);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const savedNodes = JSON.parse(localStorage.getItem('nodes')) || [];
    const savedEdges = JSON.parse(localStorage.getItem('edges')) || [];
    setData({ nodes: savedNodes, edges: savedEdges });
  }, []);

  const handleTabChange = (event, newValue) => {
    if ((userType === 'admin' && (newValue === 0 || newValue === 1 || newValue === 3)) || 
        (userType === 'user' && (newValue === 0 || newValue === 2)) || 
        (!isLoggedIn && newValue === 0)) {
      setTabIndex(newValue);
    }
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

  const handleLoginSuccess = (type) => {
    setIsLoggedIn(true);
    setUserType(type);
    setView('home');
    setTabIndex(0); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setView('home');
    setTabIndex(0); 
  };

  const handleBackToHome = () => {
    setView('home');
    setTabIndex(0); 
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
          {isLoggedIn && userType === 'admin' && tabIndex === 1 && (
            <AdminFlow
              data={data}
              updateNodes={updateNodes}
              updateEdges={updateEdges}
              setConnections={setConnections}
            />
          )}
          {isLoggedIn && userType === 'user' && tabIndex === 2 && (
            <div>
              <Typography variant="h6">Comprar Boletos</Typography>
              <BoleteriaFlow connections={connections} />
            </div>
          )}
          {isLoggedIn && userType === 'admin' && tabIndex === 3 && (
            <Typography variant="h6">zzzzzz</Typography>
          )}
        </Grid>
        <Grid item xs={4}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            orientation="vertical"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Mapa de Rutas" value={0} />
            {isLoggedIn && userType === 'admin' && <Tab label="Administrar Rutas" value={1} />}
            {isLoggedIn && userType === 'user' && <Tab label="Comprar boletos" value={2} />}
            {isLoggedIn && userType === 'admin' && <Tab label="Visualizar reservaciones" value={3} />}
          </Tabs>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default App;
