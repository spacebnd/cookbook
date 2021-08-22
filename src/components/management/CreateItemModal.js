import React, { forwardRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import DoneIcon from '@material-ui/icons/Done'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectActiveCreateModal,
  setActiveCreateModal,
  setActiveManagementTab,
} from '../../store/modules/ui.js'
import { ENTITIES, MANAGEMENT_TAB_INDEXES } from '../../common/constants.js'
import { Box, TextField } from '@material-ui/core'
import AutocompleteSearch from '../common/AutocompleteSearch'
import _startCase from 'lodash/startCase'
import {
  createRecipe,
  selectAllCategories,
  selectAllIngredients,
  selectAllIngredientTypes,
} from '../../store/modules/entities'

const useStyles = makeStyles(() => ({
  header: {
    position: 'relative',
  },
  title: {
    flex: 1,
    marginLeft: '5px',
    fontWeight: '500',
  },
  form: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    boxSizing: 'border-box',
  },
  inputContainer: {
    marginTop: '15px',
  },
}))

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function CreateItemModal() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const activeCreateModal = useSelector(selectActiveCreateModal)
  const allCategories = useSelector(selectAllCategories)
  const allIngredients = useSelector(selectAllIngredients)
  const allIngredientTypes = useSelector(selectAllIngredientTypes)

  const [title, setTitle] = useState('')
  const [categories, setCategories] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [ingredientType, setIngredientType] = useState([])
  const [description, setDescription] = useState('')

  const categoriesInputHandler = (payload) => {
    setCategories(payload)
  }

  const ingredientsInputHandler = (payload) => {
    setIngredients(payload)
  }

  const ingredientTypeInputHandler = (payload) => {
    setIngredientType(payload)
  }

  const closeModalHandler = () => {
    dispatch(setActiveCreateModal(null))
    resetAllInputs()
  }

  const submitHandler = () => {
    const payload = {
      title,
    }
    if (activeCreateModal === ENTITIES.RECIPES.value) {
      payload.categories = categories
      payload.ingredients = ingredients
      payload.description = description
    } else if (activeCreateModal === ENTITIES.INGREDIENTS.value) {
      payload.ingredientType = ingredientType
    }

    dispatch(createRecipe(payload))
    dispatch(setActiveManagementTab(MANAGEMENT_TAB_INDEXES[activeCreateModal]))
    closeModalHandler()
  }

  const resetAllInputs = () => {
    setTitle('')
    setCategories([])
    setIngredients([])
    setIngredientType([])
    setDescription('')
  }

  const getHeaderTitle = () => {
    let title = ''

    if (activeCreateModal === ENTITIES.RECIPES.value) {
      title = `Новый ${ENTITIES.RECIPES.label.singular}`
    } else if (activeCreateModal === ENTITIES.INGREDIENTS.value) {
      title = `Новый ${ENTITIES.INGREDIENTS.label.singular}`
    } else if (activeCreateModal === ENTITIES.CATEGORIES.value) {
      title = `Новая ${ENTITIES.CATEGORIES.label.singular}`
    }

    return (
      <Typography className={classes.title} align="center">
        {title}
      </Typography>
    )
  }

  return (
    <Dialog
      fullScreen
      open={!!activeCreateModal}
      onClose={closeModalHandler}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.header}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={closeModalHandler} aria-label="close">
            <CloseIcon />
          </IconButton>

          {getHeaderTitle()}

          <Button autoFocus color="inherit" onClick={submitHandler}>
            <DoneIcon />
          </Button>
        </Toolbar>
      </AppBar>

      <Box className={classes.form}>
        <Box className={classes.inputContainer}>
          <TextField
            id="create-title"
            label="Название"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            variant="outlined"
            size="small"
            fullWidth
          />
        </Box>
        {activeCreateModal === ENTITIES.INGREDIENTS.value && (
          <Box className={classes.inputContainer}>
            <AutocompleteSearch
              initialOptions={allIngredientTypes}
              label={_startCase(ENTITIES.INGREDIENT_TYPES.label.singular)}
              groupBy={'firstLetter'}
              limit={1}
              value={ingredientType}
              changeHandler={ingredientTypeInputHandler}
            />
          </Box>
        )}
        {activeCreateModal === ENTITIES.RECIPES.value && (
          <>
            <Box className={classes.inputContainer}>
              <AutocompleteSearch
                initialOptions={allCategories}
                label={_startCase(ENTITIES.CATEGORIES.label.plural)}
                groupBy={'firstLetter'}
                value={categories}
                changeHandler={categoriesInputHandler}
              />
            </Box>
            <Box className={classes.inputContainer}>
              <AutocompleteSearch
                initialOptions={allIngredients}
                label={_startCase(ENTITIES.INGREDIENTS.label.plural)}
                groupBy={'type'}
                value={ingredients}
                changeHandler={ingredientsInputHandler}
              />
            </Box>
            <Box className={classes.inputContainer}>
              <TextField
                id="create-description"
                label="Описание"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                variant="outlined"
                multiline
                fullWidth
              />
            </Box>
          </>
        )}
      </Box>
    </Dialog>
  )
}
