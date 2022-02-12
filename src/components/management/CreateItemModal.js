import { useDispatch, useSelector } from 'react-redux'
import { forwardRef, useEffect, useState } from 'react'
import { saveEntityToDatabase, selectAllEntitiesByType } from '../../store/modules/entities'
import {
  selectActiveCreateModal,
  selectEditableEntity,
  selectIsLoading,
  setActiveCreateModal,
  setActiveManagementTab,
  setEditableEntity,
} from '../../store/modules/ui.js'
import { ENTITIES, MANAGEMENT_TAB_INDEXES } from '../../common/constants.js'
import { getBase64ImageFromStorage } from '../../common/utils'
import _startCase from 'lodash/startCase'
import _cloneDeep from 'lodash/cloneDeep'
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
import { Box, TextField } from '@material-ui/core'

import AutocompleteSearch from '../common/AutocompleteSearch'
import UploadImage from './UploadImage'

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
    minHeight: '200px',
  },
}))

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function CreateItemModal() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)
  const activeCreateModal = useSelector(selectActiveCreateModal)
  const allCategories = useSelector(selectAllEntitiesByType(ENTITIES.CATEGORIES.value))
  const allIngredients = useSelector(selectAllEntitiesByType(ENTITIES.INGREDIENTS.value))
  const allIngredientTypes = useSelector(selectAllEntitiesByType(ENTITIES.INGREDIENT_TYPES.value))
  const editableEntity = useSelector(selectEditableEntity)

  const [title, setTitle] = useState('')
  const [categories, setCategories] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [ingredientType, setIngredientType] = useState([])
  const [ingredientsQuantity, setIngredientsQuantity] = useState(new Map())
  const [description, setDescription] = useState('')
  const [imageData, setImageData] = useState({
    url: null,
    file: null,
    fileName: null,
    base64: null,
  })
  const [isImageReplaced, setIsImageReplaced] = useState(false)
  const [fieldsWithError, setFieldsWithError] = useState([])

  useEffect(() => {
    if (editableEntity) {
      setTitle(editableEntity.title)

      if (activeCreateModal === ENTITIES.RECIPES.value) {
        const categories = Object.keys(editableEntity.categories).map((categoryId) => {
          return allCategories[categoryId]
        })
        const ingredients = []
        const ingredientsQuantity = new Map()

        editableEntity.ingredients.forEach((item) => {
          ingredients.push(allIngredients[item.id])
          ingredientsQuantity.set(item.id, item.value)
        })

        setCategories(categories)
        setIngredients(ingredients)
        setIngredientsQuantity(ingredientsQuantity)
        setDescription(editableEntity.description)

        getBase64ImageFromStorage(editableEntity.image.url).then((data) => {
          setImageData((prevState) => {
            return {
              ...prevState,
              base64: data.base64,
              file: data.file,
              url: editableEntity.image.url,
              fileName: editableEntity.image.fileName,
            }
          })
        })
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

    for (const ingredientWithQuantityId of ingredientsQuantity.keys()) {
      if (!payload.some((ingredient) => ingredient.id === ingredientWithQuantityId)) {
        const updatedIngredientsQuantity = _cloneDeep(ingredientsQuantity)
        updatedIngredientsQuantity.delete(ingredientWithQuantityId)
        setIngredientsQuantity(updatedIngredientsQuantity)
      }
    }
  }

  const ingredientTypeInputHandler = (payload) => {
    setIngredientType(payload)
  }

  const ingredientQuantityHandler = (id, value) => {
    if (!value) {
      const updatedIngredientsQuantity = _cloneDeep(ingredientsQuantity)
      updatedIngredientsQuantity.delete(id)
      setIngredientsQuantity(updatedIngredientsQuantity)
    } else {
      setIngredientsQuantity((prevState) => {
        const updatedState = _cloneDeep(prevState)
        updatedState.set(id, value)
        return updatedState
      })
    }
  }

  const closeHandler = async () => {
    closeModal()
  }

  const closeModal = () => {
    dispatch(setActiveCreateModal(null))
    resetAllInputs()
    dispatch(setEditableEntity(null))
  }

  const submitHandler = async () => {
    const payload = {
      title,
    }
    if (activeCreateModal === ENTITIES.RECIPES.value) {
      payload.categories = categories
      payload.ingredients = ingredientsQuantity
      payload.description = description
      payload.isImageReplaced = isImageReplaced
      payload.imageData = imageData
    } else if (activeCreateModal === ENTITIES.INGREDIENTS.value) {
      payload.ingredientType = ingredientType
    }

    const isFormValid = validateFields(payload)
    if (isFormValid) saveEntity(payload)
  }

  const validateFields = (fields) => {
    const fieldsWithError = []

    const isIngredientsValid = (ingredientsQuantity) => {
      return ingredientsQuantity.size && ingredients.length === ingredientsQuantity.size
    }

    Object.keys(fields).forEach((field) => {
      if (
        (field === 'title' && !fields[field]) ||
        (field === 'categories' && !fields[field].length) ||
        (field === 'ingredients' && !isIngredientsValid(fields[field])) ||
        (field === 'description' && !fields[field]) ||
        (field === 'ingredientType' && !fields[field].length)
      ) {
        fieldsWithError.push(field)
      }
    })

    if (fieldsWithError.length) {
      setFieldsWithError(fieldsWithError)
      return false
    } else {
      return true
    }
  }

  const saveEntity = async (payload) => {
    const id = editableEntity ? editableEntity.id : null
    await dispatch(saveEntityToDatabase(payload, id, activeCreateModal))
    dispatch(setActiveManagementTab(MANAGEMENT_TAB_INDEXES[activeCreateModal]))
    closeModal()
  }

  const resetAllInputs = () => {
    setTitle('')
    setCategories([])
    setIngredients([])
    setIngredientType([])
    setIngredientsQuantity(new Map())
    setDescription('')
    setImageData({
      url: null,
      file: null,
      fileName: null,
      base64: null,
    })
    setIsImageReplaced(false)
    setFieldsWithError([])
  }

  const getHeaderTitle = () => {
    let title = editableEntity ? 'Редактировать ' : 'Новый '

    if (activeCreateModal === ENTITIES.RECIPES.value) {
      title += `${ENTITIES.RECIPES.label.singular}`
    } else if (activeCreateModal === ENTITIES.INGREDIENTS.value) {
      title += `${ENTITIES.INGREDIENTS.label.singular}`
    } else if (activeCreateModal === ENTITIES.CATEGORIES.value) {
      title += `${ENTITIES.CATEGORIES.label.genitive}`
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
      onClose={closeModal}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.header}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={closeHandler}
            aria-label="close"
            disabled={isLoading}
          >
            <CloseIcon />
          </IconButton>

          {getHeaderTitle()}

          <Button autoFocus color="inherit" onClick={submitHandler} disabled={isLoading}>
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
            error={fieldsWithError.includes('title')}
            disabled={isLoading}
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
              error={fieldsWithError.includes('ingredientType')}
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
                error={fieldsWithError.includes('categories')}
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
                error={fieldsWithError.includes('ingredients')}
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
                      value={ingredientsQuantity.get(ingredient.id) ?? ''}
                      onChange={(event) =>
                        ingredientQuantityHandler(ingredient.id, event.target.value)
                      }
                      error={!ingredientsQuantity.get(ingredient.id)}
                      disabled={isLoading}
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
                error={fieldsWithError.includes('description')}
                disabled={isLoading}
              />
            </Box>

            <Box className={classes.uploadImageContainer}>
              <UploadImage
                imageData={imageData}
                setImageData={setImageData}
                title={title}
                editableEntity={editableEntity}
                setIsImageReplaced={setIsImageReplaced}
              />
            </Box>
          </>
        )}
      </Box>
    </Dialog>
  )
}
