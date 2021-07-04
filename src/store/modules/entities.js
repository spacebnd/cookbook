import { createSlice } from '@reduxjs/toolkit'
import {
  TEST_CATEGORIES,
  TEST_INGREDIENTS,
  TEST_RECIPE_1,
  TEST_RECIPE_2,
} from '../../common/testingData.js'

export const entitiesSlice = createSlice({
  name: 'entities',
  initialState: {
    allRecipes: [TEST_RECIPE_1, TEST_RECIPE_2],
    allIngredients: TEST_INGREDIENTS,
    allCategories: TEST_CATEGORIES,
  },
  reducers: {},
})

// export const {} = entitiesSlice.actions

export default entitiesSlice.reducer
