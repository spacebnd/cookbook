import React, { useEffect } from 'react'
import { Box } from '@material-ui/core'
import NavigationBar from '../components/common/NavigationBar.js'
import ScreenContent from '../components/common/ScreenContent.js'
import { ENTITIES } from '../common/constants'
import { subscribeToAllEntities } from '../store/modules/entities'
import { useDispatch } from 'react-redux'
import StatusAlert from '../components/common/StatusAlert'

export default function HomeScreen() {
  const dispatch = useDispatch()

  useEffect(() => {
    Object.values(ENTITIES).forEach((entity) => {
      dispatch(subscribeToAllEntities(entity.value))
    })
  }, [dispatch])

  return (
    <Box component="div">
      <StatusAlert />
      <ScreenContent />
      <NavigationBar />
    </Box>
  )
}
