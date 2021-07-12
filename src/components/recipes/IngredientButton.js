import React from 'react'
import PropTypes from 'prop-types'
import {  Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { variables } from '../../common/theme.js'

const useStyles = makeStyles(() => ({
  root: {
    margin: '0 5px 5px 0',
    fontSize: '12px',
    textTransform: 'lowercase',
    backgroundColor: variables.ingredientButton.mainColor,
    '&:hover': {
      backgroundColor: variables.ingredientButton.mainColor,
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: variables.ingredientButton.focusColor,
    },
  },
}))

IngredientButton.propTypes = {
  ingredient: PropTypes.string,
}

export default function IngredientButton(props) {
  const classes = useStyles()

  return <Chip className={classes.root} component="button" label={props.ingredient} />
}
