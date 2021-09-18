import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { database } from '../../common/firebase'
import { ENTITIES } from '../../common/constants'
import _cloneDeep from 'lodash/cloneDeep.js'

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

export const saveEntityToDatabase = (entityData, id, entity) => async (_, getState) => {
  const targetId = id ? id : uuidv4()

  let payload
  let existingEntities

  if (entity === ENTITIES.RECIPES.value) {
    existingEntities = getState().entities.recipes

    payload = {
      ...entityData,
      categories: Object.fromEntries(entityData.categories.map((item) => [item.id, true])),
    }
  } else if (entity === ENTITIES.INGREDIENTS.value) {
    existingEntities = getState().entities.ingredients

    payload = { title: entityData.title, type: entityData.ingredientType[0].id }
  } else if (entity === ENTITIES.CATEGORIES.value) {
    existingEntities = getState().entities.categories

    payload = { ...entityData }
  }

  if (
    Object.values(existingEntities).some(
      (entity) => entity.title.toLowerCase() === entityData.title.toLowerCase().trim()
    )
  ) {
    console.error('c таким названием уже существует')
  } else {
    await database.ref(`${entity}/` + targetId).set({ ...payload, id: targetId })
  }
}

export const deleteEntityFromDatabase = (id, entity) => async (_, getState) => {
  if (entity !== ENTITIES.RECIPES.value) {
    const recipes = _cloneDeep(getState().entities.recipes)
    for (const recipeId in recipes) {
      if (id in recipes[recipeId][entity]) {
        delete recipes[recipeId][entity][id]
      }
    }
    await database.ref(`${ENTITIES.RECIPES.value}/`).set({ ...recipes })
  }

  await database.ref(`${entity}/` + id).remove()
}

// selectors
export const selectAllEntitiesByType = (type) => (state) => {
  return state.entities[type]
}

export const selectEntityById = (entity, id) => (state) => {
  return state.entities[entity][id]
}

export default entitiesSlice.reducer
