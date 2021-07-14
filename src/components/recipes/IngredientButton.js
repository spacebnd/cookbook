import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { customStyles } from '../../common/theme.js'

const useStyles = makeStyles(() => ({
  root: {
    ...customStyles.customButtonBase,
    ...customStyles.customButtonIngredient,
  },
}))

IngredientButton.propTypes = {
  ingredient: PropTypes.string,
}

export default function IngredientButton(props) {
  const classes = useStyles()

  return (
    <Box className={classes.root} component="button">
      {props.ingredient}
    </Box>
  )
}
