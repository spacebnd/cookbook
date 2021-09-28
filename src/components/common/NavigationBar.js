import { useDispatch, useSelector } from 'react-redux'
import { selectActiveScreen, selectIsLoading, setActiveScreen } from '../../store/modules/ui.js'
import { SCREENS } from '../../common/constants.js'
import { makeStyles } from '@material-ui/core/styles'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import SubjectIcon from '@material-ui/icons/Subject'
import SettingsIcon from '@material-ui/icons/Settings'
import { theme } from '../../common/theme'

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: theme.palette.primary.dark,
  },
}))

export default function NavigationBar() {
  const classes = useStyles()
  const activeScreen = useSelector(selectActiveScreen)
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)

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
        disabled={isLoading}
      />
      <BottomNavigationAction
        value={SCREENS.MANAGEMENT.value}
        label={SCREENS.MANAGEMENT.label}
        icon={<SettingsIcon />}
        disabled={isLoading}
      />
    </BottomNavigation>
  )
}
