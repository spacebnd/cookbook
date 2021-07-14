import React from 'react'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'

CategoryItem.propTypes = {
  item: PropTypes.object,
}

export default function CategoryItem(props) {
  const { item } = props

  return (
    <Box>
      <Typography>{item.name}</Typography>
    </Box>
  )
}
