import React from 'react'
import PropTypes from 'prop-types'
import { ENTITIES } from '../../common/constants.js'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import IngredientItem from './IngredientItem.js'
import CategoryItem from './CategoryItem.js'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(() => ({
  root: {
    padding: '10px 0',
  },
}))

TabContentContainer.propTypes = {
  type: PropTypes.string,
}

const itemOptions = {
  [ENTITIES.INGREDIENTS.value]: {
    component: IngredientItem,
    itemsKey: 'allIngredients',
  },
  [ENTITIES.CATEGORIES.value]: {
    component: CategoryItem,
    itemsKey: 'allCategories',
  },
}

export default function TabContentContainer(props) {
  const classes = useStyles()
  const { type } = props

  const allItems = useSelector((state) => state.entities[itemOptions[type].itemsKey])
  const ItemComponent = itemOptions[type].component

  return (
    <Box className={classes.root}>
      {allItems.map((item) => (
        <ItemComponent key={item.id} item={item} />
      ))}
    </Box>
  )
}
