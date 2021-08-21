export const SCREENS = {
  RECIPES: {
    value: 'recipes',
    label: 'Рецепты',
  },
  MANAGEMENT: {
    value: 'management',
    label: 'Управление',
  },
}

export const ENTITIES = {
  RECIPES: {
    value: 'recipes',
    label: {
      singular: 'рецепт',
      plural: 'рецепты',
    },
  },
  INGREDIENTS: {
    value: 'ingredients',
    label: {
      singular: 'ингредиент',
      plural: 'ингредиенты',
    },
  },
  CATEGORIES: {
    value: 'categories',
    label: {
      singular: 'категория',
      plural: 'категории',
    },
  },
}

export const MANAGEMENT_TAB_INDEXES = {
  [ENTITIES.RECIPES.value]: 0,
  [ENTITIES.INGREDIENTS.value]: 1,
  [ENTITIES.CATEGORIES.value]: 2,
}

export const navigationBarHeight = 56
