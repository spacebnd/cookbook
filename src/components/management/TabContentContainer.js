import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import { useSelector } from 'react-redux'
import List from '@material-ui/core/List'
import TabContentItem from './TabContentItem.js'
import PropTypes from 'prop-types'
import { convertArrayToAlphabeticalGrouping } from '../../common/utils.js'
import { selectAllEntitiesByType } from '../../store/modules/entities'
import { ENTITIES } from '../../common/constants'

const useStyles = makeStyles(() => ({
  root: {
    padding: '10px 0',
  },
}))

TabContentContainer.propTypes = {
  entity: PropTypes.string,
  sortBy: PropTypes.string,
}

export default function TabContentContainer({ entity, sortBy }) {
  const classes = useStyles()
  const allItems = useSelector((state) => Object.values(state.entities[entity]))
  const ingredientTypes = useSelector(selectAllEntitiesByType(ENTITIES.INGREDIENT_TYPES.value))

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
          <TabContentItem
            key={entity + item.id}
            entity={entity}
            item={item}
            types={ENTITIES.INGREDIENTS.value ? ingredientTypes : null}
          />
        ))}
      </List>
    </Box>
  )
}
