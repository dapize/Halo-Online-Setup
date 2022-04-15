import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from "react-i18next"

import { InstalationPath } from '../InstalationPath';
import { Language } from '../Language';
import { Extras } from '../Extras';


export const Body = () => {
  const { t } = useTranslation();

  return (
    <Box width="100%" height={438} sx={{ backgroundColor: 'rgba(0,0,0, 0.95)' }} p="30px">
      <Box mb="35px" display="flex" justifyContent="flex-start" alignItems="baseline">
        <Typography color="#fff" component="h1" fontSize={24} >{t('welcome.header.title')}</Typography>
        <Typography color="#797474" component="span" fontSize={13} ml={1} fontWeight="bold">0.6.1.0</Typography>
      </Box>

      <Stack spacing={3}>
        <InstalationPath/>
        <Language/>
        <Extras/>
      </Stack>
    </Box>
  )
}
