import React from 'react'
import ListItemText from '@material-ui/core/ListItemText'
import { IconButton, ListItemSecondaryAction } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit.js'
import DeleteIcon from '@material-ui/icons/Delete.js'
import ListItem from '@material-ui/core/ListItem'
import PropTypes from 'prop-types'

TabContentItem.propTypes = {
  item: PropTypes.object,
}

export default function TabContentItem(props) {
  const { item } = props

  return (
    <ListItem>
      <ListItemText primary={item.name} secondary={item.type ? item.type : null} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
