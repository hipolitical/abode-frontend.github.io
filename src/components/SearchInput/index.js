import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

function SearchInput({ value, placeholder, onChange }) {
  return (
    <TextField
      value={value}
      label={placeholder}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        )
      }}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
    />
  );
}

export default SearchInput;
