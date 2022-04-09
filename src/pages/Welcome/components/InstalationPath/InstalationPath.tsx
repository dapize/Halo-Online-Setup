import { FC, useContext, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { IconFolder } from '@tabler/icons';
import { open } from "@tauri-apps/api/dialog";
import { dataDir, join } from '@tauri-apps/api/path';
import { IMainContext, MainContext } from '../../../../contexts/main';

export const InstalationPath: FC = () => {
  const { installationPath, setInstallationPath } = useContext(MainContext) as IMainContext;

  const getFullPath = async ( newPath: string ) => await join(newPath, 'Halo Online');

  const pathInstallationChange = async ( path: string ) => {
    const newPath = await getFullPath( path );
    setInstallationPath( newPath );
  }

  const handleClick = async () => {
    const pathSelected = await open({
      directory: true
    });
    if ( pathSelected ) {
      setInstallationPath( pathSelected as string )
      pathInstallationChange( pathSelected as string )
    }
  }

  useEffect(() => {
    (async () => {
      const dataDirectory = await dataDir();
      const newPath = await getFullPath( dataDirectory );
      setInstallationPath( newPath )
    })();
  }, [ setInstallationPath ])

  return (
    <div>
      <Typography fontSize={12} fontWeight="bold" component="h3" mb="8px" textTransform="uppercase" color="#fff">
        Ruta de instalación
      </Typography>

      <Box
        height="48px"
        px="16px"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        borderRadius="2px"
        color="#C0C0C0"
        sx={{
          backgroundColor: 'rgba(196,196,196, 0.15)',
          transition: 'color 0.5s linear',
          ':hover': {
            color: '#fff',
            cursor: 'pointer'
          }
        }}
        width="100%"
        onClick={handleClick}
      >
        <Typography
          fontSize={15}
          fontWeight="bold"
          component="div"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          overflow="hidden"
          width="521px"
        >
          { installationPath }
        </Typography>
        <Box
          flexShrink={0}
          width="24px"
          height="24px"
          ml="10px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          color="#fff"
          sx={{
            opacity: 0.70,
            transition: 'opacity 0.5s linear',
            ':hover': {
              opacity: 1
            }
          }}
        >
          <IconButton aria-label="Elegir carpeta de instalación" color="inherit">
            <IconFolder />
          </IconButton>
        </Box>
      </Box>
    </div>
  )
}
