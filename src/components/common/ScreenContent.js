import React from 'react'
import { useSelector } from 'react-redux'
import { ENTITIES } from '../../common/constants.js'
import { makeStyles } from '@material-ui/core/styles'
import RecipesContainer from '../recipes/RecipesContainer.js'
import IngredientsContainer from '../ingredients/IngredientsContainer.js'
import CategoriesContainer from '../categories/CategoriesContainer.js'

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
    },
  }
})

export default function ScreenContent() {
  const classes = useStyles()

  const activeScreen = useSelector((state) => state.ui.activeScreen)

  let screenContent
  if (activeScreen === ENTITIES.RECIPES.value) {
    screenContent = <RecipesContainer />
  } else if (activeScreen === ENTITIES.INGREDIENTS.value) {
    screenContent = <IngredientsContainer />
  } else if (activeScreen === ENTITIES.CATEGORIES.value) {
    screenContent = <CategoriesContainer />
  }

  return <div className={classes.root}>{screenContent}</div>
}
