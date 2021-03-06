import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Button, Typography } from '@mui/material';

import { open } from '@tauri-apps/api/shell';
import { exit } from '@tauri-apps/api/process';
import { join } from '@tauri-apps/api/path';

import { CheckBox } from '@components/CheckBox';
import Background from '@assets/result/background.png';
import Logo from '@assets/logo.png';

import { IMainContext, MainContext } from '@contexts/main';

import { IData, IStateLoc } from './Result.d';
import { createShortcuts } from './helpers/createShortcuts';
import { sendInfoPc } from './helpers/sendInfoPc';

export const Result = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const { installationPath, extraChecks, pcInfo } = useContext(MainContext) as IMainContext;
  const [data, setData] = useState<IData>({ title: '', initCheckbox: '', finishButton: '' });
  const [initCheckboxState, setInitCheckboxState] = useState<boolean>(true);
  const stateType = (state as IStateLoc)?.type || 'success';
  const [displayInitCheckbox, setDisplayInitCheckbox] = useState<boolean>(true);
  const shortcutsCreated = useRef<boolean>(false);
  const getInfoGetted = useRef<boolean>(false);

  const onClickHandleClose = async () => {
    if ( stateType === 'cancelled' ) {
      await exit();
    } else {
      if ( displayInitCheckbox && initCheckboxState ) {
        const exePath = await join(installationPath, 'eldorado.exe');
        await open(exePath)
      }
      await exit();
    }
  };

  useEffect(() => {
    if ( stateType === 'success' ) {
      setData({
        title: t('result.title.success'),
        initCheckbox: t('result.initCheckbox'),
        finishButton: t('result.finishButton.success'),
      });

      // creating shortcuts and more
      if ( !shortcutsCreated.current ) {
        shortcutsCreated.current = true;
        createShortcuts(extraChecks, installationPath);
      }

      // sending the technique information to the server
      if ( !getInfoGetted.current && extraChecks.hardware ) {
        getInfoGetted.current = true;
        sendInfoPc( pcInfo );
      }

    } else if ( stateType === 'cancelled' ) {
      setDisplayInitCheckbox(false);
      setData({
        title: t('result.title.cancelled'),
        initCheckbox: t('result.initCheckbox'),
        finishButton: t('result.finishButton.cancelled'),
      })
    }
  }, [ stateType, t, extraChecks, installationPath, pcInfo ])

  return (
    <Box
      width="100w"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="flex-end"
      sx={{
        backgroundImage: `url(${Background})`,
        backgroundRepeat: 'no-repeat',
      }}
      component="main"
    >
      <Box position="absolute" top="27px" right="30px">
        <img src={Logo} alt="Halo Online Logo"/>
      </Box>

      <Box
        sx={{ backgroundColor: 'rgba(15,15,15, 0.75)'}}
        height="80px"
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px="30px"
      >
        <Typography color="#fff" component="h1" fontSize={24} >{ data.title }</Typography>

        <Box display="flex" justifyContent="center" alignItems="center">
          {
            !!displayInitCheckbox && (
              <Box mr="25px">
                <CheckBox
                  label={ data.initCheckbox }
                  value="init-game"
                  onChange={ ( value: string, checked: boolean ) => setInitCheckboxState( checked ) }
                  checked={ initCheckboxState }
                />
              </Box>
            )
          }
          <Button variant="contained" size="large" sx={{ minHeight: 44, borderRadius: '2px', minWidth: 143 }}>
            <Typography
              component="span"
              fontSize={15}
              textTransform="none"
              onClick={ onClickHandleClose }
            >
              { data.finishButton }
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
