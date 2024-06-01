import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Grid, Tabs, Tab, Stack } from '@mui/material';
import Flow from './components/Flow';
import AdminFlow from './components/AdminFlow';

const App = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Stack p={4} gap={4} height='100%'>
      <Stack direction='row' justifyContent='space-between' p={1}>
        <Typography variant='h4'>
          Train App
        </Typography>
        <Button variant='contained'>
          Login
        </Button>
      </Stack>
      <Grid container spacing={8} height='100%'>
        <Grid item xs={8}>
          {tabIndex === 0 && <Flow data={Data} />}
          {tabIndex === 1 && <AdminFlow data={Data} />}
          {tabIndex === 2 && <Typography variant="h6">Contenido de otra pestaña</Typography>}
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
            <Tab label="Otra Pestaña" />
          </Tabs>
        </Grid>
      </Grid>
      {/* <Box sx={{ display: 'grid', gridTemplateColumns: '8fr 4fr', gap: 2, padding: 2 }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          orientation="vertical"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="vertical tabs"
        >
          <Tab label="Mapa de Rutas" />
          <Tab label="Otra Pestaña" />
        </Tabs>
        <Box>
          {tabIndex === 0 && <Flow />}
          {tabIndex === 1 && <Typography variant="h6">Contenido de otra pestaña</Typography>}
        </Box>
      </Box> */}
    </Stack>
  );
};

export default App;

const Data = {
  nodes: [
    
  ],
  edges: [
    
  ]
}