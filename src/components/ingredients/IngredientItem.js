import React from 'react'
import PropTypes from 'prop-types'

IngredientItem.propTypes = {
  ingredient: PropTypes.object,
}

function IngredientItem(props) {
  return <div>{props.ingredient.name}</div>
}

export default IngredientItem
