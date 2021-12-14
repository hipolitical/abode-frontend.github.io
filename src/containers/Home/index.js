import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h4" color="primary" textAlign="center" gutterBottom>
        HOME
      </Typography>
    </Box>
  );
}

export default Home;
