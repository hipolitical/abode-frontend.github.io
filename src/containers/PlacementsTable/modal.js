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
  year: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('LOB is required'),
  status: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Program is required'),
  published: Yup.string()
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
              {initData ? 'Edit treaty' : 'Create new treaty'}
            </DialogContentText>
            <Box sx={{ my: 2 }}>
              <TextField
                fullWidth
                id="client"
                name="client"
                label="Client"
                margin="dense"
                value={formik.values.client || ''}
                onChange={formik.handleChange}
                error={formik.touched.client && Boolean(formik.errors.client)}
                helperText={formik.touched.client && formik.errors.client}
              />
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
                id="year"
                name="year"
                label="Year"
                margin="dense"
                value={formik.values.year || ''}
                onChange={formik.handleChange}
                error={formik.touched.year && Boolean(formik.errors.year)}
                helperText={formik.touched.year && formik.errors.year}
              />
              <TextField
                fullWidth
                id="status"
                name="status"
                label="Status"
                margin="dense"
                value={formik.values.status || ''}
                onChange={formik.handleChange}
                error={formik.touched.status && Boolean(formik.errors.status)}
                helperText={formik.touched.status && formik.errors.status}
              />
              <TextField
                fullWidth
                id="published"
                name="published"
                label="Published"
                margin="dense"
                value={formik.values.published || ''}
                onChange={formik.handleChange}
                error={formik.touched.published && Boolean(formik.errors.published)}
                helperText={formik.touched.published && formik.errors.published}
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