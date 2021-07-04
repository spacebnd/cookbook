import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    margin: '5px',
    padding: '2px 5px',
    fontSize: '12px',
  },
}))

const CategoryButton = (props) => {
  const classes = useStyles()

  return (
    <Button className={classes.root} variant="outlined" size="small">
      {props.category}
    </Button>
  )
}

CategoryButton.propTypes = {
  category: PropTypes.string,
}

export default CategoryButton
