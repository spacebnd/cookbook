import React from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@material-ui/core'
import RecipeItem from './RecipeItem.js'

export default function RecipesContainer() {
  const allRecipes = useSelector((state) => state.entities.allRecipes)

  return (
    <Box component="div">
      {allRecipes.map((recipe) => (
        <RecipeItem key={recipe.id} recipe={recipe} />
      ))}
    </Box>
  )
}
