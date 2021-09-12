import React, { useState } from 'react'
import { Chip, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete'
import PropTypes from 'prop-types'
import {
  convertArrayToAlphabeticalGroupingByTitle,
  convertArrayToAlphabeticalGroupingByType,
} from '../../common/utils.js'
import { useSelector } from 'react-redux'
import { selectAllEntitiesByType } from '../../store/modules/entities'
import { ENTITIES } from '../../common/constants'

const useStyles = makeStyles(() => ({
  listbox: {
    fontSize: '15px',
  },
  option: {
    minHeight: '35px',
    maxHeight: '35px',
  },
  groupLabel: {
    fontSize: '10px',
    fontWeight: '700',
    minHeight: '30px',
  },
}))

AutocompleteSearch.propTypes = {
  options: PropTypes.array,
  label: PropTypes.string,
  groupTypes: PropTypes.object,
  groupBy: PropTypes.string,
  limit: PropTypes.number,
  value: PropTypes.array,
  changeHandler: PropTypes.func,
  error: PropTypes.bool,
}

export default function AutocompleteSearch({
  label,
  initialOptions,
  groupTypes,
  groupBy,
  limit,
  value,
  changeHandler,
  error,
}) {
  const classes = useStyles()

  const [disableInput, setDisableInput] = useState(value.length >= limit)
  const ingredientTypes = useSelector(selectAllEntitiesByType(ENTITIES.INGREDIENT_TYPES.value))

  let options = initialOptions
  if (groupBy === 'firstLetter') {
    options = convertArrayToAlphabeticalGroupingByTitle(initialOptions)
  } else if (groupBy === 'type') {
    options = convertArrayToAlphabeticalGroupingByType(initialOptions, ingredientTypes)
  }

  options.sort((a, b) => {
    if (a.firstLetter < b.firstLetter) return -1
    if (a.firstLetter > b.firstLetter) return 1
    return 0
  })

  const groupByHandler = groupBy
    ? (option) => {
        if (groupBy === 'type') {
          const typeId = option.type
          return groupTypes[typeId].title
        } else {
          return option[groupBy]
        }
      }
    : null

  return (
    <Autocomplete
      classes={{
        listbox: classes.listbox,
        option: classes.option,
        groupLabel: classes.groupLabel,
      }}
      size="small"
      multiple
      value={value}
      disabled={disableInput}
      onChange={(event, newValue) => {
        setDisableInput(newValue.length >= limit)
        changeHandler(newValue)
      }}
      options={options}
      getOptionSelected={(option, value) => option.id === value.id}
      noOptionsText="Нет совпадений"
      groupBy={groupByHandler}
      getOptionLabel={(option) => option.title}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip size="small" label={option.title} {...getTagProps({ index })} disabled={false} />
        ))
      }
      renderInput={(params) => (
        <TextField size="small" {...params} variant="outlined" label={label} error={error} />
      )}
    />
  )
}
