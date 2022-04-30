import { Sidebar } from './components/Sidebar';
import { Body } from './components/Body';
import { Footer } from './components/Footer';
import { Box } from '@mui/material';
import Background from '@assets/welcome/background.png'

export const Welcome = () => {
  return (
    <Box
      width="100w"
      height="100vh"
      display="flex"
      justifyContent="center"
      sx={{
        backgroundImage: `url(${Background})`,
        backgroundRepeat: 'no-repeat',
      }}
      component="main"
    >
      <Sidebar flexShrink={0}/>
      <Box width={673}>
        <Body />
        <Footer/>
      </Box>
    </Box>
  )
}
