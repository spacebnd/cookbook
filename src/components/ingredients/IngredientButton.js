import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    padding: '1px',
    margin: '0 5px 5px 0',
    fontSize: '12px',
    textTransform: 'lowercase',
  },
}))

const IngredientButton = (props) => {
  const classes = useStyles()

  return (
    <Button className={classes.root} variant="outlined" size="small">
      {props.ingredient}
    </Button>
  )
}

IngredientButton.propTypes = {
  ingredient: PropTypes.string,
}

export default IngredientButton
