import { storage } from './firebase'
import { v4 as uuidv4 } from 'uuid'

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
  const path = 'recipes'
  return storage.ref().child(`${path}/${fileName}.png`).getDownloadURL()
}

export const uploadImageToStorageAndGetUrl = async (file) => {
  const path = 'recipes'
  const fileName = uuidv4()
  const snapshot = await storage.ref().child(`${path}/${fileName}.png`).put(file)

  return await snapshot.ref.getDownloadURL()
}
