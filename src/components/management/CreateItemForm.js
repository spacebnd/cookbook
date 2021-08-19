import React from 'react'
import { Box, TextField } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import AutocompleteSearch from '../common/AutocompleteSearch.js'
import _startCase from 'lodash/startCase.js'
import { ENTITIES } from '../../common/constants.js'

const useStyles = makeStyles(() => {
  return {
    root: {
      width: '100%',
      padding: '10px',
      marginTop: '5px',
      boxSizing: 'border-box',
    },
  }
})

export default function CreateItemForm() {
  const classes = useStyles()
  const activeCreateModal = useSelector((state) => state.ui.activeCreateModal)
  const allTypes = useSelector((state) => state.entities.allTypes)

  console.log('activeCreateModal', activeCreateModal)
  // todo
  // activeCreateModal = recipes
  // id
  // title
  // categories - select + create new
  // ingredients - select + create new
  // description
  // edit recipe

  // activeCreateModal = ingredients
  // id
  // title

  // activeCreateModal = categories
  // id
  // title

  return (
    <Box className={classes.root}>
      <TextField variant="outlined" id="title" label="Название" fullWidth />
      <AutocompleteSearch
        initialOptions={allTypes}
        label={_startCase(ENTITIES.CATEGORIES.label.plural)}
        groupBy={'firstLetter'}
      />
    </Box>
  )
}
