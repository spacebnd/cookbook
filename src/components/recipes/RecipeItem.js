import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { ENTITIES } from '../../common/constants.js'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import { Box, Typography, Menu, MenuItem } from '@material-ui/core'
import IngredientButton from '../ingredients/IngredientButton.js'
import CategoryButton from '../categories/CategoryButton.js'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '10px',
  },
  image: {
    height: '200px',
  },
  categories: {
    flexWrap: 'wrap',
  },
  description: {
    padding: '0 8px',
  },
  header: {
    margin: '0 0 10px',
  },
  ingredients: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '5px',
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

RecipeItem.propTypes = {
  recipe: PropTypes.object,
}

export default function RecipeItem(props) {
  const classes = useStyles()
  const { recipe } = props
  const [expanded, setExpanded] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleSettingsClose = () => {
    setAnchorEl(null)
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <>
            <IconButton
              aria-label="settings"
              aria-controls="settings-menu"
              aria-haspopup="true"
              onClick={handleSettingsClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="settings-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleSettingsClose}
            >
              <MenuItem onClick={handleSettingsClose}>
                <Typography>Изменить</Typography>
              </MenuItem>
              <MenuItem onClick={handleSettingsClose}>
                <Typography color="error">Удалить</Typography>
              </MenuItem>
            </Menu>
          </>
        }
        title={recipe.name}
      />

      <CardMedia className={classes.image} image={recipe.image} />

      <CardActions className={classes.categories} disableSpacing>
        {recipe.categories.map((category) => (
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
          <Typography variant="h6" className={classes.header}>
            {ENTITIES.INGREDIENTS.label}
          </Typography>

          <Box component="div" className={classes.ingredients}>
            {recipe.ingredients.map((ingredient) => (
              <IngredientButton key={ingredient} ingredient={ingredient} />
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
