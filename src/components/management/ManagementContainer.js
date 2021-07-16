import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { ENTITIES } from '../../common/constants.js'
import TabContentContainer from './TabContentContainer.js'
import { TextField } from '@material-ui/core'
import CreateItemButton from './CreateItemButton.js'

const useStyles = makeStyles(() => {
  return {
    tabs: {
      marginBottom: '10px',
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
  const [activeTab, setActiveTab] = React.useState(0)

  const changeActiveTab = (event, newValue) => {
    setActiveTab(newValue)
  }

  const changeActiveTabSwipeIndex = (index) => {
    setActiveTab(index)
  }

  const selectItem = (value) => {
    if (value === ENTITIES.RECIPES.value) {
      console.log('select', value)
    } else if (value === ENTITIES.INGREDIENTS.value) {
      console.log('select', value)
    } else if (value === ENTITIES.CATEGORIES.value) {
      console.log('select', value)
    }
  }

  return (
    <Box>
      <AppBar className={classes.tabs} position="static" color="default">
        <Tabs
          value={activeTab}
          onChange={changeActiveTab}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label={ENTITIES.RECIPES.label.plural} {...a11yProps(0)} />
          <Tab label={ENTITIES.INGREDIENTS.label.plural} {...a11yProps(1)} />
          <Tab label={ENTITIES.CATEGORIES.label.plural} {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <TextField variant="outlined" size="small" fullWidth placeholder="Поиск" />

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeTab}
        onChangeIndex={changeActiveTabSwipeIndex}
      >
        <TabPanel value={activeTab} index={0} dir={theme.direction}>
          <TabContentContainer entity={ENTITIES.RECIPES.value} sortBy="firstLetter" />
        </TabPanel>
        <TabPanel value={activeTab} index={1} dir={theme.direction}>
          <TabContentContainer entity={ENTITIES.INGREDIENTS.value} sortBy="type" />
        </TabPanel>
        <TabPanel value={activeTab} index={2} dir={theme.direction}>
          <TabContentContainer entity={ENTITIES.CATEGORIES.value} sortBy="firstLetter" />
        </TabPanel>
      </SwipeableViews>

      <CreateItemButton selectItemHandler={selectItem} />
    </Box>
  )
}
