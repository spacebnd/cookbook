import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Box, CircularProgress } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
}))

Loader.propTypes = {
  styles: PropTypes.object,
}

export default function Loader({ styles }) {
  const classes = useStyles()
  return (
    <Box className={classes.root} style={styles}>
      <CircularProgress size={20} thickness={5} color="primary" />
    </Box>
  )
}
