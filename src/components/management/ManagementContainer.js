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
import { Fab, TextField } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

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

const TabPanel = (props) => {
  const { children, value, index, ...other } = props

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
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
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index) => {
    setValue(index)
  }

  return (
    <Box>
      <AppBar className={classes.tabs} position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label={ENTITIES.INGREDIENTS.label} {...a11yProps(0)} />
          <Tab label={ENTITIES.CATEGORIES.label} {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <TextField variant="outlined" size="small" fullWidth placeholder="Поиск" />

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <TabContentContainer entity={ENTITIES.INGREDIENTS.value} sortBy="type" />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <TabContentContainer entity={ENTITIES.CATEGORIES.value} sortBy="firstLetter" />
        </TabPanel>
      </SwipeableViews>

      <Box className={classes.addButton}>
        <Fab size="large" color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  )
}
