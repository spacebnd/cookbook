import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import { PhotoCamera } from '@material-ui/icons'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

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
    opacity: 0.5,
  },
}))

UploadImage.propTypes = {
  setImage: PropTypes.func,
  image: PropTypes.string,
  title: PropTypes.string,
}

export default function UploadImage({ setImage, image, title }) {
  const classes = useStyles()

  const uploadHandler = async (event) => {
    const file = event.target.files[0]
    if (!file) return
    const base64 = await convertToBase64(file)
    setImage(base64)
  }

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

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
        <img src={image} alt={title} className={classes.uploadPreview} />
      </label>
    </>
  )
}
