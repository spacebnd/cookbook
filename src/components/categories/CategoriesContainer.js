import React from 'react'
import { Box } from '@material-ui/core'
import { useSelector } from 'react-redux'
import CategoryItem from './CategoryItem.js'

export default function CategoriesContainer() {
  const allCategories = useSelector((state) => state.entities.allCategories)

  return (
    <Box component="div">
      {allCategories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </Box>
  )
}
