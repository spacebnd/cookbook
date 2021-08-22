import { createSlice } from '@reduxjs/toolkit'
import {
  TEST_CATEGORIES,
  TEST_INGREDIENT_TYPES,
  TEST_INGREDIENTS,
  TEST_RECIPE_1,
  TEST_RECIPE_2,
} from '../../common/testing-data.js'
import { database } from '../../common/firebase'

export const entitiesSlice = createSlice({
  name: 'entities',
  initialState: {
    allRecipes: [TEST_RECIPE_1, TEST_RECIPE_2],
    allIngredients: TEST_INGREDIENTS,
    allIngredientTypes: TEST_INGREDIENT_TYPES,
    allCategories: TEST_CATEGORIES,
  },
  reducers: {
    setAllRecipes: (state, action) => {
      state.allRecipes = action.payload
    },
  },
})

export const { setRecipe } = entitiesSlice.actions

// actions
export const getAllRecipes = () => (dispatch) => {
  database.ref('recipes/').on('value', (snapshot) => {
    const data = snapshot.val()
    // dispatch(setAllRecipes(data))
  })
}

// selectors
export const selectAllRecipes = (state) => {
  return state.entities.allRecipes
}

export const selectAllIngredients = (state) => {
  return state.entities.allIngredients
}

export const selectAllIngredientTypes = (state) => {
  return state.entities.allIngredientTypes
}

export const selectAllCategories = (state) => {
  return state.entities.allCategories
}

export default entitiesSlice.reducer
