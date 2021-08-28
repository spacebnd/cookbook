import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { ENTITIES, MANAGEMENT_TAB_INDEXES } from '../../common/constants.js'
import TabContentContainer from './TabContentContainer.js'
import { TextField } from '@material-ui/core'
import CreateItemButton from './CreateItemButton.js'
import CreateItemModal from './CreateItemModal.js'
import { useDispatch, useSelector } from 'react-redux'
import { selectActiveManagementTab, setActiveManagementTab } from '../../store/modules/ui'

const useStyles = makeStyles(() => {
  return {
    tabsBar: {
      marginBottom: '10px',
    },
    tabRoot: {
      textTransform: 'capitalize',
      fontSize: '13px',
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

  const tabs = Object.values(ENTITIES).filter(
    (entity) => entity.value !== ENTITIES.INGREDIENT_TYPES.value
  )

  const changeActiveTab = (event, newValue) => {
    dispatch(setActiveManagementTab(newValue))
  }

  const changeActiveTabSwipeIndex = (index) => {
    dispatch(setActiveManagementTab(index))
  }

  return (
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

      <TextField variant="outlined" size="small" fullWidth placeholder="Поиск" />

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
          <TabContentContainer entity={ENTITIES.RECIPES.value} sortBy="firstLetter" />
        </TabPanel>
        <TabPanel
          value={activeManagementTab}
          index={MANAGEMENT_TAB_INDEXES[ENTITIES.INGREDIENTS.value]}
          dir={theme.direction}
        >
          <TabContentContainer entity={ENTITIES.INGREDIENTS.value} sortBy="type" />
        </TabPanel>
        <TabPanel
          value={activeManagementTab}
          index={MANAGEMENT_TAB_INDEXES[ENTITIES.CATEGORIES.value]}
          dir={theme.direction}
        >
          <TabContentContainer entity={ENTITIES.CATEGORIES.value} sortBy="firstLetter" />
        </TabPanel>
      </SwipeableViews>

      <CreateItemButton />

      <CreateItemModal />
    </Box>
  )
}
