import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectEntityById } from '../../store/modules/entities'
import { ENTITIES } from '../../common/constants'
import { makeStyles } from '@material-ui/core/styles'
import { Box, TextField } from '@material-ui/core'
import { customStyles } from '../../common/theme.js'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
  },
  button: {
    ...customStyles.customButton,
    width: '55%',
    padding: '4px',
    marginRight: '5px',
    fontSize: '12px',
    fontWeight: '500',
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
  },
  unitsInput: {
    width: '45%',
    borderRadius: '5px',
  },
  unitsInputRoot: {
    padding: '4px',
    textAlign: 'center',
    fontSize: '12px',
    color: 'initial',
  },
}))

IngredientButton.propTypes = {
  ingredientId: PropTypes.string,
  ingredientQuantity: PropTypes.string,
}

export default function IngredientButton({ ingredientId, ingredientQuantity }) {
  const classes = useStyles()
  const ingredient = useSelector(selectEntityById(ENTITIES.INGREDIENTS.value, ingredientId))

  return (
    <Box className={classes.root}>
      <Box className={classes.button}>{ingredient?.title}</Box>
      <TextField
        className={classes.unitsInput}
        InputProps={{
          inputProps: {
            className: classes.unitsInputRoot,
          },
        }}
        size="small"
        value={ingredientQuantity}
        disabled
      />
    </Box>
  )
}
