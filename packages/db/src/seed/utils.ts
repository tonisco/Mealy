export const shuffleArray = <T>(array: Array<T>) => {
  // Fisher yates shuffle
  for (let i = 0; i < array.length; i++) {
    const j = Math.round(Math.random() * (1 + i))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  return array
}

export const shuffleAndReduce = <T>(array: Array<T>, n: number): T[] =>
  shuffleArray(array).slice(0, n)

export const randomItem = <T>(array: Array<T>) =>
  array[Math.floor(Math.random() * array.length)]

export const randomNumber = (n?: number) =>
  Math.floor(Math.random() * (n || 5)) + 1

export const subtractAYear = (date: Date) => {
  const dateCopy = new Date(date)

  dateCopy.setFullYear(date.getFullYear() - 1)

  return dateCopy
}
