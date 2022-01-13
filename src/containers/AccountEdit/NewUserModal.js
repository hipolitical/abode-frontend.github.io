import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({ open, displayName, handleClose }) {

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'sm'}>
          <DialogTitle>{displayName}</DialogTitle>
          <DialogContent dividers>
            <DialogContentText>
              {displayName}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} >Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
      </Dialog>
    </div>
  );
}