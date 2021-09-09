import React, { useState } from 'react'
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
import { setActiveCreateModal, setEditableEntity } from '../../store/modules/ui'
import { useDispatch } from 'react-redux'
import { deleteRecipe } from '../../store/modules/entities'

TabContentItem.propTypes = {
  item: PropTypes.object,
  entity: PropTypes.string,
  types: PropTypes.object,
}

export default function TabContentItem({ item, entity, types }) {
  const dispatch = useDispatch()
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false)
  const typeId = types ? item.type : null

  const openDeleteConfirmModal = () => {
    setConfirmDeleteModalOpen(true)
  }

  const closeDeleteConfirmModal = () => {
    setConfirmDeleteModalOpen(false)
  }

  const getDialogContent = () => {
    let type = 'элемент'
    const name = item.title

    if (entity === ENTITIES.INGREDIENTS.value) {
      type = 'ингредиент'
    }
    if (entity === ENTITIES.CATEGORIES.value) {
      type = 'категорию'
    }

    return `Вы уверены, что хотите удалить ${type} ${name}?`
  }

  const editItemHandler = () => {
    dispatch(setEditableEntity(item))
    dispatch(setActiveCreateModal(entity))
  }

  const deleteItemHandler = () => {
    dispatch(deleteRecipe(item.id))
    closeDeleteConfirmModal()
  }

  return (
    <>
      <ListItem>
        <ListItemText primary={item.title} secondary={item.type ? types[typeId].title : null} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="edit" onClick={editItemHandler}>
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
          <DialogContentText id="confirm-delete-dialog-description">
            {getDialogContent()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmModal}>
            <Typography variant="button">Отмена</Typography>
          </Button>
          <Button onClick={deleteItemHandler}>
            <Typography variant="button" color="error">
              Да, удалить
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
