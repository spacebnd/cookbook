import React from 'react'
import PropTypes from 'prop-types'

CategoryItem.propTypes = {
  category: PropTypes.object,
}

function CategoryItem(props) {
  return <div>{props.category.name}</div>
}

export default CategoryItem
