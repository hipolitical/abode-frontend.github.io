import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function CheckboxesTags({ data, value, property, label, placeholder, onChange }) {
  return (
    <Autocomplete
      freeSolo
      id="checkboxes-tags-demo"
      options={data}
      value={value}
      getOptionLabel={(option) => option[property] || ''}
      onChange={onChange}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
    />
  );
}
