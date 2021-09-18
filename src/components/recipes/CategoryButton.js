import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { customStyles } from '../../common/theme.js'
import { selectEntityById } from '../../store/modules/entities'
import { useSelector } from 'react-redux'
import { ENTITIES } from '../../common/constants'

const useStyles = makeStyles(() => ({
  root: {
    ...customStyles.customButtonBase,
    ...customStyles.customButtonCategory,
    padding: '4px',
    margin: '0 5px 5px 0',
  },
}))

CategoryButton.propTypes = {
  categoryId: PropTypes.string,
  applyFilterOnClickOfCategoryButton: PropTypes.func,
}

export default function CategoryButton({ categoryId, applyFilterOnClickOfCategoryButton }) {
  const classes = useStyles()
  const category = useSelector(selectEntityById(ENTITIES.CATEGORIES.value, categoryId))

  const categoryButtonHandler = () => {
    applyFilterOnClickOfCategoryButton(categoryId)
  }

  return (
    <Box className={classes.root} component="button" onClick={categoryButtonHandler}>
      {category?.title}
    </Box>
  )
}
