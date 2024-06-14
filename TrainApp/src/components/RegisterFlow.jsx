import React from 'react';
import { Box, Button, TextField, Typography, Link, Grid } from '@mui/material';

const RegisterFlow = ({ onBackToHome, onLogin }) => {
  const [cedula, setCedula] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleRegister = (event) => {
    event.preventDefault();
    
    const cedulaRegex = /^[0-9]+$/;
    if (!cedulaRegex.test(cedula)) {
      alert('Cédula inválida. Debe contener solo números.');
      return;
    }
    if (password.length < 6) {
      alert('Contraseña muy corta. Debe tener al menos 6 caracteres.');
      return;
    }

    const newUser = { cedula, password };
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Cuenta creada exitosamente.');
    onLogin();
  };

  return (
    <Grid container direction="row" sx={{ height: '100vh' }} justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={8} md={4} sx={{ bgcolor: '#171828', p: 4, borderRadius: 2, boxShadow: 3 }}>
        <Link href="#" underline="none" color="#1a73e8" onClick={onBackToHome} sx={{ display: 'block', mb: 2 }}>
          &lt; Back to Home
        </Link>
        <Typography variant="h6" color="white" sx={{ mb: 2 }}>
          Already have an account? <Link href="#" underline="none" color="#1a73e8" onClick={onLogin}>Log in.</Link>
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            label="Cédula"
            variant="filled"
            fullWidth
            margin="normal"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            InputProps={{
              style: { backgroundColor: '#2e2f4f', color: 'white' },
            }}
            InputLabelProps={{
              style: { color: 'white' },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="filled"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              style: { backgroundColor: '#2e2f4f', color: 'white' },
            }}
            InputLabelProps={{
              style: { color: 'white' },
            }}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: '#1a73e8', '&:hover': { bgcolor: '#155abc' } }}>
            Create Account
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default RegisterFlow;
