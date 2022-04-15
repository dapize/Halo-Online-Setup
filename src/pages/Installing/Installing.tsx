import { useState } from 'react';
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next';

import { Gallery } from './components/Gallery'
import { Nav } from './components/Nav';
import { ProgressBar } from './components/ProgressBar';

import map1 from '../../assets/installing/map01.jpg';
import map2 from '../../assets/installing/map02.jpg';
import map3 from '../../assets/installing/map03.jpg';
import map4 from '../../assets/installing/map04.jpg';
import map5 from '../../assets/installing/map05.jpg';
import map6 from '../../assets/installing/map06.jpg';

const galleryItems = [ map1, map2, map3, map4, map5, map6 ];

export const Installing = () => {
  const { t } = useTranslation();
  const [itemActive, setItemActive] = useState<number>(0);

  return (
    <Box width="100%" height="518px">
      <Gallery
        items={ galleryItems }
        active={ itemActive }
      />

      <Box position="absolute" bottom={0} left={0} width="100%" zIndex={15}>
        <Box display="flex" justifyContent="space-between" alignItems="center" px="7px" mb="7px">
          <Typography fontSize={10} lineHeight="12px" color="#fff" component="span">
            { t('installing.footer.title') } 25%
          </Typography>
          <Nav
            items={ galleryItems.length }
            active={ itemActive }
            changedTo={ setItemActive }
          />
        </Box>
        <ProgressBar percentage={25} />
      </Box>
    </Box>
  )
}
