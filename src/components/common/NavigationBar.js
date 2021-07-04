import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveScreen } from '../../store/modules/ui.js'
import { ENTITIES } from '../../common/constants.js'
import { makeStyles } from '@material-ui/core/styles'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite.js'

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
}))

export default function NavigationBar() {
  const classes = useStyles()

  const activeScreen = useSelector((state) => state.ui.activeScreen)
  const dispatch = useDispatch()

  const onNavigationItemClick = (event, value) => {
    dispatch(setActiveScreen(value))
  }

  return (
    <BottomNavigation
      className={classes.root}
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
