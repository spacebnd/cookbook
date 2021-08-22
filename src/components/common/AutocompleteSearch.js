import React, { useState } from 'react'
import { Chip, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete'
import PropTypes from 'prop-types'
import { convertArrayToAlphabeticalGrouping } from '../../common/utils.js'

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
  groupBy: PropTypes.string,
  limit: PropTypes.number,
  value: PropTypes.array,
  changeHandler: PropTypes.func,
}

export default function AutocompleteSearch({
  label,
  initialOptions,
  limitTags,
  groupBy,
  limit,
  value,
  changeHandler,
}) {
  const classes = useStyles()

  const groupByHandler = groupBy ? (option) => option[groupBy] : null
  let options = initialOptions

  const [disableInput, setDisableInput] = useState(value.length >= limit)

  if (groupBy === 'firstLetter') {
    options = convertArrayToAlphabeticalGrouping(initialOptions)
  }

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
      limitTags={limitTags}
      getOptionLabel={(option) => option.name}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip size="small" label={option.name} {...getTagProps({ index })} disabled={false} />
        ))
      }
      renderInput={(params) => (
        <TextField size="small" {...params} variant="outlined" label={label} />
      )}
    />
  )
}
