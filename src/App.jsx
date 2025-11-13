import React from 'react'
import { Box } from '@mui/material'
import { Hero } from './sections/hero'

export const App = () => {
  return (
    <Box>
      <Box component={'header'}>
        <Hero />
        <Hero />
      </Box>
    </Box>
  )
}
