import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectActiveManagementTab, setActiveManagementTab } from '../../store/modules/ui'
import { ENTITIES, MANAGEMENT_TAB_INDEXES } from '../../common/constants.js'
import _debounce from 'lodash/debounce'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import logo from '../../assets/images/logo-variant2.png'

import TabContentContainer from './TabContentContainer.js'
import CreateItemButton from './CreateItemButton.js'
import CreateItemModal from './CreateItemModal.js'

const useStyles = makeStyles(() => {
  return {
    root: {
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    tabsBar: {
      marginBottom: '10px',
    },
    tabRoot: {
      textTransform: 'capitalize',
      fontSize: '13px',
    },
    searchContainer: {
      marginTop: '15px',
    },
    logoContainer: {
      height: '35px',
      display: 'flex',
      justifyContent: 'center',
    },
    logo: {
      height: '100%',
      opacity: 0.2,
    },
  }
})

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`management-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  )
}

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

export default function ManagementContainer() {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useDispatch()
  const activeManagementTab = useSelector(selectActiveManagementTab)
  const [titleFilter, setTitleFilter] = useState('')
  const titleValue = useRef(null)

  const tabs = Object.values(ENTITIES).filter(
    (entity) => entity.value !== ENTITIES.INGREDIENT_TYPES.value
  )

  const changeActiveTab = (event, newValue) => {
    titleValue.current.value = null
    setTitleFilter('')
    dispatch(setActiveManagementTab(newValue))
  }

  const changeActiveTabSwipeIndex = (index) => {
    dispatch(setActiveManagementTab(index))
  }

  const titleInputHandler = () => {
    setTitleFilter(titleValue.current.value.toLowerCase())
  }

  return (
    <Box className={classes.root}>
      <Box>
        <AppBar className={classes.tabsBar} position="static" color="default">
          <Tabs
            value={activeManagementTab}
            onChange={changeActiveTab}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            {tabs.map((entity, index) => {
              return (
                <Tab
                  key={entity.value + index}
                  label={entity.label.plural}
                  classes={{ root: classes.tabRoot }}
                  {...a11yProps(index)}
                />
              )
            })}
          </Tabs>
        </AppBar>

        <Box className={classes.searchContainer}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            label="Поиск"
            inputRef={titleValue}
            onChange={_debounce(titleInputHandler, 500)}
          />
        </Box>

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeManagementTab}
          onChangeIndex={changeActiveTabSwipeIndex}
        >
          <TabPanel
            value={activeManagementTab}
            index={MANAGEMENT_TAB_INDEXES[ENTITIES.RECIPES.value]}
            dir={theme.direction}
          >
            <TabContentContainer
              entity={ENTITIES.RECIPES.value}
              titleFilter={titleFilter}
              sortBy="firstLetter"
            />
          </TabPanel>
          <TabPanel
            value={activeManagementTab}
            index={MANAGEMENT_TAB_INDEXES[ENTITIES.INGREDIENTS.value]}
            dir={theme.direction}
          >
            <TabContentContainer
              entity={ENTITIES.INGREDIENTS.value}
              titleFilter={titleFilter}
              sortBy="firstLetter"
            />
          </TabPanel>
          <TabPanel
            value={activeManagementTab}
            index={MANAGEMENT_TAB_INDEXES[ENTITIES.CATEGORIES.value]}
            dir={theme.direction}
          >
            <TabContentContainer
              entity={ENTITIES.CATEGORIES.value}
              titleFilter={titleFilter}
              sortBy="firstLetter"
            />
          </TabPanel>
        </SwipeableViews>
      </Box>

      <Box className={classes.logoContainer}>
        <img src={logo} className={classes.logo} alt="CookBook logo" />
      </Box>

      <CreateItemButton />

      <CreateItemModal />
    </Box>
  )
}
