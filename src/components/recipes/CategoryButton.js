import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectEntityById } from '../../store/modules/entities'
import { ENTITIES } from '../../common/constants'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import { customStyles } from '../../common/theme.js'

const useStyles = makeStyles(() => ({
  root: {
    ...customStyles.customButton,
    padding: '4px',
    margin: '0 5px 5px 0',
    fontSize: '12px',
    fontWeight: '500',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
    borderRadius: '5px',
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
