import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { TextField } from '@material-ui/core'
import { useSelector } from 'react-redux'

function RecipesSearch() {
  const allRecipes = useSelector((state) => state.entities.allRecipes)

  return (
    <Autocomplete
      id="combo-box-demo"
      options={allRecipes}
      getOptionLabel={(option) => option.name}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Поиск по рецептам" variant="outlined" />
      )}
    />
  )
}

export default RecipesSearch
