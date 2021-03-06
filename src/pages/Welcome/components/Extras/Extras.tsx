import { FC, useContext } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { IChecksItems, IExtras } from './Extras.d';
import { CheckBox } from '@components/CheckBox';
import { IMainContext, MainContext } from '@contexts/main';
import { useTranslation } from 'react-i18next';

export const Extras: FC<IExtras> = ({ onClickDialogOpen }) => {
  const { extraChecks, setExtraChecks } = useContext(MainContext) as IMainContext;
  const { t } = useTranslation();

  const handleOnChange = ( value: string, checked: boolean ) => {
    setExtraChecks( ( currentChecks: IChecksItems ) => {
      return {
        ...currentChecks,
        [ value ]: checked
      }
    })
  }

  return (
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
              onClick={ onClickDialogOpen }
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
  )
}
