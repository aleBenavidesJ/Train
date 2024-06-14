import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, MenuItem, List, ListItem, ListItemText, Divider } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Dijkstra from './Dijkstra';

const BoleteriaFlow = ({ nodes, edges }) => {
  const [desde, setDesde] = useState('');
  const [hacia, setHacia] = useState('');
  const [fecha, setFecha] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [carrito, setCarrito] = useState([]);
  const [sourceNodes, setSourceNodes] = useState([]);
  const [targetNodes, setTargetNodes] = useState([]);

  useEffect(() => {
    if (nodes && edges && edges.length > 0) {
      setSourceNodes([...new Set(edges.map(edge => getNodeLabel(edge.source)))]);
    }
  }, [nodes, edges]);

  useEffect(() => {
    if (desde && edges) {
      setTargetNodes(edges.filter(edge => getNodeLabel(edge.source) === desde).map(edge => getNodeLabel(edge.target)));
    } else {
      setTargetNodes([]);
    }
  }, [desde, edges]);

  const getNodeLabel = (id) => {
    const node = nodes.find(node => node.id === id);
    return node ? node.data.label : '';
  };

  const handleAddTickets = () => {
    if (!desde || !hacia || !fecha || cantidad <= 0) {
      console.error('All fields must be filled correctly');
      return;
    }

    const selectedEdge = edges.find(edge => getNodeLabel(edge.source) === desde && getNodeLabel(edge.target) === hacia);

    if (!selectedEdge) {
      console.error('Selected route not found');
      return;
    }

    const cost = selectedEdge.distance * 25 * cantidad;

    const newTicket = { 
      desde, 
      hacia, 
      fecha: fecha.toISOString(),
      cantidad, 
      cost 
    };
    console.log('Nuevo Boleto:', newTicket);

    setCarrito(prevCarrito => [...prevCarrito, newTicket]);
  };

  const handleCompra = () => {
    const cedula = localStorage.getItem('cedula');

    const existingTickets = JSON.parse(localStorage.getItem('tickets')) || [];
    const newTickets = carrito.map(ticket => ({
      ...ticket,
      cedula
    }));

    localStorage.setItem('tickets', JSON.stringify([...existingTickets, ...newTickets]));
    setCarrito([]);
    alert('Compra realizada con éxito');
  };

  const calcularTotal = () => {
    const subtotal = carrito.reduce((total, item) => total + item.cost, 0);
    let descuentoPorcentaje = carrito.length > 1 ? Math.min(carrito.length * 2, 90) : 0;
    let descuento = (subtotal * descuentoPorcentaje) / 100;
    return (subtotal - descuento).toFixed(2);
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
        onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value, 10)))}
        fullWidth
        margin="normal"
        InputProps={{
          inputProps: { min: 1 },
        }}
      />
      <Button variant="contained" color="primary" onClick={handleAddTickets} fullWidth>
        Agregar al carrito
      </Button>
      <Box sx={{ mt: 4 }}>
        <h2>Carrito de Compras</h2>
        <List>
          {carrito.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Desde: ${item.desde} Hacia: ${item.hacia} - Fecha: ${new Date(item.fecha).toLocaleDateString()} - Cantidad: ${item.cantidad} - Precio: ${item.cost} colones`}
              />
            </ListItem>
          ))}
          {carrito.length === 0 && <ListItem><ListItemText primary="El carrito está vacío" /></ListItem>}
        </List>
        <Divider />
        <Box sx={{ mt: 2, fontWeight: 'bold' }}>
          Total: {calcularTotal()} colones
        </Box>
        <Button variant="contained" color="primary" onClick={handleCompra} fullWidth sx={{ mt: 2 }}>
          Comprar
        </Button>
      </Box>
    </Box>
  );
};

export default BoleteriaFlow;
