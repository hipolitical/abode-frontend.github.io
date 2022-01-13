import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '../../components/Autocomplete';

export default function FormDialog({ open, displayName, data, property, handleClose }) {

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'sm'}>
          <DialogTitle>{displayName}</DialogTitle>
          <DialogContent dividers>
            <Autocomplete
              data={data}
              property={property}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} >Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
      </Dialog>
    </div>
  );
}