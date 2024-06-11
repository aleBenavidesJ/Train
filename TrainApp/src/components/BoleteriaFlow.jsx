import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const BoleteriaFlow = () => {
  const [desde, setDesde] = useState('');
  const [hacia, setHacia] = useState('');
  const [fecha, setFecha] = useState(null);
  const [cantidad, setCantidad] = useState(0);

  const estaciones = ['Estación 1', 'Estación 2', 'Estación 3'];

  const handleComprar = () => {
    console.log('Comprar boletos:', { desde, hacia, fecha, cantidad });
  };

  return (
    <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 2 }}>
      <TextField
        select
        label="Desde"
        value={desde}
        onChange={(e) => setDesde(e.target.value)}
        fullWidth
        margin="normal"
      >
        {estaciones.map((estacion) => (
          <MenuItem key={estacion} value={estacion}>
            {estacion}
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
      >
        {estaciones.map((estacion) => (
          <MenuItem key={estacion} value={estacion}>
            {estacion}
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
      <Button variant="contained" color="primary" onClick={handleComprar} fullWidth>
        Comprar
      </Button>
    </Box>
  );
};

export default BoleteriaFlow;
