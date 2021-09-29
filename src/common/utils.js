import { storage } from './firebase'

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

export const getImageUrl = (imageName) => {
  const path = 'recipes'
  return storage.ref().child(`${path}/${imageName}.png`).getDownloadURL()
}
