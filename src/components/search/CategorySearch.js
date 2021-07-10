import React from 'react'
import Card from '@material-ui/core/Card'
import { Chip, TextField, Typography } from '@material-ui/core'
import { ENTITIES } from '../../common/constants.js'
import IconButton from '@material-ui/core/IconButton'
import clsx from 'clsx'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore.js'
import Collapse from '@material-ui/core/Collapse'
import { makeStyles } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  categoryContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: '15px',
  },
  categoryHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}))

function CategorySearch() {
  const classes = useStyles()
  const allCategories = useSelector((state) => state.entities.allCategories)
  const [expanded, setExpanded] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState([])

  const options = allCategories.map((option) => {
    const firstLetter = option.name[0].toUpperCase()
    return {
      firstLetter,
      ...option,
    }
  })

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <>
      <Card className={classes.categoryContainer} onClick={handleExpandClick}>
        <Typography className={classes.categoryHeader}>{ENTITIES.CATEGORIES.label}</Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </Card>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Autocomplete
          multiple
          id="categories-search-autocomplete"
          value={selectedValue}
          onChange={(event, newValue) => {
            setSelectedValue(newValue)
          }}
          options={options}
          groupBy={(option) => option.firstLetter}
          getOptionSelected={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip label={option.name} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant="outlined" placeholder="Поиск по категориям" />
          )}
          noOptionsText="Нет совпадений"
        />
      </Collapse>
    </>
  )
}

export default CategorySearch
