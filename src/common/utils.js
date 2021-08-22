export const convertArrayToAlphabeticalGrouping = (initialArray) => {
  return initialArray.map((option) => {
    const firstLetter = option.title[0].toUpperCase()
    return {
      firstLetter,
      ...option,
    }
  })
}
