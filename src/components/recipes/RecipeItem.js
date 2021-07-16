import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { ENTITIES } from '../../common/constants.js'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import Collapse from '@material-ui/core/Collapse'
import { Box, Typography } from '@material-ui/core'
import IngredientButton from './IngredientButton.js'
import CategoryButton from './CategoryButton.js'
import _startCase from 'lodash/startCase'

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: '10px',
    paddingBottom: '10px',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 8px',
  },
  header: {
    margin: '10px 0',
  },
  image: {
    height: '200px',
  },
  categories: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  description: {
    padding: '0 8px',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 8px',
    marginTop: '10px',
  },
}))

RecipeItem.propTypes = {
  recipe: PropTypes.object,
}

export default function RecipeItem(props) {
  const classes = useStyles()
  const { recipe } = props
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card className={classes.root}>
      <Box className={classes.headerContainer}>
        <Typography className={classes.header} variant="h5">
          {recipe.name}
        </Typography>
      </Box>

      <CardMedia className={classes.image} image={recipe.image} />
      <CardActions disableSpacing className={classes.cardActions}>
        <Box className={classes.categories}>
          {recipe.categories.map((category) => (
            <CategoryButton key={recipe.id + category} category={category} />
          ))}
        </Box>
        {expanded ? (
          <ExpandLessIcon onClick={handleExpandClick} />
        ) : (
          <ExpandMoreIcon onClick={handleExpandClick} />
        )}
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.description}>
          <Typography variant="h6" className={classes.header}>
            {_startCase(ENTITIES.INGREDIENTS.label.plural)}
          </Typography>

          <Box component="div">
            {recipe.ingredients.map((ingredient) => (
              <IngredientButton key={recipe.id + ingredient} ingredient={ingredient} />
            ))}
          </Box>

          <Typography variant="h6" className={classes.header}>
            Способ приготовления
          </Typography>
          <Typography>{recipe.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}
