import { Stack } from '@mui/material'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { NavItem } from './NavItem'
import { INav } from './Nav.d';

export const Nav: FC<INav> = ({ active, items, changedTo }) => {
  const [currentActive, setCurrentActive] = useState<number>(active);
  const currentInit = useRef<null | ReturnType<typeof setTimeout>>(null);
  const totalItems = Array(items).fill('item');

  const handleLoop = useCallback(() => {
    if ( currentInit.current !== null ) {
      clearInterval( currentInit.current as ReturnType<typeof setTimeout> );
    }
    const tOut = setInterval(() => {
      setCurrentActive(( current: number ) => {
        const nextToActive = current + 1;
        const finalNewCurrent = nextToActive > 5 ? 0 : nextToActive;
        changedTo( finalNewCurrent )
        return finalNewCurrent;
      })
    }, 4500);
    currentInit.current = tOut;
  }, [ changedTo ] );

  const handleOnClickItem = ( index: number ) => {
    if ( currentActive !== index ) {
      setCurrentActive( index );
      handleLoop();
      changedTo( index );
    }
  }

  useEffect(() => {
    handleLoop();
  }, [ handleLoop ])

  useEffect(() => {
    setCurrentActive( active );
  }, [ active ])

  return (
    <Stack direction="row" spacing="5px">
      {
        totalItems.map(( item: string, index: number ) => (
          <NavItem
            onClick={ () => handleOnClickItem( index ) }
            active={ index === currentActive }
            key={`item-${index}`}
          />
        ))
      }
    </Stack>
  )
}
