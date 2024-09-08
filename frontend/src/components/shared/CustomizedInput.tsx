import TextField from '@mui/material/TextField';
import React from 'react';

type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin='normal'
      name={props.name}
      label={props.label}
      type={props.type}
      sx={{
        width: '400px', 
        borderRadius: 2, 
        fontSize: 20, 
        color: 'white',
        '& .MuiInputLabel-root': { color: 'white' },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderRadius: 2, 
          },
          '& input': {
            fontSize: 20,
            color: 'white', 
          },
        },
      }}
    />
  );
};

export default CustomizedInput;
