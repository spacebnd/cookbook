import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { ENTITIES } from '../../common/constants.js'
import TabContentContainer from './TabContentContainer.js'
import { Fab, Menu, MenuItem, TextField, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import _startCase from 'lodash/startCase'

const useStyles = makeStyles(() => {
  return {
    tabs: {
      marginBottom: '10px',
    },
    addButton: {
      position: 'fixed',
      bottom: '75px',
      right: '20px',
      zIndex: '1000',
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
  const [dropdownAnchor, setDropdownAnchor] = useState(null)

  const changeActiveTab = (event, newValue) => {
    setActiveTab(newValue)
  }

  const changeActiveTabSwipeIndex = (index) => {
    setActiveTab(index)
  }

  const openAddItemDropdown = (event) => {
    setDropdownAnchor(event.currentTarget)
  }

  const closeAddItemDropdown = () => {
    setDropdownAnchor(null)
  }

  const selectItem = (value) => {
    if (value === ENTITIES.RECIPES.value) {
      console.log('select', value)
    } else if (value === ENTITIES.INGREDIENTS.value) {
      console.log('select', value)
    } else if (value === ENTITIES.CATEGORIES.value) {
      console.log('select', value)
    }

    closeAddItemDropdown()
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

      <Box className={classes.addButton}>
        <Fab size="large" color="primary" aria-label="add" onClick={openAddItemDropdown}>
          <AddIcon />
        </Fab>
      </Box>

      <Menu
        id="add-item-menu"
        anchorEl={dropdownAnchor}
        keepMounted
        open={Boolean(dropdownAnchor)}
        onClose={closeAddItemDropdown}
      >
        {Object.values(ENTITIES).map((item, index) => (
          <MenuItem key={item.value + index} onClick={() => selectItem(item.value)}>
            <Typography>{_startCase(item.label.singular)}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
