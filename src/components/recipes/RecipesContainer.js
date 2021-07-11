import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Button, Collapse } from '@material-ui/core'
import RecipeItem from './RecipeItem.js'
import AutocompleteSearch from '../common/AutocompleteSearch.js'
import SearchIcon from '@material-ui/icons/Search'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  searchContainer: {
    margin: '10px 0',
  },
}))

export default function RecipesContainer() {
  const classes = useStyles()
  const allRecipes = useSelector((state) => state.entities.allRecipes)
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Box component="div">
      <Button variant="contained" size="small" fullWidth onClick={handleExpandClick}>
        <SearchIcon />
        <ExpandMoreIcon />
        <ExpandLessIcon />
      </Button>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box className={classes.searchContainer}>
          <AutocompleteSearch />
        </Box>
        <Box className={classes.searchContainer}>
          <AutocompleteSearch />
        </Box>
      </Collapse>
      {allRecipes.map((recipe) => (
        <RecipeItem key={recipe.id} recipe={recipe} />
      ))}
    </Box>
  )
}
