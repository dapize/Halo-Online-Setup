import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material'
import { fetch, Response } from '@tauri-apps/api/http';
import { createDir, removeDir } from '@tauri-apps/api/fs';
import { relaunch } from '@tauri-apps/api/process';

import { Downloader } from '@helpers/Downloader';
import { chooseInstallationPath } from '@helpers/chooseInstallationPath';
import { existsFolder } from '@helpers/existsFolder';

import { IMainContext, MainContext } from '@contexts/main';
import { ConfirmationDialog, IButton } from '@components/ConfirmationDialog';

import { Gallery } from './components/Gallery'
import { Nav } from './components/Nav';
import { ProgressBar } from './components/ProgressBar';

import { IResponse } from './Installing.d';

export const Installing = () => {
  const { t } = useTranslation();
  const nav = useNavigate();
  const { installationPath, language, setInstallationPath } = useContext(MainContext) as IMainContext;
  const [ itemActive, setItemActive ] = useState<number>(0);
  const [ percentageProgress, setPercentageProgress ] = useState<number>(0);
  const [dialogMainFolderDisplay, setDialogMainFolderDisplay] = useState<boolean>(false);
  const [dialogRemovingDisplay, setDialogRemovingDisplay] = useState<boolean>(false);
  const [dialogRelaunchDisplay, setDialogRelaunchDisplay] = useState<boolean>(false);
  const [dialogCreatingDisplay, setDialogCreatingDisplay] = useState<boolean>(false);
  const chooseOtherFolder = useRef<boolean>(false);
  const uniqueRequest = useRef<boolean>(false);
  const urlToGetFiles = `${process.env.REACT_APP_API}/files?language=${language}`;

  const cancelInstallation = useCallback(
    () => {
      nav('/result', { replace: true, state: { type: 'cancelled' }});
    },
    [ nav ],
  );

  const dialogCloserHandler = ( reason: string ) => {
    if ( reason && reason === 'backdropClick' ) {
      cancelInstallation()
    }
  }

  const buttonsRelaunchDialog: IButton[] = [
    {
      label: t('installing.dialogs.relaunch.buttons.cancel'),
      action: () => cancelInstallation()
    },
    {
      label: t('installing.dialogs.relaunch.buttons.relaunch'),
      action: async () => await relaunch(),
      variant: 'contained',
      autoFocus: true
    }
  ];

  const reqFilesList = useCallback( async () => {
    try {
      const getFilesList: Response<IResponse> = await fetch(urlToGetFiles);
      const getFiles = new Downloader( getFilesList.data.list, installationPath );
      getFiles.on('error', () => {
        setDialogRelaunchDisplay(true);
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
      setDialogRelaunchDisplay(true);
    }
  }, [ urlToGetFiles, installationPath, nav ]);

  const initInstallation = useCallback(
    async () => {
      try {
        const existsMainFolder = await existsFolder( installationPath );
        if ( existsMainFolder ) {
          setDialogMainFolderDisplay(true)
        } else {
          await createDir( installationPath );
          reqFilesList();
        }
      } catch ( err ) {
        setDialogCreatingDisplay(true);
      }
    },
    [ installationPath, reqFilesList ],
  );

  const removeInstallationFolder = async () => {
    try {
      await removeDir( installationPath, { recursive: true });
      initInstallation();
    } catch ( err: unknown ) {
      setDialogRemovingDisplay(true);
    }
  }

  const buttonsRemovingDialog: IButton[] = [
    {
      label: t('installing.dialogs.removingFolder.buttons.cancel'),
      action: () => cancelInstallation()
    },
    {
      label: t('installing.dialogs.removingFolder.buttons.retry'),
      action: async () => {
        setDialogRemovingDisplay(false);
        await removeInstallationFolder();
      },
      variant: 'contained',
      autoFocus: true
    }
  ]

  const buttonsCreatingDialog: IButton[] = [
    {
      label: t('installing.dialogs.creatingFolder.buttons.cancel'),
      action: () => cancelInstallation()
    },
    {
      label: t('installing.dialogs.creatingFolder.buttons.retry'),
      action: async () => {
        setDialogCreatingDisplay(false);
        await initInstallation();
      },
      variant: 'contained',
      autoFocus: true
    }
  ]

  const buttonsMainFolderDialog: IButton[] = [
    {
      label: t('installing.dialogs.mainFolder.buttons.cancel'),
      action: () => cancelInstallation(),
      sx: {
        mr: 'auto'
      }
    },
    {
      label: t('installing.dialogs.mainFolder.buttons.chooseOther'),
      variant: 'outlined',
      action: async () => {
        const newInstallationPath = await chooseInstallationPath();
        if ( newInstallationPath ) {
          setDialogMainFolderDisplay(false);
          chooseOtherFolder.current = true;
          setInstallationPath( newInstallationPath );
        }
      }
    },
    {
      label: t('installing.dialogs.mainFolder.buttons.overwrite'),
      variant: 'contained',
      action: () => {
        setDialogMainFolderDisplay(false);
        removeInstallationFolder();
      }
    }
  ]

  useEffect(() => {
    if ( uniqueRequest.current && chooseOtherFolder.current) {
      chooseOtherFolder.current = false;
      initInstallation();
    }
  }, [ installationPath, initInstallation ])

  useEffect(() => {
    if ( !uniqueRequest.current ) {
      uniqueRequest.current = true;
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

      <ConfirmationDialog
        type="info"
        title={ t('installing.dialogs.mainFolder.title') }
        display={ dialogMainFolderDisplay }
        onClose={ ( event: object, reason: string ) => dialogCloserHandler(reason)}
        buttons={buttonsMainFolderDialog}
      >
        { t('installing.dialogs.mainFolder.description') }
        <Box component="strong" display="block" mt={1}>
          { t('installing.dialogs.mainFolder.question') }
        </Box>
      </ConfirmationDialog>

      <ConfirmationDialog
        type="error"
        title={ t('installing.dialogs.creatingFolder.title') }
        display={ dialogCreatingDisplay }
        onClose={ ( event: object, reason: string ) => dialogCloserHandler(reason)}
        buttons={buttonsCreatingDialog}
      >
        { t('installing.dialogs.creatingFolder.description') }
        <Box component="strong" display="block" mt={1}>
          { t('installing.dialogs.creatingFolder.question') }
        </Box>
      </ConfirmationDialog>

      <ConfirmationDialog
        type="error"
        title={t('installing.dialogs.relaunch.title')}
        display={ dialogRelaunchDisplay }
        onClose={ ( event: object, reason: string ) => dialogCloserHandler(reason)}
        buttons={buttonsRelaunchDialog}
      >
        { t('installing.dialogs.relaunch.description') }
        <Box component="strong" display="block" mt={1}>
          { t('installing.dialogs.relaunch.question') }
        </Box>
      </ConfirmationDialog>

      <ConfirmationDialog
        type="error"
        title={ t('installing.dialogs.removingFolder.title') }
        display={ dialogRemovingDisplay }
        onClose={ ( event: object, reason: string ) => dialogCloserHandler(reason)}
        buttons={buttonsRemovingDialog}
      >
        { t('installing.dialogs.removingFolder.description') }
        <Box component="strong" display="block" mt={1}>
          { t('installing.dialogs.removingFolder.question') }
        </Box>
      </ConfirmationDialog>
    </>
  )
}
