import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Button, Collapse } from '@material-ui/core'
import RecipeItem from './RecipeItem.js'
import AutocompleteSearch from '../common/AutocompleteSearch.js'
import SearchIcon from '@material-ui/icons/Search'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { makeStyles } from '@material-ui/core/styles'
import { ENTITIES } from '../../common/constants.js'
import _startCase from 'lodash/startCase'
import {
  selectAllCategories,
  selectAllIngredients,
  selectAllRecipes,
} from '../../store/modules/entities'

const useStyles = makeStyles(() => ({
  searchContainer: {
    marginTop: '15px',
  },
  recipes: {
    marginTop: '15px',
  },
}))

export default function RecipesContainer() {
  const classes = useStyles()
  const allRecipes = useSelector(selectAllRecipes)
  const allIngredients = useSelector(selectAllIngredients)
  const allCategories = useSelector(selectAllCategories)
  const [expanded, setExpanded] = useState(false)

  const expandClickHandler = () => {
    setExpanded(!expanded)
  }

  return (
    <Box component="div">
      <Button variant="contained" size="small" fullWidth onClick={expandClickHandler}>
        <SearchIcon />
        {expanded ? (
          <ExpandLessIcon onClick={expandClickHandler} />
        ) : (
          <ExpandMoreIcon onClick={expandClickHandler} />
        )}
      </Button>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box className={classes.searchContainer}>
          <AutocompleteSearch
            initialOptions={allIngredients}
            label={_startCase(ENTITIES.INGREDIENTS.label.plural)}
            groupBy={'type'}
          />
        </Box>
        <Box className={classes.searchContainer}>
          <AutocompleteSearch
            initialOptions={allCategories}
            label={_startCase(ENTITIES.CATEGORIES.label.plural)}
            groupBy={'firstLetter'}
          />
        </Box>
      </Collapse>
      <Box className={classes.recipes}>
        {allRecipes.map((recipe) => (
          <RecipeItem key={`recipe${recipe.id}`} recipe={recipe} />
        ))}
      </Box>
    </Box>
  )
}
