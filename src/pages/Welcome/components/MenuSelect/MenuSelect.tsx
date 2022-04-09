import { FC } from 'react'
import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import { IMenuSelect, IMenuSelectItem } from './MenuSelect.d';

export const MenuSelect: FC<IMenuSelect> = ({ display, anchorRef, onClose, items, value }) => {
  const onClickItem = ( item: IMenuSelectItem ) => {
    onClose( item );
  }

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      onClose();
    } else if (event.key === 'Escape') {
      onClose();
    }
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if ( anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    onClose();
  };

  return (
    <Popper
      open={display}
      anchorEl={anchorRef.current}
      role={undefined}
      placement="bottom-start"
      sx={{
        width: '587px',
        zIndex: 1
      }}
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin: 'center top',
          }}
        >
          <Paper
            sx={{
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
              width: '100%',
              color: '#C0C0C0',
              backgroundColor: '#0F0F0F',
              border: '1px solid rgba(196,196,196, 0.15)',
              borderTop: 0
            }}
          >
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={display}
                onKeyDown={handleListKeyDown}
              >
                {
                  items.map(( item: IMenuSelectItem, index: number ) =>(
                    <MenuItem
                      onClick={() => onClickItem( item )}
                      sx={{ fontSize: '15px', ':hover': { color: '#fff', background: 'rgba(196,196,196, 0.15)' } }}
                      key={`${item.value}-${index}`}
                      disabled={ value === item.value }
                    >
                      { item.label }
                    </MenuItem>
                  ))
                }
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  )
}
