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
import { selectAllEntitiesByType } from '../../store/modules/entities'

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
  const allRecipes = useSelector(selectAllEntitiesByType(ENTITIES.RECIPES.value))
  const allIngredients = useSelector(selectAllEntitiesByType(ENTITIES.INGREDIENTS.value))
  const allIngredientTypes = useSelector(selectAllEntitiesByType(ENTITIES.INGREDIENT_TYPES.value))
  const allCategories = useSelector(selectAllEntitiesByType(ENTITIES.CATEGORIES.value))

  const [expanded, setExpanded] = useState(false)
  const [ingredientFilters, setIngredientsFilters] = useState([])
  const [categoryFilters, setCategoriesFilters] = useState([])

  const ingredientsInputHandler = (payload) => {
    setIngredientsFilters(payload)
  }

  const categoriesInputHandler = (payload) => {
    setCategoriesFilters(payload)
  }

  const expandClickHandler = () => {
    setExpanded(!expanded)

    if (expanded) {
      resetAllFilters()
    }
  }

  const resetAllFilters = () => {
    setIngredientsFilters([])
    setCategoriesFilters([])
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
            initialOptions={Object.values(allIngredients)}
            label={_startCase(ENTITIES.INGREDIENTS.label.plural)}
            groupTypes={allIngredientTypes}
            groupBy={'type'}
            value={ingredientFilters}
            changeHandler={ingredientsInputHandler}
          />
        </Box>
        <Box className={classes.searchContainer}>
          <AutocompleteSearch
            initialOptions={Object.values(allCategories)}
            label={_startCase(ENTITIES.CATEGORIES.label.plural)}
            groupBy={'firstLetter'}
            value={categoryFilters}
            changeHandler={categoriesInputHandler}
          />
        </Box>
      </Collapse>
      <Box className={classes.recipes}>
        {Object.values(allRecipes).map((recipe) => (
          <RecipeItem key={`recipe${recipe.id}`} recipe={recipe} />
        ))}
      </Box>
    </Box>
  )
}
