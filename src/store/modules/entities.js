import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { database } from '../../common/firebase'
import { ENTITIES } from '../../common/constants'

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

export const saveEntityToDatabase = (entityData, id, entity) => async () => {
  const targetId = id ? id : uuidv4()

  let payload
  if (entity === ENTITIES.RECIPES.value) {
    payload = {
      ...entityData,
      categories: Object.fromEntries(entityData.categories.map((item) => [item.id, true])),
    }
  } else if (entity === ENTITIES.INGREDIENTS.value) {
    payload = { title: entityData.title, type: entityData.ingredientType[0].id }
  } else if (entity === ENTITIES.CATEGORIES.value) {
    payload = { ...entityData }
  }

  await database.ref(`${entity}/` + targetId).set({ ...payload, id: targetId })
}

export const deleteEntityFromDatabase = (id, entity) => async () => {
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
