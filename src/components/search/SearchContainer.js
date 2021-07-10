import React from 'react'
import { Box } from '@material-ui/core'
import RecipesSearch from './RecipesSearch.js'
import IngredientsSearch from './IngredientsSearch.js'
import CategorySearch from './CategorySearch.js'

function SearchContainer() {
  return (
    <Box component="div">
      <RecipesSearch />
      <IngredientsSearch />
      <CategorySearch />
    </Box>
  )
}

export default SearchContainer
