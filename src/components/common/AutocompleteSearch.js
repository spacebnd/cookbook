import React, { useState } from 'react'
import { Chip, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useSelector } from 'react-redux'

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

export default function AutocompleteSearch() {
  const classes = useStyles()
  const allIngredients = useSelector((state) => state.entities.allIngredients)
  const [selectedValue, setSelectedValue] = useState([])

  return (
    <Autocomplete
      id="autocomplete-search"
      multiple
      classes={{
        listbox: classes.listbox,
        option: classes.option,
        groupLabel: classes.groupLabel,
      }}
      value={selectedValue}
      onChange={(event, newValue) => {
        setSelectedValue(newValue)
      }}
      size="small"
      options={allIngredients}
      groupBy={(option) => option.type}
      getOptionLabel={(option) => option.name}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip size="small" label={option.name} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField size="small" {...params} variant="outlined" label="Ингредиенты" />
      )}
      noOptionsText="Нет совпадений"
    />
  )
}

// import React, { useState } from 'react'
// import Card from '@material-ui/core/Card'
// import { Chip, TextField, Typography } from '@material-ui/core'
// import { ENTITIES } from '../../common/constants.js'
// import IconButton from '@material-ui/core/IconButton'
// import clsx from 'clsx'
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore.js'
// import Collapse from '@material-ui/core/Collapse'
// import { makeStyles } from '@material-ui/core/styles'
// import Autocomplete from '@material-ui/lab/Autocomplete'
// import { useSelector } from 'react-redux'
//
// const useStyles = makeStyles((theme) => ({
//   categoryContainer: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     paddingLeft: '15px',
//   },
//   categoryHeader: {
//     display: 'flex',
//     alignItems: 'center',
//   },
//   expand: {
//     transform: 'rotate(0deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//       duration: theme.transitions.duration.shortest,
//     }),
//   },
//   expandOpen: {
//     transform: 'rotate(180deg)',
//   },
// }))
//
// function CategorySearch() {
//   const classes = useStyles()
//   const allCategories = useSelector((state) => state.entities.allCategories)
//   const [expanded, setExpanded] = useState(false)
//   const [selectedValue, setSelectedValue] = useState([])
//
//   const options = allCategories.map((option) => {
//     const firstLetter = option.name[0].toUpperCase()
//     return {
//       firstLetter,
//       ...option,
//     }
//   })
//
//   const handleExpandClick = () => {
//     setExpanded(!expanded)
//   }
//
//   return (
//     <Autocomplete
//       multiple
//       id="categories-search-autocomplete"
//       value={selectedValue}
//       onChange={(event, newValue) => {
//         setSelectedValue(newValue)
//       }}
//       options={options}
//       groupBy={(option) => option.firstLetter}
//       getOptionSelected={(option, value) => option.id === value.id}
//       getOptionLabel={(option) => option.name}
//       renderTags={(tagValue, getTagProps) =>
//         tagValue.map((option, index) => <Chip label={option.name} {...getTagProps({ index })} />)
//       }
//       renderInput={(params) => (
//         <TextField {...params} variant="outlined" placeholder="Поиск по категориям" />
//       )}
//       noOptionsText="Нет совпадений"
//     />
//   )
// }
//
// export default CategorySearch
