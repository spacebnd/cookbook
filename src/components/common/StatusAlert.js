import * as React from 'react'
import { Slide, Snackbar } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { selectStatusAlert, setStatusAlert } from '../../store/modules/ui'
import { STATUS_ALERT_CONFIG } from '../../common/constants'
import { makeStyles } from '@material-ui/core/styles'
import { customStyles } from '../../common/theme'

const useStyles = makeStyles(() => ({
  success: {
    ...customStyles.statusAlertSuccess,
  },
  error: {
    ...customStyles.statusAlertError,
  },
}))

function SlideTransition(props) {
  return <Slide {...props} direction={STATUS_ALERT_CONFIG.direction} />
}

export default function TransitionsSnackbar() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const statusAlert = useSelector(selectStatusAlert)

  const handleClose = () => {
    dispatch(
      setStatusAlert({
        message: null,
        type: null,
      })
    )
  }

  const snackbarContentProps = {
    classes: {
      root: classes[statusAlert.type],
    },
  }

  return (
    <Snackbar
      open={!!statusAlert.message}
      message={statusAlert.message}
      onClose={handleClose}
      autoHideDuration={STATUS_ALERT_CONFIG.duration}
      anchorOrigin={{
        vertical: STATUS_ALERT_CONFIG.vertical,
        horizontal: STATUS_ALERT_CONFIG.horizontal,
      }}
      TransitionComponent={SlideTransition}
      ContentProps={snackbarContentProps}
    />
  )
}
