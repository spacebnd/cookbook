import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { ENTITIES } from '../../common/constants.js'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CategoryButton from '../categories/CategoryButton.js'
import IngredientButton from '../ingredients/IngredientButton.js'

const useStyles = makeStyles((theme) => ({
  image: {
    height: '200px',
  },
  categories: {
    flexWrap: 'wrap',
    padding: '5px 10px',
  },
  ingredientsHeader: {
    margin: '5px 0 15px',
  },
  description: {
    padding: '0 10px',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}))

export default function RecipeItem() {
  const classes = useStyles()
  const allRecipes = useSelector((state) => state.entities.allRecipes)
  const recipeItem = allRecipes[0]
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={recipeItem.name}
      />

      <CardMedia className={classes.image} image={recipeItem.image} />

      <CardActions className={classes.categories} disableSpacing>
        {recipeItem.categories.map((category) => (
          <CategoryButton key={category} category={category} />
        ))}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.description}>
          <h3 className={classes.ingredientsHeader}>{ENTITIES.INGREDIENTS.label}</h3>
          {recipeItem.ingredients.map((ingredient) => (
            <IngredientButton key={ingredient} ingredient={ingredient} />
          ))}
          <section>{recipeItem.description}</section>
        </CardContent>
      </Collapse>
    </Card>
  )
}
