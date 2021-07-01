import React from 'react'
import RecipesContainer from '../recipes/RecipesContainer.js'
import IngredientsContainer from '../ingredients/IngredientsContainer.js'
import CategoriesContainer from '../categories/CategoriesContainer.js'
import { useSelector } from 'react-redux'
import { ENTITIES } from '../../common/constants.js'

function ScreenContent() {
  const activeScreen = useSelector((state) => state.ui.activeScreen)

  let screenContent
  if (activeScreen === ENTITIES.RECIPES.value) {
    screenContent = <RecipesContainer />
  } else if (activeScreen === ENTITIES.INGREDIENTS.value) {
    screenContent = <IngredientsContainer />
  } else if (activeScreen === ENTITIES.CATEGORIES.value) {
    screenContent = <CategoriesContainer />
  }

  return <div className="screen-content__container">{screenContent}</div>
}

export default ScreenContent
