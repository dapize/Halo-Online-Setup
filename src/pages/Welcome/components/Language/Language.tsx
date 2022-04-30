import { FC, useContext, useRef, useState } from 'react';
import i18n from 'i18next';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';
import { MenuSelect, IMenuSelectItem } from '../MenuSelect';
import { Box, IconButton, Typography } from '@mui/material';
import { IMainContext, MainContext } from '@contexts/main';
import { TLanguage } from './Language.d';
import { useTranslation } from 'react-i18next';

export const Language: FC = () => {
  const { language, setLanguage } = useContext(MainContext) as IMainContext;
  const { t } = useTranslation();
  const [selectDisplay, setSelectDisplay] = useState<boolean>(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const selectItems: IMenuSelectItem[] = [
    {
      label: t('welcome.body.language.options.es'),
      value: 'es'
    },
    {
      label: t('welcome.body.language.options.en'),
      value: 'en'
    }
  ]

  const itemSelected = selectItems.find( (item: IMenuSelectItem ) => item.value === language );

  const handleToggle = () => {
    setSelectDisplay((prevOpen) => !prevOpen);
  };

  const onSelectClose = ( item?: IMenuSelectItem ) => {
    if ( item ) {
      const newLng = item.value as TLanguage;
      setLanguage( newLng );
      i18n.changeLanguage( newLng );
    }
    setSelectDisplay(false)
  }

  return (
    <div>
      <Typography fontSize={12} fontWeight="bold" component="h3" mb="8px" textTransform="uppercase" color="#fff">
        { t('welcome.body.language.title') }
      </Typography>

      <Box
        onClick={handleToggle}
        height="48px"
        color="#C0C0C0"
        sx={{
          backgroundColor: 'rgba(196,196,196, 0.15)',
          ':hover': {
            cursor: 'pointer',
            color: '#fff'
          }
        }}
        px="16px"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        borderRadius="2px"
        ref={anchorRef}
      >
        <Typography fontSize={15} fontWeight="bold" component="div" color="inherit" maxWidth="100%" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden" flexGrow={1}>
          { itemSelected?.label }
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
          <IconButton aria-label="Seleccionar el idioma" color="inherit">
            {
              selectDisplay
                ? <IconChevronUp />
                : <IconChevronDown />
            }
          </IconButton>
        </Box>
      </Box>

      <MenuSelect
        display={selectDisplay}
        onClose={onSelectClose}
        anchorRef={anchorRef}
        value={language}
        items={selectItems}
      />
    </div>
  )
}
