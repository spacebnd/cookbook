import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import { Fab, Menu, MenuItem, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add.js'
import { ENTITIES } from '../../common/constants.js'
import _startCase from 'lodash/startCase.js'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setActiveCreateModal } from '../../store/modules/ui.js'

const useStyles = makeStyles(() => {
  return {
    tabs: {
      marginBottom: '10px',
    },
    addButton: {
      position: 'fixed',
      bottom: '75px',
      right: '20px',
      zIndex: '1000',
    },
  }
})

CreateItemButton.propTypes = {
  selectItemHandler: PropTypes.func,
}

export default function CreateItemButton() {
  const dispatch = useDispatch()
  const [dropdownAnchor, setDropdownAnchor] = useState(null)

  const openAddItemDropdown = (event) => {
    setDropdownAnchor(event.currentTarget)
  }

  const closeAddItemDropdown = () => {
    setDropdownAnchor(null)
  }

  const selectItemHandler = (value) => {
    dispatch(setActiveCreateModal(value))
    closeAddItemDropdown()
  }

  const classes = useStyles()
  return (
    <>
      <Box className={classes.addButton}>
        <Fab size="large" color="primary" aria-label="add" onClick={openAddItemDropdown}>
          <AddIcon />
        </Fab>
      </Box>

      <Menu
        id="add-item-menu"
        anchorEl={dropdownAnchor}
        keepMounted
        open={Boolean(dropdownAnchor)}
        onClose={closeAddItemDropdown}
      >
        {Object.values(ENTITIES).map((entity, index) => (
          <MenuItem key={entity.value + index} onClick={() => selectItemHandler(entity.value)}>
            <Typography>{_startCase(entity.label.singular)}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}