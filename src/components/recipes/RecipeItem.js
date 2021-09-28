import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setActiveCreateModal, setActiveScreen, setEditableEntity } from '../../store/modules/ui'
import { ENTITIES, SCREENS } from '../../common/constants.js'
import _startCase from 'lodash/startCase'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import EditIcon from '@material-ui/icons/Edit'
import Collapse from '@material-ui/core/Collapse'
import { customStyles } from '../../common/theme'

import IngredientButton from './IngredientButton.js'
import CategoryButton from './CategoryButton.js'

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: '10px',
    paddingBottom: '10px',
    backgroundColor: customStyles.card,
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
    borderRadius: '10px',
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
  editButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 8px 10px',
  },
}))

RecipeItem.propTypes = {
  recipe: PropTypes.object,
  applyFilterOnClickOfCategoryButton: PropTypes.func,
}

export default function RecipeItem({ recipe, applyFilterOnClickOfCategoryButton }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [expanded, setExpanded] = useState(false)

  const expandClickHandler = () => {
    setExpanded(!expanded)
  }

  const editItemHandler = () => {
    dispatch(setActiveScreen(SCREENS.MANAGEMENT.value))
    dispatch(setEditableEntity(recipe))
    dispatch(setActiveCreateModal(ENTITIES.RECIPES.value))
  }

  return (
    <Card className={classes.root}>
      <Box className={classes.headerContainer}>
        <Typography className={classes.header} variant="h5">
          {recipe.title}
        </Typography>
      </Box>

      <CardMedia className={classes.image} image={recipe.image} />
      <CardActions disableSpacing className={classes.cardActions}>
        <Box className={classes.categories}>
          {Object.keys(recipe.categories).map((categoryId) => (
            <CategoryButton
              key={recipe.id + categoryId}
              categoryId={categoryId}
              applyFilterOnClickOfCategoryButton={applyFilterOnClickOfCategoryButton}
            />
          ))}
        </Box>
        {expanded ? (
          <ExpandLessIcon onClick={expandClickHandler} />
        ) : (
          <ExpandMoreIcon onClick={expandClickHandler} />
        )}
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.description}>
          <Typography variant="h6" className={classes.header}>
            {_startCase(ENTITIES.INGREDIENTS.label.plural)}
          </Typography>

          <Box component="div">
            {Object.entries(recipe.ingredients).map((ingredientData) => (
              <IngredientButton
                key={recipe.id + ingredientData[0]}
                ingredientId={ingredientData[0]}
                ingredientQuantity={ingredientData[1]}
              />
            ))}
          </Box>

          <Typography variant="h6" className={classes.header}>
            Способ приготовления
          </Typography>
          <Typography component="div">
            {recipe.description.split('\n').map((i, key) => {
              return <p key={key}>{i}</p>
            })}
          </Typography>
        </CardContent>

        <Box className={classes.editButtonContainer}>
          <Button
            variant="outlined"
            fullWidth
            size="small"
            startIcon={<EditIcon />}
            onClick={editItemHandler}
          >
            Редактировать
          </Button>
        </Box>
      </Collapse>
    </Card>
  )
}
