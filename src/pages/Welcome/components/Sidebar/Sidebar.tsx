import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Logo from '@assets/logo.png'
import { ImageLogo } from './Sidebar.styled';
import { getVersion } from '@tauri-apps/api/app';
import { message } from '@tauri-apps/api/dialog';

export const Sidebar = () => {
  const [appVersion, setAppVersion] = useState('');
  const versionGetted = useRef<boolean>(false);

  const handleClickShowMessage = async () => {
    await message(`Versión del instalador: ${appVersion}\n\nCreador por Daniel Pezeta`)
  }

  useEffect(() => {
    ( async () => {
      if ( !versionGetted.current ) {
        versionGetted.current = true;
        const version = await getVersion();
        setAppVersion( version );
      }
    })();
  }, [])

  return (
    <Box sx={{ backgroundColor: 'rgba(0,0,0, 0.25)'}} textAlign="center" height="100%" position="relative">
      <ImageLogo src={Logo} alt="Halo Online Title"/>
      <Box position="absolute" bottom="7px" left="12px" sx={{ opacity: '0.5' }} onClick={handleClickShowMessage}>
        <Typography component="span" variant="caption" color="#fff">{appVersion}</Typography>
      </Box>
    </Box>
  )
};
