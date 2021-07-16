import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import { Fab, Menu, MenuItem, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add.js'
import { ENTITIES } from '../../common/constants.js'
import _startCase from 'lodash/startCase.js'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

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

export default function CreateItemButton({ selectItemHandler }) {
  const [dropdownAnchor, setDropdownAnchor] = useState(null)

  const openAddItemDropdown = (event) => {
    setDropdownAnchor(event.currentTarget)
  }

  const closeAddItemDropdown = () => {
    setDropdownAnchor(null)
  }

  const selectItem = (value) => {
    selectItemHandler(value)
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
        {Object.values(ENTITIES).map((item, index) => (
          <MenuItem key={item.value + index} onClick={() => selectItem(item.value)}>
            <Typography>{_startCase(item.label.singular)}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
