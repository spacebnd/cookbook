import React from 'react'
import _startCase from 'lodash/startCase'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import { useSelector } from 'react-redux'
import List from '@material-ui/core/List'
import TabContentItem from './TabContentItem.js'
import PropTypes from 'prop-types'
import { convertArrayToAlphabeticalGrouping } from '../../common/utils.js'

const useStyles = makeStyles(() => ({
  root: {
    padding: '10px 0',
  },
}))

TabContentContainer.propTypes = {
  entity: PropTypes.string,
  sortBy: PropTypes.string,
}

export default function TabContentContainer(props) {
  const classes = useStyles()
  const { entity, sortBy } = props

  const allItems = useSelector((state) => state.entities[`all${_startCase(entity)}`])

  const sortedItems = convertArrayToAlphabeticalGrouping(allItems)
    .slice()
    .sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1
      if (a[sortBy] > b[sortBy]) return 1
      return 0
    })

  return (
    <Box className={classes.root}>
      <List component="div">
        {sortedItems.map((item) => (
          <TabContentItem key={entity + item.id} item={item} />
        ))}
      </List>
    </Box>
  )
}
