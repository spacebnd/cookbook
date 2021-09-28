import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectStatusAlert, setStatusAlert } from '../../store/modules/ui'
import { STATUS_ALERT_TYPES } from '../../common/constants'
import { Box, Fade, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { customStyles } from '../../common/theme'

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 10,
  },
  message: {
    fontWeight: 500,
  },
  success: {
    ...customStyles.statusAlertSuccess,
  },
  error: {
    ...customStyles.statusAlertError,
  },
}))

export default function StatusAlert() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const statusAlert = useSelector(selectStatusAlert)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setChecked(!!statusAlert.message)

    setTimeout(() => {
      setChecked(false)
    }, 1000)

    setTimeout(() => {
      dispatch(
        setStatusAlert({
          message: null,
          type: null,
        })
      )
    }, 1500)
  }, [dispatch, statusAlert.message])

  return (
    <Fade in={checked} timeout={500}>
      <Box
        className={clsx({
          [classes.root]: true,
          [classes.success]: statusAlert.type === STATUS_ALERT_TYPES.SUCCESS,
          [classes.error]: statusAlert.type === STATUS_ALERT_TYPES.ERROR,
        })}
      >
        <Typography className={classes.message} variant="caption">
          {statusAlert.message}
        </Typography>
      </Box>
    </Fade>
  )
}
