import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Collapse, TextField, Typography } from '@material-ui/core'
import RecipeItem from './RecipeItem.js'
import AutocompleteSearch from '../common/AutocompleteSearch.js'
import SearchIcon from '@material-ui/icons/Search'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { makeStyles } from '@material-ui/core/styles'
import { ENTITIES } from '../../common/constants.js'
import _startCase from 'lodash/startCase'
import isEmpty from 'lodash/isEmpty'
import _debounce from 'lodash/debounce'
import { selectAllEntitiesByType } from '../../store/modules/entities'
import { convertArrayToAlphabeticalGroupingByTitle } from '../../common/utils'
import { selectIsLoading, setIsLoading } from '../../store/modules/ui'
import { customStyles } from '../../common/theme'
import PropTypes from 'prop-types'

const useStyles = makeStyles(() => ({
  filtersButton: {
    backgroundColor: customStyles.card,
  },
  searchContainer: {
    marginTop: '15px',
  },
  searchStatusContainer: {
    marginTop: '15px',
    textAlign: 'center',
  },
  recipes: {
    marginTop: '15px',
  },
}))

RecipesContainer.propTypes = {
  screenContentRootRef: PropTypes.object,
}

export default function RecipesContainer({ screenContentRootRef }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const allRecipes = useSelector(selectAllEntitiesByType(ENTITIES.RECIPES.value))
  const allIngredients = useSelector(selectAllEntitiesByType(ENTITIES.INGREDIENTS.value))
  const allIngredientTypes = useSelector(selectAllEntitiesByType(ENTITIES.INGREDIENT_TYPES.value))
  const allCategories = useSelector(selectAllEntitiesByType(ENTITIES.CATEGORIES.value))
  const isLoading = useSelector(selectIsLoading)

  const [expanded, setExpanded] = useState(false)
  const [ingredientFilters, setIngredientsFilters] = useState([])
  const [categoryFilters, setCategoriesFilters] = useState([])
  const [titleFilter, setTitleFilter] = useState('')
  const titleValue = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      dispatch(setIsLoading(isEmpty(allRecipes)))
    })
  }, [dispatch, allRecipes])

  const ingredientsInputHandler = (payload) => {
    setIngredientsFilters(payload)
  }

  const categoriesInputHandler = (payload) => {
    setCategoriesFilters(payload)
  }

  const titleInputHandler = () => {
    setTitleFilter(titleValue.current.value.toLowerCase())
  }

  const expandClickHandler = () => {
    setExpanded(!expanded)

    if (expanded) {
      resetAllFilters()
    }
  }

  const applyFilterOnClickOfCategoryButton = (categoryId) => {
    resetAllFilters()
    setExpanded(true)
    setCategoriesFilters((prevState) => [...prevState, allCategories[categoryId]])
    screenContentRootRef.current.scrollTo(0, 0)
  }

  const resetAllFilters = () => {
    setIngredientsFilters([])
    setCategoriesFilters([])
    setTitleFilter('')
  }

  const filterRecipes = (initialArray, filters) => {
    let ingredientMatchingCounter = {}

    const checkAndCountIngredients = (recipe, filters) => {
      let isRecipeSatisfiesIngredientFilter = false

      filters.forEach((ingredient) => {
        if (Object.keys(recipe.ingredients).includes(ingredient.id)) {
          ingredientMatchingCounter[recipe.id]++
          isRecipeSatisfiesIngredientFilter = true
        }
      })

      return isRecipeSatisfiesIngredientFilter
    }

    const filteredRecipes = initialArray.filter((recipe) => {
      ingredientMatchingCounter[recipe.id] = 0

      const isRecipeSatisfiesIngredientFilter = !filters.ingredients.length
        ? true
        : checkAndCountIngredients(recipe, filters.ingredients)

      const isRecipeSatisfiesCategoryFilter = !filters.categories.length
        ? true
        : filters.categories.some((category) => {
            return Object.keys(recipe.categories).includes(category.id)
          })

      const isRecipeSatisfiesTitleFilter = recipe.title.toLowerCase().includes(filters.title)

      return (
        isRecipeSatisfiesIngredientFilter &&
        isRecipeSatisfiesCategoryFilter &&
        isRecipeSatisfiesTitleFilter
      )
    })

    return {
      filteredRecipes,
      ingredientMatchingCounter,
    }
  }

  let sortedRecipes = convertArrayToAlphabeticalGroupingByTitle(Object.values(allRecipes))
    .slice()
    .sort((a, b) => {
      if (a.firstLetter < b.firstLetter) return -1
      if (a.firstLetter > b.firstLetter) return 1
      return 0
    })

  let filterStatusMessage = null
  if (ingredientFilters.length || categoryFilters.length || titleFilter) {
    const filters = {
      ingredients: ingredientFilters,
      categories: categoryFilters,
      title: titleFilter,
    }

    const { filteredRecipes, ingredientMatchingCounter } = filterRecipes(
      sortedRecipes,
      filters,
      ENTITIES.RECIPES.value
    )

    sortedRecipes = filteredRecipes

    if (ingredientFilters.length) {
      sortedRecipes.sort((a, b) => {
        if (ingredientMatchingCounter[b.id] > ingredientMatchingCounter[a.id]) return 1
        if (ingredientMatchingCounter[b.id] < ingredientMatchingCounter[a.id]) return -1
        return 0
      })
    }

    filterStatusMessage = `Найдено: ${sortedRecipes.length}`
  }

  return (
    <Box component="div">
      <Button
        className={classes.filtersButton}
        variant="contained"
        size="small"
        fullWidth
        onClick={expandClickHandler}
        disabled={isLoading}
      >
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
        <Box className={classes.searchContainer}>
          <TextField
            label="Название"
            variant="outlined"
            size="small"
            fullWidth
            inputRef={titleValue}
            onChange={_debounce(titleInputHandler, 500)}
          />
        </Box>
      </Collapse>

      {filterStatusMessage && (
        <Box className={classes.searchStatusContainer}>
          <Typography variant="caption">{filterStatusMessage}</Typography>
        </Box>
      )}

      <Box className={classes.recipes}>
        {sortedRecipes.map((recipe) => (
          <RecipeItem
            key={`recipe${recipe.id}`}
            recipe={recipe}
            applyFilterOnClickOfCategoryButton={applyFilterOnClickOfCategoryButton}
          />
        ))}
      </Box>
    </Box>
  )
}
