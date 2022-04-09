import { FC, ChangeEvent } from 'react'
import { ICheckBox } from './CheckBox.d';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


export const CheckBox: FC<ICheckBox> = ( { label, checked, onChange, value }) => {
  const onChangeHandle = ( event: ChangeEvent<HTMLInputElement>) => {
    onChange(value, event.target.checked)
  }

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            sx={{
              color: '#1976d2',
              '&.MuiCheckbox-root': {
                padding: '0 4px 0 0'
              }
            }}
            defaultChecked={ checked }
            onChange={ onChangeHandle }
          />
        }
        label={label}
        sx={{
          color: 'rgba(255,255,255, 0.85)',
          userSelect: 'none',
          '&.MuiFormControlLabel-root': {
            marginLeft: 0
          }
        }}
      />
    </FormGroup>
  )
}
