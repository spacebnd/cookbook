export const convertArrayToAlphabeticalGrouping = (initialArray) => {
  return initialArray.map((option) => {
    const firstLetter = option.name[0].toUpperCase()
    return {
      firstLetter,
      ...option,
    }
  })
}