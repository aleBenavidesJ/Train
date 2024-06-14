import React from 'react';
import { Box, Button, TextField, Typography, Link, Grid } from '@mui/material';

const LoginFlow = ({ onLoginSuccess, onBackToHome, onRegister }) => {
  const [cedula, setCedula] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const admins = JSON.parse(localStorage.getItem('admins')) || [];
    const validUser = users.find(user => user.cedula === cedula && user.password === password);
    const validAdmin = admins.find(admin => admin.cedula === cedula && admin.contrasena === password);

    if (validUser) {
      onLoginSuccess('user');
    } else if (validAdmin) {
      onLoginSuccess('admin');
    } else {
      alert('Cédula o contraseña incorrectos');
    }
  };

  return (
    <Grid container direction="row" sx={{ height: '100vh' }} justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={8} md={4} sx={{ bgcolor: '#171828', p: 4, borderRadius: 2, boxShadow: 3 }}>
        <Link href="#" underline="none" color="#1a73e8" onClick={onBackToHome} sx={{ display: 'block', mb: 2 }}>
          &lt; Back to Home
        </Link>
        <Typography variant="h6" color="white" sx={{ mb: 2 }}>
          New here? <Link href="#" underline="none" color="#1a73e8" onClick={onRegister}>Create an account</Link>
        </Typography>
        <form onSubmit={handleLogin}>
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
            Login
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default LoginFlow;
