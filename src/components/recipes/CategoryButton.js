import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { customStyles } from '../../common/theme.js'

const useStyles = makeStyles(() => ({
  root: {
    ...customStyles.customButtonBase,
    ...customStyles.customButtonCategory,
  },
}))

CategoryButton.propTypes = {
  category: PropTypes.string,
}

export default function CategoryButton(props) {
  const classes = useStyles()

  return (
    <Box className={classes.root} component="button">
      {props.category}
    </Box>
  )
}
