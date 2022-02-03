import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '../../components/Autocomplete';
import GroupIcon from '@mui/icons-material/Group';

export default function FormDialog({
  open,
  displayName,
  data,
  value,
  property,
  handleClose,
  handleForceClose,
  onChange,
  handleAdd,
}) {

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'sm'}>
        <DialogTitle sx={{ display: 'flex' }}>
          <Box sx={{ marginRight: 1, marginTop: '3px', marginBottom: '-6px' }}>
            <GroupIcon color="primary" />
          </Box>
          {displayName}
        </DialogTitle>
        <DialogContent dividers>
          <Autocomplete
            data={data}
            value={value}
            property={property}
            label="Available Users"
            placeholder="Search by keyword"
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleForceClose}>Cancel</Button>
          <Button type="submit" onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}