import { FC, forwardRef, ReactElement, Ref, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import { Box, Slide, Typography } from '@mui/material';

import { IconAlertCircle } from '@tabler/icons';

import { IDialogMainFolder } from './DialogMainFolder.d';
import { TransitionProps } from '@mui/material/transitions';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const DialogMainFolder: FC<IDialogMainFolder> = ( { display, response }) => {
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
      <Box height="8px" bgcolor="#fc0"></Box>

      <Box display="flex" justifyContent="flex-start" alignItems="flex-start" p="25px 30px">
        <Box mr="25px">
          <IconAlertCircle color="#fc0" size={65}/>
        </Box>

        <div>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            { t('installing.dialogs.mainFolder.title') }
          </Typography>

          <Typography variant="body1">
            { t('installing.dialogs.mainFolder.description') }
            <Box component="strong" display="block" mt={1}>{ t('installing.dialogs.mainFolder.question') } </Box>
          </Typography>
        </div>
      </Box>

      <Box p="15px 16px" display="flex" justifyContent="space-between" alignItems="center" sx={{ borderTop: '1px solid #d8d8d8'}}>
        <div>
          <Button onClick={ () => response( 'cancel' )} sx={{ textTransform: 'capitalize' }}>
            { t('installing.dialogs.mainFolder.buttons.cancel') }
          </Button>
        </div>
        <div>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={ () => response( 'other' )} sx={{ textTransform: 'capitalize' }}>
              { t('installing.dialogs.mainFolder.buttons.chooseOther') }
            </Button>
            <Button variant="contained" onClick={ () => response( 'overwrite' )} sx={{ textTransform: 'capitalize' }} autoFocus>
              <Box component="span" px={2}>
                { t('installing.dialogs.mainFolder.buttons.overwrite') }
              </Box>
            </Button>
          </Stack>
        </div>
      </Box>
    </Dialog>
  );
}
