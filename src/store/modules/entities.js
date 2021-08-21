import { createSlice } from '@reduxjs/toolkit'
import {
  TEST_CATEGORIES,
  TEST_INGREDIENT_TYPES,
  TEST_INGREDIENTS,
  TEST_RECIPE_1,
  TEST_RECIPE_2,
} from '../../common/testingData.js'

export const entitiesSlice = createSlice({
  name: 'entities',
  initialState: {
    allRecipes: [TEST_RECIPE_1, TEST_RECIPE_2],
    allIngredients: TEST_INGREDIENTS,
    allIngredientTypes: TEST_INGREDIENT_TYPES,
    allCategories: TEST_CATEGORIES,
  },
  reducers: {},
})

// export const {} = entitiesSlice.actions

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
