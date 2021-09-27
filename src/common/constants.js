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

export const NAVIGATION_BAR_HEIGHT = 56 // px

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
  INGREDIENT_TYPES: {
    value: 'ingredient_types',
    label: {
      singular: 'тип',
      plural: 'типы',
    },
  },
  CATEGORIES: {
    value: 'categories',
    label: {
      singular: 'категория',
      plural: 'категории',
      genitive: 'категорию',
    },
  },
}

export const MANAGEMENT_TAB_INDEXES = {
  [ENTITIES.RECIPES.value]: 0,
  [ENTITIES.INGREDIENTS.value]: 1,
  [ENTITIES.CATEGORIES.value]: 2,
}

export const STATUS_ALERT_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
}

export const STATUS_ALERT_MESSAGES = {
  SAVE_SUCCESS: '\u2714 сохранено',
  DELETE_SUCCESS: '\u2714 удалено',
  UNKNOWN_ERROR: '\u2717 произошла ошибка',
  DUPLICATION_ERROR: '\u2717 уже существует',
}
