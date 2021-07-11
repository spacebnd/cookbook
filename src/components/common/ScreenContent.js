import React from 'react'
import { useSelector } from 'react-redux'
import { SCREENS } from '../../common/constants.js'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import RecipesContainer from '../recipes/RecipesContainer.js'
import ManagementContainer from '../management/ManagementContainer.js'

const useStyles = makeStyles(() => {
  const navigationBarHeight = 56
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: `calc(100vh - ${navigationBarHeight}px)`,
      width: '100%',
      boxSizing: 'border-box',
      padding: '10px',
      backgroundColor: 'lightgray',
      overflowY: 'auto',
    },
  }
})

export default function ScreenContent() {
  const classes = useStyles()
  const activeScreen = useSelector((state) => state.ui.activeScreen)

  let screenContent
  if (activeScreen === SCREENS.RECIPES.value) {
    screenContent = <RecipesContainer />
  } else if (activeScreen === SCREENS.MANAGEMENT.value) {
    screenContent = <ManagementContainer />
  }

  return (
    <Box component="div" className={classes.root}>
      {screenContent}
    </Box>
  )
}
