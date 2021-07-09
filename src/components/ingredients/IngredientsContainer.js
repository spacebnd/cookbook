import React from 'react'
import { Box } from '@material-ui/core'
import { useSelector } from 'react-redux'
import IngredientItem from './IngredientItem.js'

export default function IngredientsContainer() {
  const allIngredients = useSelector((state) => state.entities.allIngredients)

  return (
    <Box component="div">
      {allIngredients.map((ingredient) => (
        <IngredientItem key={ingredient.id} ingredient={ingredient} />
      ))}
    </Box>
  )
}
