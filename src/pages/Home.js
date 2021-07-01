import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import RestoreIcon from '@material-ui/icons/Restore'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import { setActiveScreen } from '../store/modules/ui.js'

function Home() {
  const activeScreen = useSelector((state) => state.ui.activeScreen)
  const dispatch = useDispatch()

  return (
    <BottomNavigation
      value={activeScreen}
      onChange={(event, value) => dispatch(setActiveScreen(value))}
      showLabels
    >
      <BottomNavigationAction value="recipes" label="Рецепты" icon={<RestoreIcon />} />
      <BottomNavigationAction value="ingredients" label="Ингредиенты" icon={<FavoriteIcon />} />
      <BottomNavigationAction value="categories" label="Категории" icon={<LocationOnIcon />} />
    </BottomNavigation>
  )
}

export default Home
