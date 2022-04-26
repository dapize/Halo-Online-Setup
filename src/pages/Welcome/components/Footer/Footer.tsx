import { Box, Button, Typography } from '@mui/material';
import { IconDownload } from '@tabler/icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
  const { t } = useTranslation();
  let nav = useNavigate();
  const [disabledButtonInstall, setDisabledButtonInstall] = useState<boolean>(false);

  const typoStyles = {
    fontWeight: "bold",
    fontSize: 13,
    ml: "7px",
    component: "span",
    lineHeight: "19px",
  }

  const goNext = () => {
    setDisabledButtonInstall(true);
    nav('/installing', { replace: true });
  }

  return (
    <Box height={80} bgcolor="#0F0F0F" width="100%" px="30px" display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" justifyContent="center" alignItems="center">
        <IconDownload size={16} color="#6CDB00"/>
        <Typography color="#797474" { ...typoStyles }>{ t('welcome.footer.requiredSpace')}</Typography>
        <Typography color="#C0C0C0" { ...typoStyles }>2.35G</Typography>
      </Box>

      <Button variant="contained" size="large" sx={{ minHeight: 44, borderRadius: '2px' }} disabled={disabledButtonInstall}>
        <Typography
          component="span"
          fontSize={15}
          textTransform="none"
          onClick={ goNext }
        >
        { t('welcome.footer.installButton') }
        </Typography>
      </Button>
    </Box>
  )
}
