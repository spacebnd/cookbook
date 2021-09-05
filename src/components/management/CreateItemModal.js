import React, { forwardRef, useEffect, useState } from 'react'
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
  selectEditableEntity,
  setActiveCreateModal,
  setActiveManagementTab,
  setEditableEntity,
} from '../../store/modules/ui.js'
import { ENTITIES, MANAGEMENT_TAB_INDEXES } from '../../common/constants.js'
import { Box, TextField } from '@material-ui/core'
import AutocompleteSearch from '../common/AutocompleteSearch'
import _startCase from 'lodash/startCase'
import { createRecipe, selectAllEntitiesByType } from '../../store/modules/entities'
import UploadImage from '../common/UploadImage'

const useStyles = makeStyles(() => ({
  header: {
    position: 'relative',
  },
  title: {
    flex: 1,
    marginLeft: '5px',
    fontWeight: '500',
    fontSize: '15px',
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
  ingredientQuantityItem: {
    marginTop: '15px',
  },
  uploadImageContainer: {
    marginBottom: '15px',
  },
}))

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function CreateItemModal() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const activeCreateModal = useSelector(selectActiveCreateModal)
  const allCategories = useSelector(selectAllEntitiesByType(ENTITIES.CATEGORIES.value))
  const allIngredients = useSelector(selectAllEntitiesByType(ENTITIES.INGREDIENTS.value))
  const allIngredientTypes = useSelector(selectAllEntitiesByType(ENTITIES.INGREDIENT_TYPES.value))
  const editableEntity = useSelector(selectEditableEntity)

  const [title, setTitle] = useState('')
  const [categories, setCategories] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [ingredientType, setIngredientType] = useState([])
  const [ingredientsQuantity, setIngredientsQuantity] = useState({})
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')

  useEffect(() => {
    if (editableEntity) {
      setTitle(editableEntity.title)

      if (activeCreateModal === ENTITIES.RECIPES.value) {
        const categories = Object.keys(editableEntity.categories).map((categoryId) => {
          return allCategories[categoryId]
        })

        const ingredients = []
        const ingredientsQuantity = {}
        Object.entries(editableEntity.ingredients).forEach((item) => {
          const id = item[0]
          const value = item[1]
          ingredients.push(allIngredients[id])
          ingredientsQuantity[id] = value
        })

        setCategories(categories)
        setIngredients(ingredients)
        setIngredientsQuantity(ingredientsQuantity)
        setDescription(editableEntity.description)
        setImage(editableEntity.image)
      } else if (activeCreateModal === ENTITIES.INGREDIENTS.value) {
        setIngredientType([allIngredientTypes[editableEntity.type]])
      }
    }
  }, [editableEntity, activeCreateModal, allCategories, allIngredients, allIngredientTypes])

  const categoriesInputHandler = (payload) => {
    setCategories(payload)
  }

  const ingredientsInputHandler = (payload) => {
    setIngredients(payload)
  }

  const ingredientTypeInputHandler = (payload) => {
    setIngredientType(payload)
  }

  const ingredientQuantityHandler = (id, value) => {
    setIngredientsQuantity((prevState) => ({ ...prevState, [id]: value }))
  }

  const closeModalHandler = () => {
    dispatch(setActiveCreateModal(null))
    resetAllInputs()
    dispatch(setEditableEntity(null))
  }

  const submitHandler = () => {
    const payload = {
      title,
    }
    if (activeCreateModal === ENTITIES.RECIPES.value) {
      payload.categories = categories
      payload.ingredients = ingredients
      payload.description = description
      payload.image = image
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
    setIngredientsQuantity({})
    setDescription('')
    setImage('')
  }

  const getHeaderTitle = () => {
    let title = editableEntity ? 'Редактировать ' : 'Новый '

    if (activeCreateModal === ENTITIES.RECIPES.value) {
      title += `${ENTITIES.RECIPES.label.singular}`
    } else if (activeCreateModal === ENTITIES.INGREDIENTS.value) {
      title += `${ENTITIES.INGREDIENTS.label.singular}`
    } else if (activeCreateModal === ENTITIES.CATEGORIES.value) {
      title += `${ENTITIES.CATEGORIES.label.singular}`
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
              initialOptions={Object.values(allIngredientTypes)}
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
                initialOptions={Object.values(allCategories)}
                label={_startCase(ENTITIES.CATEGORIES.label.plural)}
                groupBy={'firstLetter'}
                value={categories}
                changeHandler={categoriesInputHandler}
              />
            </Box>

            <Box className={classes.inputContainer}>
              <AutocompleteSearch
                initialOptions={Object.values(allIngredients)}
                label={_startCase(ENTITIES.INGREDIENTS.label.plural)}
                groupTypes={allIngredientTypes}
                groupBy={'type'}
                value={ingredients}
                changeHandler={ingredientsInputHandler}
              />
            </Box>

            {ingredients.length > 0 && (
              <Box>
                {ingredients.map((ingredient) => (
                  <Box key={ingredient.id} className={classes.ingredientQuantityItem}>
                    <TextField
                      id={`quantity-${ingredient.id}`}
                      label={ingredient.title}
                      placeholder="Введите количество"
                      variant="outlined"
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                        style: {
                          fontSize: '14px',
                        },
                      }}
                      value={ingredientsQuantity[ingredient.id] ?? ''}
                      onChange={(event) =>
                        ingredientQuantityHandler(ingredient.id, event.target.value)
                      }
                    />
                  </Box>
                ))}
              </Box>
            )}

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

            <Box className={classes.uploadImageContainer}>
              <UploadImage setImage={setImage} image={image} title={title} />
            </Box>
          </>
        )}
      </Box>
    </Dialog>
  )
}
