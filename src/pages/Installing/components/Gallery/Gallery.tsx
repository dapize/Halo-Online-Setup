import { FC, useEffect, useState } from 'react'
import { Image } from './Gallery.styled';
import { IGallery } from './Gallery.d';

import map1 from '@assets/installing/map01.jpg';
import map2 from '@assets/installing/map02.jpg';
import map3 from '@assets/installing/map03.jpg';
import map4 from '@assets/installing/map04.jpg';
import map5 from '@assets/installing/map05.jpg';
import map6 from '@assets/installing/map06.jpg';
import ingame7 from '@assets/installing/ingame01.jpg';
import ingame8 from '@assets/installing/ingame02.jpg';
import ingame9 from '@assets/installing/ingame03.jpg';
import ingame10 from '@assets/installing/ingame04.jpg';
import ingame11 from '@assets/installing/ingame05.jpg';
import ingame12 from '@assets/installing/ingame06.jpg';

const items = [ map1, map2, map3, map4, map5, map6, ingame7, ingame8, ingame9, ingame10, ingame11, ingame12 ];

export const Gallery: FC<IGallery> = ({ active }) => {
  const [currentItem, setCurrentItem] = useState<number>(active);

  useEffect(() => {
    setCurrentItem( active );
  }, [ active ])

  return (
    <div>
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
    </div>
  )
};
