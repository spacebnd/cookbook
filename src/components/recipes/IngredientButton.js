import React from 'react'
import PropTypes from 'prop-types'
import { Box, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { customStyles } from '../../common/theme.js'
import { useSelector } from 'react-redux'
import { selectEntityById } from '../../store/modules/entities'
import { ENTITIES } from '../../common/constants'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
  },
  button: {
    ...customStyles.customButtonBase,
    ...customStyles.customButtonIngredient,
    width: '55%',
    padding: '4px',
    marginRight: '5px',
    fontSize: '12px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  unitsInput: {
    width: '45%',
  },
  unitsInputRoot: {
    padding: '4px',
    textAlign: 'center',
    fontSize: '12px',
    color: 'initial',
  },
}))

IngredientButton.propTypes = {
  ingredientId: PropTypes.string,
  ingredientQuantity: PropTypes.string,
}

export default function IngredientButton({ ingredientId, ingredientQuantity }) {
  const classes = useStyles()
  const ingredient = useSelector(selectEntityById(ENTITIES.INGREDIENTS.value, ingredientId))

  return (
    <Box className={classes.root}>
      <Box className={classes.button} component="button">
        {ingredient?.title}
      </Box>
      <TextField
        className={classes.unitsInput}
        InputProps={{
          inputProps: {
            className: classes.unitsInputRoot,
          },
        }}
        variant="outlined"
        size="small"
        value={ingredientQuantity}
        disabled
      />
    </Box>
  )
}
