import React from 'react'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite.js'
import { useDispatch, useSelector } from 'react-redux'
import { ENTITIES } from '../../common/constants.js'
import { setActiveScreen } from '../../store/modules/ui.js'

function NavigationBar() {
  const activeScreen = useSelector((state) => state.ui.activeScreen)
  const dispatch = useDispatch()

  const onNavigationItemClick = (event, value) => {
    dispatch(setActiveScreen(value))
  }

  return (
    <BottomNavigation
      className="navigation-bar__container"
      value={activeScreen}
      onChange={onNavigationItemClick}
      showLabels
    >
      <BottomNavigationAction
        value={ENTITIES.RECIPES.value}
        label={ENTITIES.RECIPES.label}
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        value={ENTITIES.INGREDIENTS.value}
        label={ENTITIES.INGREDIENTS.label}
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        value={ENTITIES.CATEGORIES.value}
        label={ENTITIES.CATEGORIES.label}
        icon={<FavoriteIcon />}
      />
    </BottomNavigation>
  )
}

export default NavigationBar
