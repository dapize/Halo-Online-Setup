import { Box } from '@mui/material'
import { FC } from 'react'
import Styles from './ProgressBar.module.css'
import { IProgressBar } from './ProgressBar.d';

export const ProgressBar: FC<IProgressBar> = ({ percentage }) => {
  return (
    <Box position="relative" height="14px">
      <Box
        bgcolor="#1a1a1a"
        height="100%"
        width="100%"
        className={Styles.bgBar}
      ></Box>
      <Box
        height="100%"
        width="100%"
        bgcolor="#2196F3"
        position="absolute"
        top={0}
        left={0}
        sx={{
          borderTopRightRadius: '2px',
          borderBottomRightRadius: '2px',
          transition: 'max-width 0.2s linear'
        }}
        maxWidth={`${percentage}%`}
      >
      </Box>
    </Box>
  )
}
