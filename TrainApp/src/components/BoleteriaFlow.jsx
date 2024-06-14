import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, MenuItem } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const BoleteriaFlow = ({ connections }) => {
  const [desde, setDesde] = useState('');
  const [hacia, setHacia] = useState('');
  const [fecha, setFecha] = useState(null);
  const [cantidad, setCantidad] = useState(0);

  const [sourceNodes, setSourceNodes] = useState([]);
  const [targetNodes, setTargetNodes] = useState([]);

  useEffect(() => {
    if (connections && connections.length > 0) {
      setSourceNodes([...new Set(connections.map(connection => connection.source))]);
    }
  }, [connections]);

  useEffect(() => {
    if (desde) {
      setTargetNodes(connections.filter(connection => connection.source === desde).map(connection => connection.target));
    } else {
      setTargetNodes([]);
    }
  }, [desde, connections]);

  const handleAddTickets = () => {
    console.log('Agregar boletos:', { desde, hacia, fecha, cantidad });
  };

  return (
    <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 2 }}>
      <TextField
        select
        label="Desde"
        value={desde}
        onChange={(e) => {
          setDesde(e.target.value);
          setHacia('');
        }}
        fullWidth
        margin="normal"
      >
        {sourceNodes.map((node) => (
          <MenuItem key={node} value={node}>
            {node}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Hacia"
        value={hacia}
        onChange={(e) => setHacia(e.target.value)}
        fullWidth
        margin="normal"
        disabled={!desde}
      >
        {targetNodes.map((node) => (
          <MenuItem key={node} value={node}>
            {node}
          </MenuItem>
        ))}
      </TextField>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Fecha"
          value={fecha}
          onChange={(newValue) => setFecha(newValue)}
          renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
        />
      </LocalizationProvider>
      <TextField
        label="Cantidad"
        type="number"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          inputProps: { min: 0 },
        }}
      />
      <Button variant="contained" color="primary" onClick={handleAddTickets} fullWidth>
        Agregar al carrito
      </Button>
    </Box>
  );
};

export default BoleteriaFlow;
