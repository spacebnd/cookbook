import React from 'react'
import NavigationBar from '../components/common/NavigationBar.js'
import ScreenContent from '../components/common/ScreenContent.js'
import { Box } from '@material-ui/core'

export default function HomeScreen() {
  return (
    <Box component="div" className="home-screen__container">
      <ScreenContent />
      <NavigationBar />
    </Box>
  )
}
