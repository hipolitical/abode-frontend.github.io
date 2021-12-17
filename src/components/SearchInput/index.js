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
          <InputAdornment>
            <SearchIcon />
          </InputAdornment>
        )
      }}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchInput;
