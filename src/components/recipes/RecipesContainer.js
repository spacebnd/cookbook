import React from 'react'
import RecipeItem from './RecipeItem.js'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

export default function RecipesContainer() {
  const useStyles = makeStyles(() => ({
    recipesContainer: {
      overflowY: 'auto',
    },
  }))

  const classes = useStyles()
  return (
    <Box component="div" className={classes.recipesContainer}>
      <RecipeItem />
    </Box>
  )
}
