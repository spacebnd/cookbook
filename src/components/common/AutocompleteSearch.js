import React, { useState } from 'react'
import { Chip, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete'
import PropTypes from 'prop-types'

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
}

export default function AutocompleteSearch(props) {
  const classes = useStyles()
  const { label, initialOptions, groupBy } = props
  const [selectedValue, setSelectedValue] = useState([])

  const groupByHandler = groupBy ? (option) => option[groupBy] : null
  let options = initialOptions

  if (groupBy === 'firstLetter')
    options = initialOptions.map((option) => {
      const firstLetter = option.name[0].toUpperCase()
      return {
        firstLetter,
        ...option,
      }
    })

  return (
    <Autocomplete
      classes={{
        listbox: classes.listbox,
        option: classes.option,
        groupLabel: classes.groupLabel,
      }}
      size="small"
      multiple
      value={selectedValue}
      onChange={(event, newValue) => {
        setSelectedValue(newValue)
      }}
      options={options}
      getOptionSelected={(option, value) => option.id === value.id}
      noOptionsText="Нет совпадений"
      groupBy={groupByHandler}
      getOptionLabel={(option) => option.name}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip size="small" label={option.name} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField size="small" {...params} variant="outlined" label={label} />
      )}
    />
  )
}
