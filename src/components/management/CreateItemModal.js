import React, { forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import DoneIcon from '@material-ui/icons/Done'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveCreateModal } from '../../store/modules/ui.js'
import { ENTITIES } from '../../common/constants.js'
import CreateItemForm from './CreateItemForm.js'

const useStyles = makeStyles(() => ({
  header: {
    position: 'relative',
  },
  title: {
    flex: 1,
    marginLeft: '5px',
    fontWeight: '500',
  },
}))

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function CreateItemModal() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const activeCreateModal = useSelector((state) => state.ui.activeCreateModal)

  const getHeaderTitle = () => {
    let title = ''

    if (activeCreateModal === ENTITIES.RECIPES.value) {
      title = `Новый ${ENTITIES.RECIPES.label.singular}`
    } else if (activeCreateModal === ENTITIES.INGREDIENTS.value) {
      title = `Новый ${ENTITIES.INGREDIENTS.label.singular}`
    } else if (activeCreateModal === ENTITIES.CATEGORIES.value) {
      title = `Новая ${ENTITIES.CATEGORIES.label.singular}`
    }

    return (
      <Typography className={classes.title} align="center">
        {title}
      </Typography>
    )
  }

  const closeModalHandler = () => {
    dispatch(setActiveCreateModal(null))
  }

  return (
    <Dialog
      fullScreen
      open={!!activeCreateModal}
      onClose={closeModalHandler}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.header}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={closeModalHandler} aria-label="close">
            <CloseIcon />
          </IconButton>

          {getHeaderTitle()}

          <Button autoFocus color="inherit" onClick={closeModalHandler}>
            <DoneIcon />
          </Button>
        </Toolbar>
      </AppBar>

      <CreateItemForm />
    </Dialog>
  )
}
