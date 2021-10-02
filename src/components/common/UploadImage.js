import PropTypes from 'prop-types'
import { uploadImageToStorageAndGetUrl } from '../../common/utils'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { PhotoCamera } from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoading, setIsLoading, setStatusAlert } from '../../store/modules/ui'
import Loader from './Loader'
import { STATUS_ALERT_MESSAGES, STATUS_ALERT_TYPES } from '../../common/constants'

const useStyles = makeStyles(() => ({
  uploadPhotoInput: {
    display: 'none',
  },
  uploadPhotoLabel: {
    color: '#757575',
  },
  uploadPreview: {
    maxWidth: '100%',
    maxHeight: '200px',
    border: '1px dashed #757575',
    opacity: 0.5,
  },
}))

UploadImage.propTypes = {
  setImage: PropTypes.func,
  image: PropTypes.string,
  title: PropTypes.string,
}

export default function UploadImage({ setImage, image, title }) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const isLoading = useSelector(selectIsLoading)

  const uploadHandler = async (event) => {
    try {
      dispatch(setIsLoading(true))
      const file = event.target.files[0]
      if (!file) return
      const imageUrl = await uploadImageToStorageAndGetUrl(file)
      setImage(imageUrl)
    } catch (error) {
      setStatusAlert({
        message: STATUS_ALERT_MESSAGES.UNKNOWN_ERROR,
        type: STATUS_ALERT_TYPES.ERROR,
      })
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  const labelContent = (image ? 'Заменить' : 'Загрузить') + ' изображение'

  return (
    <>
      <input
        accept="image/*"
        className={classes.uploadPhotoInput}
        id="upload picture"
        type="file"
        onChange={uploadHandler}
      />

      <label htmlFor="upload picture">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
        <Typography className={classes.uploadPhotoLabel} display="inline">
          {labelContent}
        </Typography>

        {image && <img src={image} alt={title} className={classes.uploadPreview} />}
      </label>
      {isLoading && <Loader />}
    </>
  )
}
