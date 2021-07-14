import React from 'react'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'

IngredientItem.propTypes = {
  item: PropTypes.object,
}

export default function IngredientItem(props) {
  const { item } = props

  return (
    <Box>
      <Typography>
        {item.name} {item.type}
      </Typography>
    </Box>
  )
}
