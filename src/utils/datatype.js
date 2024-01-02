export const allObjectsInArray = (array = []) => {
  if (!array.length) return false
  return array.every((item) => typeof item === 'object' && item !== null && !Array.isArray(item))
}
