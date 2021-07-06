import React from 'react'
import RecipeItem from './RecipeItem.js'
import { Box } from '@material-ui/core'

export default function RecipesContainer() {
  return (
    <Box component="div">
      <RecipeItem />
    </Box>
  )
}
