import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ChartView from './chart'

function Company() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8 }}>
        <ChartView />
      </Box>
    </Container>
  );
}

export default Company;
