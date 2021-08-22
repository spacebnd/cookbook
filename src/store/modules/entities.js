import { createSlice } from '@reduxjs/toolkit'
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
export const subscribeToAllEntities = (type) => (dispatch) => {
  database.ref(type + '/').on('value', (snapshot) => {
    const payload = {
      type: type,
      value: snapshot.val(),
    }
    dispatch(setEntity(payload))
  })
}

export const createRecipe = () => () => {
  // const id = uuid4()
  // database.ref('recipes/' + id).set({ ...payload, id })
}

// selectors
export const selectAllEntitiesByType = (type) => (state) => {
  return state.entities[type]
}

export const selectEntityById = (type, id) => (state) => {
  return state.entities[type][id]
}

export default entitiesSlice.reducer
