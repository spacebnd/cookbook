import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { database } from '../../common/firebase'

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

export const createRecipe = (recipeData) => async () => {
  const id = uuidv4()
  const payload = {
    ...recipeData,
    categories: Object.fromEntries(recipeData.categories.map((item) => [item.id, true])),
  }
  await database.ref('recipes/' + id).set({ ...payload, id })
}

// selectors
export const selectAllEntitiesByType = (type) => (state) => {
  return state.entities[type]
}

export const selectEntityById = (entity, id) => (state) => {
  return state.entities[entity][id]
}

export default entitiesSlice.reducer
