import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { variables } from '../../common/theme.js'

const useStyles = makeStyles(() => ({
  root: {
    marginRight: '5px',
    fontSize: '12px',
    backgroundColor: variables.categoryButton.mainColor,
    '&:hover': {
      backgroundColor: variables.categoryButton.mainColor,
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: variables.categoryButton.focusColor,
    },
  },
}))

CategoryButton.propTypes = {
  category: PropTypes.string,
}

export default function CategoryButton(props) {
  const classes = useStyles()

  return (
    <Button className={classes.root} variant="outlined" size="small">
      {props.category}
    </Button>
  )
}
