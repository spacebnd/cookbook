import React from 'react'
import { useSelector } from 'react-redux'
import { SCREENS } from '../common/constants.js'
import { Box } from '@material-ui/core'
import NavigationBar from '../components/common/NavigationBar.js'
import ScreenContent from '../components/common/ScreenContent.js'
import ActionButtons from '../components/common/ActionButtons.js'

export default function HomeScreen() {
  const activeScreen = useSelector((state) => state.ui.activeScreen)

  return (
    <Box component="div">
      <ScreenContent />
      <NavigationBar />
      {activeScreen === SCREENS.SEARCH.value && <ActionButtons />}
    </Box>
  )
}
