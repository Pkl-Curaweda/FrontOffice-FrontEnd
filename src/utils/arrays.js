export const subGroupingArray = (arr, perGroup = 2) => {
  return arr.reduce((result, value, index, array) => {
    if (index % perGroup === 0) {
      result.push(array.slice(index, index + perGroup))
    }
    return result
  }, [])
}
