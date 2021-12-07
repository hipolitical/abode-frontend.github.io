import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({ open, handleClose }) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'sm'}>
        <DialogTitle>Account Modal</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Create new client account
          </DialogContentText>
          <Box sx={{ mb: 3 }}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              fullWidth
              variant="standard"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}