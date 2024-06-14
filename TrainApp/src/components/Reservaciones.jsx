import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const Reservaciones = () => {
  const [cedula, setCedula] = useState('');
  const [fecha, setFecha] = useState(null);
  const [ruta, setRuta] = useState('');
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);

  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem('tickets')) || [];
    setTickets(savedTickets);
  }, []);

  const normalizeDate = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0); 
    return newDate;
  };

  const handleSearch = () => {
    let results = tickets;

    if (cedula) {
      results = results.filter(ticket => ticket.cedula === cedula);
    }

    if (fecha) {
      const normalizedFecha = normalizeDate(fecha);
      results = results.filter(ticket => {
        const ticketFecha = normalizeDate(ticket.fecha);
        return ticketFecha.getTime() === normalizedFecha.getTime();
      });
    }

    if (ruta) {
      results = results.filter(ticket => ticket.desde === ruta || ticket.hacia === ruta);
    }

    setFilteredTickets(results);
  };

  return (
    <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Reservaciones</Typography>

      <TextField
        label="Cédula"
        value={cedula}
        onChange={(e) => setCedula(e.target.value)}
        fullWidth
        margin="normal"
      />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Fecha"
          value={fecha}
          onChange={(newValue) => setFecha(newValue)}
          renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
        />
      </LocalizationProvider>

      <TextField
        label="Ruta"
        value={ruta}
        onChange={(e) => setRuta(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button variant="contained" color="primary" onClick={handleSearch} fullWidth sx={{ mt: 2 }}>
        Buscar
      </Button>

      <List sx={{ mt: 4 }}>
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Desde: ${ticket.desde} Hacia: ${ticket.hacia} - Fecha: ${new Date(ticket.fecha).toLocaleDateString()} - Cantidad: ${ticket.cantidad} - Precio: ${ticket.cost} colones - Cédula: ${ticket.cedula}`}
              />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No se encontraron tiquetes" />
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default Reservaciones;
