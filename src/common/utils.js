import { storage, RECIPE_IMAGES_PATH } from './firebase'
import { v4 as uuidv4 } from 'uuid'
import compressImage from 'browser-image-compression'

export const convertArrayToAlphabeticalGroupingByTitle = (initialArray) => {
  return initialArray.map((option) => {
    const firstLetter = option.title[0].toUpperCase()
    return {
      firstLetter,
      ...option,
    }
  })
}

export const convertArrayToAlphabeticalGroupingByType = (initialArray, types) => {
  return initialArray.map((option) => {
    const typeTitle = types[option.type]?.title

    if (typeTitle) {
      const firstLetter = typeTitle[0].toUpperCase()
      return {
        firstLetter,
        ...option,
      }
    } else {
      return initialArray
    }
  })
}

export const getImageUrlFromStorage = (fileName) => {
  try {
    return storage
      .ref()
      .child(RECIPE_IMAGES_PATH + fileName)
      .getDownloadURL()
  } catch (error) {
    console.error(error)
  }
}

export const uploadImageToStorage = async (file) => {
  const extension = file.type.match(/image\/(.*)/)[1]
  const fileName = `${uuidv4()}.${extension}`

  const imageData = {
    url: null,
    fileName,
  }

  const compressOptions = {
    maxSizeMB: 0.5,
    useWebWorker: true,
  }

  try {
    const compressedImage = await compressImage(file, compressOptions)
    const snapshot = await storage
      .ref()
      .child(RECIPE_IMAGES_PATH + fileName)
      .put(compressedImage)
    imageData.url = await snapshot.ref.getDownloadURL()
  } catch (error) {
    console.error(error)
  }

  return {
    url: imageData.url,
    fileName,
  }
}

export const deleteImageFromStorage = async (fileName) => {
  try {
    await storage
      .ref()
      .child(RECIPE_IMAGES_PATH + fileName)
      .delete()
  } catch (error) {
    console.error(error)
  }
}
