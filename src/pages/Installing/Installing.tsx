import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material'
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { fetch, Response } from '@tauri-apps/api/http';
import { createDir, readDir, removeDir } from '@tauri-apps/api/fs';

import { Gallery } from './components/Gallery'
import { Nav } from './components/Nav';
import { ProgressBar } from './components/ProgressBar';

import { IMainContext, MainContext } from '../../contexts/main';
import { Downloader } from '../../helpers/Downloader';
import { DialogMainFolder, TOption as TOptionMainFolder } from './components/DialogMainFolder';
import { DialogRelaunch, TOption as TOptionRelaunch } from './components/DialogRelaunch';

import { IResponse } from './Installing.d';

import { chooseInstallationPath } from '../../helpers/chooseInstallationPath';
import { relaunch } from '@tauri-apps/api/process';

export const Installing = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const nav = useNavigate();
  const [ itemActive, setItemActive ] = useState<number>(0);
  const [ percentageProgress, setPercentageProgress ] = useState<number>(0);
  const { installationPath, language, setInstallationPath } = useContext(MainContext) as IMainContext;
  const uniqueReques = useRef<boolean>(false);
  const [dialogMainFolderDisplay, setDialogMainFolderDisplay] = useState<boolean>(false);
  const chooseOtherFolder = useRef<boolean>(false);
  const [dialogRelaunchDisplay, setDialogRelaunchDisplay] = useState<boolean>(false);

  const reqFilesList = useCallback( async () => {
    try {
      const getFilesList: Response<IResponse> = await fetch(`http://localhost:8000/files?language=${language}`);
      const getFiles = new Downloader( getFilesList.data.list, installationPath );
      getFiles.on('error', ( err: unknown ) => {
        setDialogRelaunchDisplay(true)
      });
      getFiles.on('finish', ( err: unknown ) => {
        if ( !err ) {
          nav('/result', { replace: true, state: { type: 'success' }});
        }
      });
      getFiles.on('progress', ( percentage: number ) => {
        setPercentageProgress( percentage )
      });

    } catch ( err ) {
      setDialogRelaunchDisplay(true)
    }
  }, [ language, installationPath, nav ]);

  const mainFolderChecker = useCallback(
    async (): Promise<boolean> => {
      try {
        await readDir( installationPath );
        return true
      } catch ( err: unknown ) {
        return false;
      }
    },
    [ installationPath ],
  );

  const initInstallation = useCallback(
    async () => {
      try {
        const existsMainFolder = await mainFolderChecker();
        if ( !existsMainFolder ) {
          await createDir( installationPath );
          reqFilesList();
        } else {
          setDialogMainFolderDisplay( true );
        }
      } catch ( err ) {
        enqueueSnackbar(t('installing.errors.creatingInstallationFolder'), { variant: 'error' });
        console.log(err);
      }
    },
    [ installationPath, mainFolderChecker, reqFilesList, enqueueSnackbar, t ],
  );

  const handleCloseDialogMainFolder = async ( option: TOptionMainFolder ) => {
    setDialogMainFolderDisplay( false );
    switch ( option ) {
      case 'overwrite':
        try {
          await removeDir( installationPath, { recursive: true })
        } catch ( err: unknown ) {
          enqueueSnackbar(t('installing.errors.removingMainFolder'), { variant: 'error' });
        }
        initInstallation();
        break;

      case 'other':
        const newInstallationPath = await chooseInstallationPath();
        if ( newInstallationPath ) {
          setInstallationPath( newInstallationPath );
          chooseOtherFolder.current = true;
        }
        break;

      case 'cancel':
        nav('/result', { replace: true, state: { type: 'cancelled' }});
        break;
    }
  }

  const handleCloseDialogRelaunch = async ( option: TOptionRelaunch ) => {
    setDialogRelaunchDisplay(false);
    if ( option === 'reinit') {
      await relaunch()
    } else {
      nav('/result', { replace: true, state: { type: 'cancelled' }});
    }
  }

  useEffect(() => {
    if ( uniqueReques.current && chooseOtherFolder.current) {
      chooseOtherFolder.current = false;
      initInstallation();
    }
  }, [ installationPath, initInstallation ])

  useEffect(() => {
    if ( !uniqueReques.current ) {
      uniqueReques.current = true;
      initInstallation();
    };
  }, [ initInstallation ]);

  return (
    <>
      <Box width="100%" height="518px">
        <Gallery active={ itemActive }/>

        <Box position="absolute" bottom={0} left={0} width="100%" zIndex={15}>
          <Box display="flex" justifyContent="space-between" alignItems="center" px="7px" mb="7px">
            <Typography fontSize={10} lineHeight="12px" color="#fff" component="span">
              { t('installing.footer.title') } { percentageProgress }%
            </Typography>
            <Nav
              items={ 12 }
              active={ itemActive }
              changedTo={ setItemActive }
            />
          </Box>
          <ProgressBar percentage={percentageProgress} />
        </Box>
      </Box>

      <DialogMainFolder
        display={dialogMainFolderDisplay}
        response={handleCloseDialogMainFolder}
      />

      <DialogRelaunch
        display={dialogRelaunchDisplay}
        response={handleCloseDialogRelaunch}
      />
    </>
  )
}
