import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveScreen } from '../../store/modules/ui.js'
import { SCREENS } from '../../common/constants.js'
import { makeStyles } from '@material-ui/core/styles'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import SubjectIcon from '@material-ui/icons/Subject'
import SearchIcon from '@material-ui/icons/Search'
import SettingsIcon from '@material-ui/icons/Settings'

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
        value={SCREENS.RECIPES.value}
        label={SCREENS.RECIPES.label}
        icon={<SubjectIcon />}
      />
      <BottomNavigationAction
        value={SCREENS.SEARCH.value}
        label={SCREENS.SEARCH.label}
        icon={<SearchIcon />}
      />
      <BottomNavigationAction
        value={SCREENS.MANAGEMENT.value}
        label={SCREENS.MANAGEMENT.label}
        icon={<SettingsIcon />}
      />
    </BottomNavigation>
  )
}
