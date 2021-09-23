import React from 'react'
import { Box, CircularProgress } from '@material-ui/core'
import PropTypes from 'prop-types'

Loader.propTypes = {
  styles: PropTypes.object,
}

export default function Loader({ styles }) {
  return (
    <Box style={styles}>
      <CircularProgress size={20} thickness={5} color="primary" />
    </Box>
  )
}
