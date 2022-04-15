import { FC, ChangeEvent, useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/material';
import { ICheckBox } from './CheckBox.d';


export const CheckBox: FC<ICheckBox> = ( { label, checked, onChange, value }) => {
  const [checkedState, setCheckedState] = useState<boolean>(checked !== undefined ? checked : false)

  const onChangeHandle = ( event: ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    onChange(value, newChecked)
    setCheckedState( newChecked )
  }

  return (
    <Box display="flex" justifyContent="flex-start" alignItems="center">
      <FormControlLabel
        control={
          <Checkbox
            sx={{
              color: '#1976d2',
              '&.MuiCheckbox-root': {
                padding: '0 4px 0 0'
              }
            }}
            checked={ checkedState }
            onChange={ onChangeHandle }
          />
        }
        label={label}
        sx={{
          color: 'rgba(255,255,255, 0.85)',
          '&.MuiFormControlLabel-root': {
            marginLeft: 0,
            marginRight: 0,
            width: 'auto',
            display: 'flex'
          }
        }}
      />
    </Box>
  )
}
