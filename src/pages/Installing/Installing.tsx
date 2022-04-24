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
import { DialogConfirm, TOption } from './components/DialogConfirm';

import { IResponse } from './Installing.d';

import map1 from '../../assets/installing/map01.jpg';
import map2 from '../../assets/installing/map02.jpg';
import map3 from '../../assets/installing/map03.jpg';
import map4 from '../../assets/installing/map04.jpg';
import map5 from '../../assets/installing/map05.jpg';
import map6 from '../../assets/installing/map06.jpg';
import { chooseInstallationPath } from '../../helpers/chooseInstallationPath';

const galleryItems = [ map1, map2, map3, map4, map5, map6 ];

export const Installing = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const nav = useNavigate();
  const [ itemActive, setItemActive ] = useState<number>(0);
  const [ percentageProgress, setPercentageProgress ] = useState<number>(0);
  const { installationPath, language, setInstallationPath } = useContext(MainContext) as IMainContext;
  const uniqueReques = useRef<boolean>(false);
  const [dialogDisplay, setDialogDisplay] = useState<boolean>(true);

  const reqFilesList = useCallback( async () => {
    try {
      const getFilesList: Response<IResponse> = await fetch(`http://localhost:8000/files?language=${language}`);
      console.log('new installationPath: ', installationPath);
      const getFiles = new Downloader( getFilesList.data.list, installationPath );
      getFiles.on('error', ( err: unknown ) => {
        console.log('ocurriò un error: ', err );
      });
      getFiles.on('finish', ( err: unknown ) => {
        console.log('termino de descargar');
        if ( err ) {
          console.log('finalizò pero con error');
        }
      });
      getFiles.on('progress', ( percentage: number ) => {
        setPercentageProgress( percentage )
      });

    } catch ( err ) {
      console.log('error en la consulta inicial');
    }
  }, [ language, installationPath ]);

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
          setDialogDisplay( true );
        }
      } catch ( err ) {
        enqueueSnackbar(t('installing.errors.creatingInstallationFolder'), { variant: 'error' });
      }
    },
    [ installationPath, mainFolderChecker, reqFilesList, enqueueSnackbar, t ],
  );

  const handleCloseDialog = async ( option: TOption ) => {
    setDialogDisplay( false );
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
        if ( newInstallationPath )  setInstallationPath( newInstallationPath );
        initInstallation();
        break;

      case 'cancel':
        nav('/final', { replace: true, state: { } });
        console.log('ir a la pàgina de finalizar');
        break;
    }
  }

  useEffect(() => {
    if ( !uniqueReques.current ) {
      uniqueReques.current = true;
      //initInstallation();
    };
  }, [ ])

  return (
    <>
      <Box width="100%" height="518px">
        <Gallery
          items={ galleryItems }
          active={ itemActive }
        />

        <Box position="absolute" bottom={0} left={0} width="100%" zIndex={15}>
          <Box display="flex" justifyContent="space-between" alignItems="center" px="7px" mb="7px">
            <Typography fontSize={10} lineHeight="12px" color="#fff" component="span" onClick={reqFilesList}>
              { t('installing.footer.title') }
            </Typography>
            <Nav
              items={ galleryItems.length }
              active={ itemActive }
              changedTo={ setItemActive }
            />
          </Box>
          <ProgressBar percentage={percentageProgress} />
        </Box>
      </Box>

      <DialogConfirm
        display={dialogDisplay}
        response={handleCloseDialog}
      />
    </>
  )
}
