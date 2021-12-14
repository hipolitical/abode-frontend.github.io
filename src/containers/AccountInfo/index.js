import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ChartView from './chart'

function AccountInfo() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Markel Insurance AccountInfo
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 4 }}>
          <Box sx={{ pr: 8 }}>
            <Typography variant="body1" color="secondary.light" gutterBottom>
              <b>Last Contract Year:</b> XX
            </Typography>
            <Typography variant="body1" color="secondary.light" gutterBottom>
              <b>First Contract Year:</b> XX
            </Typography>
            <Typography variant="body1" color="secondary.light" gutterBottom>
              <b>Entity Type:</b> XX
            </Typography>
            <Typography variant="body1" color="secondary.light" gutterBottom>
              <b>AccountInfo Type:</b> XX
            </Typography>
          </Box>
          <Box sx={{ pr: 8 }}>
            <Typography variant="body1" color="secondary.light" gutterBottom>
              <b>Legal Status:</b> XX
            </Typography>
            <Typography variant="body1" color="secondary.light" gutterBottom>
              <b>Role:</b> XX
            </Typography>
            <Typography variant="body1" color="secondary.light" gutterBottom>
              <b>DUNS:</b> XX
            </Typography>
            <Typography variant="body1" color="secondary.light" gutterBottom>
              <b>AM Best:</b> XX
            </Typography>
          </Box>
          <Box sx={{ pr: 8 }}>
            <Typography variant="body1" color="secondary.light" gutterBottom>
              <b>Standard and Poor's:</b> XX
            </Typography>
            <Typography variant="body1" color="secondary.light" gutterBottom>
              <b>Address:</b> XX
            </Typography>
          </Box>
        </Box>
        <Box>
          <ChartView />
        </Box>
      </Box>
    </Container>
  );
}

export default AccountInfo;
