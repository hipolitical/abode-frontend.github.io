import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const AccountInfoSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is required'),
  lob: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('LOB is required'),
  program: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Program is required'),
});

export default function FormDialog({ open, initData, handleClose, handleSubmit }) {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initData || {},
    validationSchema: AccountInfoSchema,
    onSubmit: (values) => {
      handleSubmit({
        ...initData,
        ...values,
      });
    },
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'sm'}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Account Modal</DialogTitle>
          <DialogContent dividers>
            <DialogContentText>
              Create new client account
            </DialogContentText>
            <Box sx={{ my: 2 }}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                margin="dense"
                value={formik.values.name || ''}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                fullWidth
                id="lob"
                name="lob"
                label="LOB"
                margin="dense"
                value={formik.values.lob || ''}
                onChange={formik.handleChange}
                error={formik.touched.lob && Boolean(formik.errors.lob)}
                helperText={formik.touched.lob && formik.errors.lob}
              />
              <TextField
                fullWidth
                id="program"
                name="program"
                label="Program"
                margin="dense"
                value={formik.values.program || ''}
                onChange={formik.handleChange}
                error={formik.touched.program && Boolean(formik.errors.program)}
                helperText={formik.touched.program && formik.errors.program}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} >Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}