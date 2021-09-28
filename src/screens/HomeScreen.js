import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { subscribeToAllEntities } from '../store/modules/entities'
import { selectIsLoading } from '../store/modules/ui'
import { Box } from '@material-ui/core'
import StatusAlert from '../components/common/StatusAlert'
import { ENTITIES } from '../common/constants'

import NavigationBar from '../components/common/NavigationBar.js'
import ScreenContent from '../components/common/ScreenContent.js'
import Loader from '../components/common/Loader'

export default function HomeScreen() {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)

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
      {isLoading && <Loader />}
    </Box>
  )
}
