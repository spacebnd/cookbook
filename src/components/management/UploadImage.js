import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectIsLoading } from '../../store/modules/ui'
import { convertFileToBase64 } from '../../common/utils'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { PhotoCamera } from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton'

import Loader from '../common/Loader'

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
  imageData: PropTypes.object,
  setImageData: PropTypes.func,
  title: PropTypes.string,
  editableEntity: PropTypes.object,
  setIsImageReplaced: PropTypes.func,
}

export default function UploadImage({
  imageData,
  setImageData,
  title,
  editableEntity,
  setIsImageReplaced,
}) {
  const classes = useStyles()
  const isLoading = useSelector(selectIsLoading)

  const uploadHandler = async (event) => {
    const file = event.target.files[0]

    if (!file) return
    const base64 = await convertFileToBase64(file)

    if (editableEntity) setIsImageReplaced(true)

    setImageData((prevState) => {
      return {
        ...prevState,
        base64,
        file,
      }
    })
  }

  const labelContent = (imageData?.url ? 'Заменить' : 'Загрузить') + ' изображение'

  return (
    <>
      <input
        accept="image/*"
        className={classes.uploadPhotoInput}
        id="upload picture"
        type="file"
        onChange={uploadHandler}
        disabled={isLoading}
      />

      <label htmlFor="upload picture">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          disabled={isLoading}
        >
          <PhotoCamera />
        </IconButton>
        <Typography className={classes.uploadPhotoLabel} display="inline">
          {labelContent}
        </Typography>

        {imageData?.base64 && (
          <img src={imageData.base64} alt={title} className={classes.uploadPreview} />
        )}
      </label>
      {isLoading && <Loader />}
    </>
  )
}
