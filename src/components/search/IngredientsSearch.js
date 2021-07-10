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
  ingredientsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: '15px',
  },
  ingredientsHeader: {
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

function IngredientsSearch() {
  const classes = useStyles()
  const allIngredients = useSelector((state) => state.entities.allIngredients)
  const [expanded, setExpanded] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState([])

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <>
      <Card className={classes.ingredientsContainer} onClick={handleExpandClick}>
        <Typography className={classes.ingredientsHeader}>{ENTITIES.INGREDIENTS.label}</Typography>
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
          id="ingredients-search-autocomplete"
          value={selectedValue}
          onChange={(event, newValue) => {
            setSelectedValue(newValue)
          }}
          options={allIngredients}
          groupBy={(option) => option.type}
          getOptionLabel={(option) => option.name}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip label={option.name} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant="outlined" placeholder="Поиск по игредиентам" />
          )}
          noOptionsText="Нет совпадений"
        />
      </Collapse>
    </>
  )
}

export default IngredientsSearch
