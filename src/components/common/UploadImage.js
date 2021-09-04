import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import { PhotoCamera } from '@material-ui/icons'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  uploadPhotoInput: {
    display: 'none',
  },
  uploadPhotoLabel: {
    color: '#757575',
  },
}))

export default function UploadImage() {
  const classes = useStyles()

  const uploadHandler = async (event) => {
    const file = event.target.files[0]
    const base64 = await convertToBase64(file)
    console.log('base64', base64)
  }

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

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
          Загрузить изображение
        </Typography>
      </label>
    </>
  )
}
