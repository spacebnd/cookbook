import React from 'react'
import { Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ClearIcon from '@material-ui/icons/Clear'
import DoneIcon from '@material-ui/icons/Done'

const useStyles = makeStyles(() => {
  return {
    root: {
      position: 'fixed',
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%',
      bottom: '15%',
    },
  }
})

function ActionButtons() {
  const classes = useStyles()

  return (
    <Box component="div" className={classes.root}>
      <Button variant="contained" color="primary" size="small" startIcon={<ClearIcon />}>
        Сбросить
      </Button>
      <Button variant="contained" color="primary" size="small" startIcon={<DoneIcon />}>
        Применить
      </Button>
    </Box>
  )
}

export default ActionButtons
