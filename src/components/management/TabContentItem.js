import React from 'react'
import ListItemText from '@material-ui/core/ListItemText'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  ListItemSecondaryAction,
  Typography,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit.js'
import DeleteIcon from '@material-ui/icons/Delete.js'
import ListItem from '@material-ui/core/ListItem'
import PropTypes from 'prop-types'
import { ENTITIES } from '../../common/constants.js'

TabContentItem.propTypes = {
  item: PropTypes.object,
  entity: PropTypes.string,
}

export default function TabContentItem(props) {
  const { item, entity } = props
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = React.useState(false)

  const openDeleteConfirmModal = () => {
    setConfirmDeleteModalOpen(true)
  }

  const closeDeleteConfirmModal = () => {
    setConfirmDeleteModalOpen(false)
  }

  const getDialogContent = () => {
    let type = 'элемент'
    const name = item.name

    if (entity === ENTITIES.INGREDIENTS.value) {
      type = 'ингредиент'
    }
    if (entity === ENTITIES.CATEGORIES.value) {
      type = 'категорию'
    }

    return `Вы уверены, что хотите удалить ${type} ${name}?`
  }

  const deleteItem = () => {
    console.log('deleteItem')
    closeDeleteConfirmModal()
  }

  return (
    <>
      <ListItem>
        <ListItemText primary={item.name} secondary={item.type ? item.type : null} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={openDeleteConfirmModal}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      <Dialog
        open={confirmDeleteModalOpen}
        onClose={closeDeleteConfirmModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{getDialogContent()}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmModal}>
            <Typography variant="button">Отмена</Typography>
          </Button>
          <Button onClick={deleteItem}>
            <Typography variant="button" color="error">
              Да, удалить
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
