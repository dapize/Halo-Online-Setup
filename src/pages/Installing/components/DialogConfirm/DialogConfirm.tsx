import { FC, forwardRef, ReactElement, Ref, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TransitionProps } from '@mui/material/transitions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { IDialogConfirm } from './DialogConfirm.d';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const DialogConfirm: FC<IDialogConfirm> = ( { display, response }) => {
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
      <DialogTitle sx={{ fontWeight: 'bold' }}>
        { t('installing.dialogConfirm.title') }

        <IconButton
          aria-label="close"
          sx={{
            position: 'absolute',
            right: 5,
            top: 5,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ mb: 1 }}>
        <DialogContentText sx={{ fontSize: 14 }}>
          { t('installing.dialogConfirm.description') } <br/><strong>{ t('installing.dialogConfirm.question') } </strong>
        </DialogContentText>
      </DialogContent>

      <Box sx={{ pb: '16px', px: '24px'}} display="flex" justifyContent="space-between" alignItems="center">
        <div>
          <Button onClick={ () => response( 'cancel' )} sx={{ fontSize: 12 }}>
            { t('installing.dialogConfirm.buttons.cancel') }
          </Button>
        </div>
        <div>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={ () => response( 'other' )} sx={{ fontSize: 12 }}>
              { t('installing.dialogConfirm.buttons.chooseOther') }
            </Button>
            <Button variant="contained" onClick={ () => response( 'overwrite' )} sx={{ fontSize: 12 }} autoFocus>
              { t('installing.dialogConfirm.buttons.overwrite') }
            </Button>
          </Stack>
        </div>
      </Box>
    </Dialog>
  );
}
