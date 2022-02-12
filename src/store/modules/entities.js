import { createSlice } from '@reduxjs/toolkit'
import { setIsLoading, setStatusAlert } from './ui'
import { database, DEFAULT_IMAGE_NAME } from '../../common/firebase'
import { ENTITIES, STATUS_ALERT_MESSAGES, STATUS_ALERT_TYPES } from '../../common/constants'
import {
  deleteImageFromStorage,
  getImageUrlFromStorage,
  uploadImageToStorage,
} from '../../common/utils'
import _cloneDeep from 'lodash/cloneDeep.js'
import _pick from 'lodash/pick'
import { v4 as uuidv4 } from 'uuid'

export const entitiesSlice = createSlice({
  name: 'entities',
  initialState: {
    recipes: {},
    ingredients: {},
    ingredient_types: {},
    categories: {},
  },
  reducers: {
    setEntity: (state, action) => {
      state[action.payload.type] = action.payload.value
    },
  },
})

export const { setEntity } = entitiesSlice.actions

// actions
export const subscribeToAllEntities = (type) => async (dispatch) => {
  await database.ref(type + '/').on('value', (snapshot) => {
    const payload = {
      type: type,
      value: snapshot.val(),
    }
    dispatch(setEntity(payload))
  })
}

export const saveEntityToDatabase = (entityData, id, entity) => async (dispatch, getState) => {
  dispatch(setIsLoading(true))

  const currentState = getState()
  const isEdit = !!id
  const targetId = isEdit ? id : uuidv4()

  let payload
  let existingEntities

  if (entity === ENTITIES.RECIPES.value) {
    existingEntities = currentState.entities.recipes

    let imageDataToSave
    if (isEdit && !entityData.isImageReplaced) {
      imageDataToSave = entityData.imageData
    } else {
      if (entityData.isImageReplaced) {
        const prevImageFileName = existingEntities[id].image.fileName

        if (prevImageFileName !== DEFAULT_IMAGE_NAME) {
          deleteImageFromStorage(prevImageFileName)
        }
      }

      if (entityData.imageData.file) {
        imageDataToSave = await uploadImageToStorage(entityData.imageData.file)
      } else {
        const defaultImageUrl = await getImageUrlFromStorage(DEFAULT_IMAGE_NAME)
        imageDataToSave = {
          url: defaultImageUrl,
          fileName: DEFAULT_IMAGE_NAME,
        }
      }
    }

    payload = {
      ..._pick(entityData, 'title', 'categories', 'description'),
      image: {
        url: imageDataToSave.url,
        fileName: imageDataToSave.fileName,
      },
      categories: Object.fromEntries(entityData.categories.map((item) => [item.id, true])),
      ingredients: Array.from(entityData.ingredients, ([id, value]) => ({ id, value })),
    }
  } else if (entity === ENTITIES.INGREDIENTS.value) {
    existingEntities = currentState.entities.ingredients

    payload = { title: entityData.title, type: entityData.ingredientType[0].id }
  } else if (entity === ENTITIES.CATEGORIES.value) {
    existingEntities = currentState.entities.categories

    payload = { ...entityData }
  }

  if (
    !isEdit &&
    Object.values(existingEntities).some(
      (entity) => entity.title.toLowerCase() === entityData.title.toLowerCase().trim()
    )
  ) {
    dispatch(
      setStatusAlert({
        message: STATUS_ALERT_MESSAGES.DUPLICATION_ERROR,
        type: STATUS_ALERT_TYPES.ERROR,
      })
    )
    dispatch(setIsLoading(false))
  } else {
    await database
      .ref(`${entity}/` + targetId)
      .set({ ...payload, id: targetId })
      .then(() => {
        dispatch(
          setStatusAlert({
            message: STATUS_ALERT_MESSAGES.SAVE_SUCCESS,
            type: STATUS_ALERT_TYPES.SUCCESS,
          })
        )
      })
      .catch((error) => {
        console.error(error)
        dispatch(
          setStatusAlert({
            message: STATUS_ALERT_MESSAGES.UNKNOWN_ERROR,
            type: STATUS_ALERT_TYPES.ERROR,
          })
        )
      })
      .finally(() => {
        dispatch(setIsLoading(false))
      })
  }
}

export const deleteEntityFromDatabase = (id, entity) => async (dispatch, getState) => {
  dispatch(setIsLoading(true))

  const currentState = getState()

  if (entity !== ENTITIES.RECIPES.value) {
    // find and delete nonexistent item from recipes
    const recipes = _cloneDeep(currentState.entities.recipes)
    for (const recipeId in recipes) {
      if (id in recipes[recipeId][entity]) {
        delete recipes[recipeId][entity][id]
      }
    }
    await database.ref(`${ENTITIES.RECIPES.value}/`).set({ ...recipes })
  } else {
    const entityToDelete = currentState.entities.recipes[id]
    const prevImageFileName = entityToDelete.image.fileName

    if (prevImageFileName !== DEFAULT_IMAGE_NAME) {
      deleteImageFromStorage(prevImageFileName)
    }
  }

  await database
    .ref(`${entity}/` + id)
    .remove()
    .then(() => {
      dispatch(
        setStatusAlert({
          message: STATUS_ALERT_MESSAGES.DELETE_SUCCESS,
          type: STATUS_ALERT_TYPES.SUCCESS,
        })
      )
    })
    .catch((error) => {
      console.error(error)
      dispatch(
        setStatusAlert({
          message: STATUS_ALERT_MESSAGES.UNKNOWN_ERROR,
          type: STATUS_ALERT_TYPES.ERROR,
        })
      )
    })
    .finally(() => {
      dispatch(setIsLoading(false))
    })
}

// selectors
export const selectAllEntitiesByType = (type) => (state) => {
  return state.entities[type]
}

export const selectEntityById = (entity, id) => (state) => {
  return state.entities[entity][id]
}

export default entitiesSlice.reducer
