import { FC, forwardRef, ReactElement, Ref, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Box, Slide, Stack, Typography } from '@mui/material';
import { IconAlertTriangle } from '@tabler/icons';

import { IDialogRelaunch } from './DialogRelaunch.d';
import { TransitionProps } from '@mui/material/transitions';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const DialogRelaunch: FC<IDialogRelaunch> = ( { display, response }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState( display );

  useEffect(() => {
    setOpen( display );
  }, [ display ])

  return (
    <Dialog
      open={open}
      onClose={ () => response( 'cancel' )}
      TransitionComponent={Transition}
      fullWidth={true}
      maxWidth="sm"
      keepMounted
    >
      <Box height="8px" bgcolor="#f6274a"></Box>

      <Box display="flex" justifyContent="flex-start" alignItems="flex-start" p="25px 30px">
        <Box mr="25px">
          <IconAlertTriangle color="#f6274a" size={65}/>
        </Box>

        <div>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            { t('installing.dialogs.relaunch.title') }
          </Typography>

          <Typography variant="body1">
            { t('installing.dialogs.relaunch.description') }
            <Box component="strong" display="block" mt={1}>{ t('installing.dialogs.relaunch.question') } </Box>
          </Typography>
        </div>
      </Box>

      <Box p="15px 16px" display="flex" justifyContent="flex-end" alignItems="center" sx={{ borderTop: '1px solid #d8d8d8'}}>
        <Stack direction="row" spacing={2}>
          <Button onClick={ () => response( 'cancel' )} sx={{ textTransform: 'capitalize' }}>
            { t('installing.dialogs.relaunch.buttons.cancel') }
          </Button>

          <Button variant="contained" onClick={ () => response( 'reinit' )} sx={{ textTransform: 'capitalize' }} autoFocus>
            <Box component="span" px={2}>
              { t('installing.dialogs.relaunch.buttons.relaunch') }
            </Box>
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
}
