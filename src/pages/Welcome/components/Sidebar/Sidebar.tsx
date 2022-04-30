import { Box } from '@mui/material';
import Logo from '@assets/logo.png'
import { ImageLogo } from './Sidebar.styled';

export const Sidebar = ({ ...props }) => {
  return (
    <Box width={273} sx={{ backgroundColor: 'rgba(0,0,0, 0.25)'}} textAlign="center" { ...props }>
      <ImageLogo src={Logo} alt="Halo Online Title"/>
    </Box>
  )
}
