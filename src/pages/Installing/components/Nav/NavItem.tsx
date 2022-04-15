import { Box } from '@mui/material'
import { FC } from 'react';
import { INavItem } from './NavItem.d';

export const NavItem: FC<INavItem> = ({ active, ...props }) => {
  return (
    <Box
      width="10px"
      height="10px"
      border="1px solid #fff"
      sx={{
        opacity: active ? 1 : '0.25',
        transition: 'opacity 0.5s, background-color 0.5s',
        cursor: 'pointer',
        '&:hover': {
          opacity: 1
        }
      }}
      bgcolor={ active ? '#2196F3' : 'transparent' }
      { ...props }
    ></Box>
  )
}
