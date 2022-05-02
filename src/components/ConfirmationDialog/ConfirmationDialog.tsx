import { FC, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Box, Typography } from '@mui/material';

import { IButton, IConfirmationDialog } from './ConfirmationDialog.d';
import { getDataByType } from './helpers/getDataByType';
import { Transition } from '@helpers/Transition';

export const ConfirmationDialog: FC<IConfirmationDialog> = ( { type, title, display, buttons, onClose, children }) => {
  const [open, setOpen] = useState( display );
  const { color, icon: Icon } = getDataByType(type);

  useEffect(() => {
    setOpen( display );
  }, [ display ])

  return (
    <Dialog
      open={open}
      onClose={ onClose }
      TransitionComponent={Transition}
      fullWidth={true}
      maxWidth="sm"
      disableEscapeKeyDown
    >
      <Box height="8px" bgcolor={color}></Box>

      <Box display="flex" justifyContent="flex-start" alignItems="flex-start" p="25px 30px">
        <Box mr="25px">
          <Icon color={color} size={65}/>
        </Box>

        <div>
          <Typography variant="h5" fontWeight={500} mb={1.2}>
            { title }
          </Typography>

          <Typography variant="body1" fontSize={14.5}>
            { children }
          </Typography>
        </div>
      </Box>

      <Box p="15px 16px" display="flex" justifyContent="flex-end" alignItems="center" sx={{ borderTop: '1px solid #d8d8d8'}}>
        {
          buttons.map(( button: IButton, index: number ) => {
            const { label, action, variant = 'text', sx = {}, autoFocus } = button;
            return (
              <Button key={`${label}-${index}`} onClick={ action } variant={ variant } sx={{ ml: index ? 2 : 0, textTransform: 'capitalize', ...sx }} autoFocus={autoFocus}>
                { label }
              </Button>
            )
          })
        }
      </Box>
    </Dialog>
  );
}
