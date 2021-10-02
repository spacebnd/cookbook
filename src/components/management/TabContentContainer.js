import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectAllEntitiesByType } from '../../store/modules/entities'
import { ENTITIES } from '../../common/constants'
import { convertArrayToAlphabeticalGroupingByTitle } from '../../common/utils.js'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'

import TabContentItem from './TabContentItem.js'

const useStyles = makeStyles(() => ({
  root: {
    padding: '10px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}))

TabContentContainer.propTypes = {
  entity: PropTypes.string,
  sortBy: PropTypes.string,
  titleFilter: PropTypes.string,
}

export default function TabContentContainer({ entity, sortBy, titleFilter }) {
  const classes = useStyles()

  const allItems = useSelector((state) => Object.values(state.entities[entity]))
  const ingredientTypes = useSelector(selectAllEntitiesByType(ENTITIES.INGREDIENT_TYPES.value))

  const filterEntitiesByTitle = (initialArray, filterString) => {
    return initialArray.filter((entity) => {
      return entity.title.toLowerCase().includes(filterString)
    })
  }

  let sortedItems = convertArrayToAlphabeticalGroupingByTitle(allItems)
    .slice()
    .sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1
      if (a[sortBy] > b[sortBy]) return 1
      return 0
    })

  if (titleFilter) {
    sortedItems = filterEntitiesByTitle(sortedItems, titleFilter)
  }

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
