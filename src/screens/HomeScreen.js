import React from 'react'
import { Box } from '@material-ui/core'
import NavigationBar from '../components/common/NavigationBar.js'
import ScreenContent from '../components/common/ScreenContent.js'

export default function HomeScreen() {
  return (
    <Box component="div">
      <ScreenContent />
      <NavigationBar />
    </Box>
  )
}
