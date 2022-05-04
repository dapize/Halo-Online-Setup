import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from "react-i18next"

import { InstalationPath } from '../InstalationPath';
import { Language } from '../Language';
import { Extras } from '../Extras';
import { useContext, useEffect, useRef, useState } from 'react';
import { IMainContext, MainContext } from '@contexts/main';
import { getPcInfo, IDisk } from '@utils/getPcInfo';
import { ConfirmationDialog } from '@components/ConfirmationDialog';


export const Body = () => {
  const { t } = useTranslation();
  const {  setPcInfo, pcInfo } = useContext(MainContext) as IMainContext;
  const [dialogPcInfoDisplay, setDialogPcInfoDisplay] = useState<boolean>(false);
  const infoPcGetted = useRef<boolean>(false);

  useEffect(() => {
    if ( dialogPcInfoDisplay && !infoPcGetted.current ) {
      infoPcGetted.current = true;
      (async () => {
        const infoPc = await getPcInfo();
        setPcInfo(infoPc);
      })();
    }
  }, [ dialogPcInfoDisplay, setPcInfo ])

  return (
    <>
      <Box width="100%" height={438} sx={{ backgroundColor: 'rgba(0,0,0, 0.95)' }} p="30px">
        <Box mb="35px" display="flex" justifyContent="flex-start" alignItems="baseline">
          <Typography color="#fff" component="h1" fontSize={24} >{t('welcome.header.title')}</Typography>
          <Typography color="#797474" component="span" fontSize={13} ml={1} fontWeight="bold">0.6.1.0</Typography>
        </Box>

        <Stack spacing={3}>
          <InstalationPath/>
          <Language/>
          <Extras onClickDialogOpen={ () => setDialogPcInfoDisplay(true)}/>
        </Stack>
      </Box>

      <ConfirmationDialog
        type="info"
        title={ t('welcome.body.extras.infoPc.dialog.title') }
        display={ dialogPcInfoDisplay }
        onClose={ () => setDialogPcInfoDisplay(false)}
        buttons={[{
          label: t('welcome.body.extras.infoPc.dialog.button'),
          action: () => setDialogPcInfoDisplay(false),
          variant: 'contained',
          autoFocus: true
        }]}
      >
        { t('welcome.body.extras.infoPc.dialog.description') }
        {
          pcInfo ? (
            <Box component="ul" fontSize={14}>
              <li>CPU: {pcInfo.cpu}</li>
              <li>OS: {pcInfo.os} {pcInfo.arc} {pcInfo.osType} {pcInfo.osVersion}</li>
              <li>RAM: {pcInfo.ram}GB</li>
              <li>Monitor: {pcInfo.monitor?.width} x {pcInfo.monitor?.height} - {pcInfo.monitor?.scaleFactor}</li>
              <li>Disk:
                <ul>
                  {pcInfo.disks.map(( item: IDisk, index: number ) => (
                    <li key={`${item.letter}-${index}`}>{item.letter}: {item.size}GB - {item.free}GB - {item.type}</li>
                  ))}
                </ul>
              </li>
              <li>Video: {pcInfo.video.name} {pcInfo.video.vram}GB</li>
            </Box>
          ) : (<Box component="strong" display="block" mt={1}>{ t('welcome.body.extras.infoPc.dialog.loading') }</Box>)
        }
      </ConfirmationDialog>
    </>
  )
}
