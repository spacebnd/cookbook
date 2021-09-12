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
    const typeTitle = types[option.type].title
    const firstLetter = typeTitle[0].toUpperCase()
    return {
      firstLetter,
      ...option,
    }
  })
}
