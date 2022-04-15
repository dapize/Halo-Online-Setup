import { Box } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { Image } from './Gallery.styled';
import { IGallery } from './Gallery.d';

export const Gallery: FC<IGallery> = ({ items, active }) => {
  const [currentItem, setCurrentItem] = useState<number>(active);

  useEffect(() => {
    setCurrentItem( active );
  }, [ active ])

  return (
    <Box>
      {
        items.map(( item: string, index: number ) => (
          <Image
            src={item}
            alt={`Map ${index}`}
            active={currentItem === index}
            key={`map-${index}`}
          />
        ))
      }
    </Box>
  )
};
