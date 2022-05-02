import { FC, useContext, useEffect, useRef, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { IChecksItems } from './Extras.d';
import { CheckBox } from '@components/CheckBox';
import { IMainContext, MainContext } from '@contexts/main';
import { useTranslation } from 'react-i18next';
import { ConfirmationDialog } from '@components/ConfirmationDialog';
import { getPcInfo, IDisk, IGetPcInfo } from '@utils/getPcInfo';


export const Extras: FC = () => {
  const { extraChecks, setExtraChecks } = useContext(MainContext) as IMainContext;
  const { t } = useTranslation();
  const [dialogPcInfoDisplay, setDialogPcInfoDisplay] = useState<boolean>(false);
  const infoPcGetted = useRef<boolean>(false);
  const [pcInfo, setPcInfo] = useState<IGetPcInfo>();

  const handleOnChange = ( value: string, checked: boolean ) => {
    setExtraChecks( ( currentChecks: IChecksItems ) => {
      return {
        ...currentChecks,
        [ value ]: checked
      }
    })
  }

  useEffect(() => {
    if ( dialogPcInfoDisplay && !infoPcGetted.current ) {
      infoPcGetted.current = true;
      (async () => {
        const infoPc = await getPcInfo();
        setPcInfo(infoPc);
      })();
    }
  }, [ dialogPcInfoDisplay ])

  return (
    <>
      <div>
        <Typography fontSize={12} fontWeight="bold" component="h3" textTransform="uppercase" color="#fff" mb="5px">
          { t('welcome.body.extras.title') }
        </Typography>

        <Box ml="-2px">
          <Stack spacing={0.5}>
            <CheckBox
              label={t('welcome.body.extras.checkboxs.menu')}
              value="menu"
              onChange={ handleOnChange }
              checked={ extraChecks.menu }
            />

            <CheckBox
              label={t('welcome.body.extras.checkboxs.desktop')}
              value="desktop"
              onChange={ handleOnChange }
              checked={ extraChecks.desktop }
            />

            <Box display="flex" justifyContent="flex-start" alignItems="center">
              <CheckBox
                label={t('welcome.body.extras.checkboxs.hardware')}
                value="hardware"
                onChange={ handleOnChange }
                checked={ extraChecks.hardware }
              />

              <Typography
                fontSize={12}
                onClick={ () => setDialogPcInfoDisplay(true)}
                sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                component="span"
                ml={1}
                color="#1976d2"
              >
                { t('welcome.body.extras.infoPc.link') }
              </Typography>
            </Box>
          </Stack>
        </Box>
      </div>

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
          pcInfo && (
            <ul>
              <li>OS: {pcInfo.os} {pcInfo.arc} {pcInfo.osType} {pcInfo.osVersion}</li>
              <li>RAM: {pcInfo.ram}</li>
              <li>Monitor: {pcInfo.monitor?.width} x {pcInfo.monitor?.height} - {pcInfo.monitor?.scaleFactor}</li>
              <li>Disk:
                <ul>
                  {pcInfo.disks.map(( item: IDisk, index: number ) => (
                    <li key={`${item.letter}-${index}`}>{item.letter}: {item.size} - {item.free} - {item.type}</li>
                  ))}
                </ul>
              </li>
              <li>Video: {pcInfo.video.name} {pcInfo.video.vram}GB</li>
            </ul>
          )
        }
      </ConfirmationDialog>
    </>
  )
}
