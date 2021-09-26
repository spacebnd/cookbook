import React from 'react'
import { useSelector } from 'react-redux'
import { NAVIGATION_BAR_HEIGHT, SCREENS } from '../../common/constants.js'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import RecipesContainer from '../recipes/RecipesContainer.js'
import ManagementContainer from '../management/ManagementContainer.js'
import { selectActiveScreen } from '../../store/modules/ui'

const useStyles = makeStyles(() => {
  return {
    root: {
      height: `calc(100vh - ${NAVIGATION_BAR_HEIGHT}px)`,
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
  const activeScreen = useSelector(selectActiveScreen)

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
