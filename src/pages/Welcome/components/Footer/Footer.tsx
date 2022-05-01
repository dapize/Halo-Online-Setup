import { IMainContext, MainContext } from '@contexts/main';
import { Box, Button, Typography } from '@mui/material';
import { IconAlertTriangle, IconDownload } from '@tabler/icons';
import { getFreeDiskSpace } from '@utils/getPcInfo';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
  const { t } = useTranslation();
  let nav = useNavigate();
  const { installationPath } = useContext(MainContext) as IMainContext;
  const [disabledButtonInstall, setDisabledButtonInstall] = useState<boolean>(false);
  const [withoutSpace, setWithoutSpace] = useState<boolean>(false);
  const gbRequired = 2.35;

  const typoStyles = {
    fontWeight: "bold",
    fontSize: 13,
    component: "span",
    lineHeight: "14px",
    ml: 1
  }

  const goNext = () => {
    setDisabledButtonInstall(true);
    nav('/installing', { replace: true });
  }

  useEffect(() => {
    if ( installationPath ) {
      const diskLetter = installationPath.split(':')[0];
      ( async () => {
        const diskFreeSpace = await getFreeDiskSpace(diskLetter);
        const withSpace = diskFreeSpace ? (diskFreeSpace <= gbRequired) :  false;
        setWithoutSpace( withSpace );
      })();
    }
  }, [ installationPath ]);

  return (
    <Box height={80} bgcolor="#0F0F0F" width="100%" px="30px" display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" justifyContent="center" alignItems="center">
        { withoutSpace ? <IconAlertTriangle size={16} color="#f6274a"/> : <IconDownload size={16} color="#6CDB00"/> }
        <Typography color="#797474" { ...typoStyles }>{ t('welcome.footer.requiredSpace')}</Typography>
        <Typography color="#C0C0C0" { ...typoStyles }>{gbRequired}G</Typography>
        { !!withoutSpace && <Typography { ...typoStyles } ml={3} color="#f6274a" fontSize={11}>{ t('welcome.footer.withoutSpace')}</Typography> }
      </Box>
      {
        !withoutSpace && (
          <Button
            variant="contained"
            size="large"
            sx={{ minHeight: 44, borderRadius: '2px' }}
            disabled={disabledButtonInstall}
          >
            <Typography
              component="span"
              fontSize={15}
              textTransform="none"
              onClick={ goNext }
            >
            { t('welcome.footer.installButton') }
            </Typography>
          </Button>
        )
      }
    </Box>
  )
}
