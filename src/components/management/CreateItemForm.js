import React from 'react'
import { Box, TextField } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import AutocompleteSearch from '../common/AutocompleteSearch.js'
import _startCase from 'lodash/startCase.js'
import { ENTITIES } from '../../common/constants.js'
import {
  selectAllCategories,
  selectAllIngredients,
  selectAllIngredientTypes,
} from '../../store/modules/entities'
import { selectActiveCreateModal } from '../../store/modules/ui'

const useStyles = makeStyles(() => {
  return {
    root: {
      width: '100%',
      padding: '10px',
      marginTop: '5px',
      boxSizing: 'border-box',
    },
    inputContainer: {
      marginTop: '15px',
    },
  }
})

export default function CreateItemForm() {
  const classes = useStyles()
  const activeCreateModal = useSelector(selectActiveCreateModal)
  const allCategories = useSelector(selectAllCategories)
  const allIngredients = useSelector(selectAllIngredients)
  const allIngredientTypes = useSelector(selectAllIngredientTypes)

  return (
    <Box className={classes.root}>
      <Box className={classes.inputContainer}>
        <TextField id="create-title" label="Название" variant="outlined" size="small" fullWidth />
      </Box>
      {activeCreateModal === ENTITIES.INGREDIENTS.value && (
        <Box className={classes.inputContainer}>
          <AutocompleteSearch
            initialOptions={allIngredientTypes}
            label="Тип ингредиента"
            groupBy={'firstLetter'}
          />
        </Box>
      )}
      {activeCreateModal === ENTITIES.RECIPES.value && (
        <>
          <Box className={classes.inputContainer}>
            <AutocompleteSearch
              initialOptions={allCategories}
              label={_startCase(ENTITIES.CATEGORIES.label.plural)}
              groupBy={'firstLetter'}
            />
          </Box>
          <Box className={classes.inputContainer}>
            <AutocompleteSearch
              initialOptions={allIngredients}
              label={_startCase(ENTITIES.INGREDIENTS.label.plural)}
              groupBy={'type'}
            />
          </Box>
          <Box className={classes.inputContainer}>
            <TextField
              id="create-description"
              label="Описание"
              variant="outlined"
              multiline
              fullWidth
            />
          </Box>
        </>
      )}
    </Box>
  )
}
