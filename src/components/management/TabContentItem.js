import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoading, setActiveCreateModal, setEditableEntity } from '../../store/modules/ui'
import { deleteEntityFromDatabase } from '../../store/modules/entities'
import { ENTITIES } from '../../common/constants.js'
import { makeStyles } from '@material-ui/core/styles'
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
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import EditIcon from '@material-ui/icons/Edit.js'
import DeleteIcon from '@material-ui/icons/Delete.js'
import { customStyles } from '../../common/theme'

TabContentItem.propTypes = {
  item: PropTypes.object,
  entity: PropTypes.string,
  types: PropTypes.object,
}

const useStyles = makeStyles(() => ({
  deleteButton: {
    color: customStyles.statusAlertError.color,
  },
}))

export default function TabContentItem({ item, entity, types }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false)
  const typeId = types ? item.type : null

  const openDeleteConfirmModal = () => {
    setConfirmDeleteModalOpen(true)
  }

  const closeDeleteConfirmModal = () => {
    setConfirmDeleteModalOpen(false)
  }

  const getDialogContent = () => {
    let type
    const name = item.title

    if (entity === ENTITIES.RECIPES.value) {
      type = 'рецепт'
    } else if (entity === ENTITIES.INGREDIENTS.value) {
      type = 'ингредиент'
    } else if (entity === ENTITIES.CATEGORIES.value) {
      type = 'категорию'
    }

    return `Вы уверены, что хотите удалить ${type} ${name}?`
  }

  const editItemHandler = () => {
    dispatch(setEditableEntity(item))
    dispatch(setActiveCreateModal(entity))
  }

  const deleteItemHandler = async () => {
    await dispatch(deleteEntityFromDatabase(item.id, entity))
    closeDeleteConfirmModal()
  }

  return (
    <>
      <ListItem>
        <ListItemText primary={item.title} secondary={item.type ? types[typeId].title : null} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="edit" onClick={editItemHandler} disabled={isLoading}>
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={openDeleteConfirmModal}
            disabled={isLoading}
          >
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
            <Typography variant="button" className={classes.deleteButton} color="error">
              Да, удалить
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
