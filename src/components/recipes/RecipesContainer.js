import React from 'react'
import RecipeItem from './RecipeItem.js'
import { makeStyles } from '@material-ui/core/styles'

export default function RecipesContainer() {
  const useStyles = makeStyles(() => ({
    recipesContainer: {
      overflowY: 'auto',
    },
  }))

  const classes = useStyles()
  return (
    <div className={classes.recipesContainer}>
      <RecipeItem />
    </div>
  )
}
