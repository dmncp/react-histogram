import { ChartData, DateFormat } from './../lib/types/HistogramTypes'

const getRandomValue = (minValue: number, maxValue: number): number => {
  return Math.floor(Math.random() * (maxValue - minValue) + minValue)
}

export const getDateValue = (date: number, format: DateFormat): number => {
  switch (format) {
    case 'HOURS':
      return new Date(date).getHours()
    case 'DAYS':
      return new Date(date).getDate()
  }
}

/**
 * Random data generator
 * @param startDate "date from" in ms
 * @param endDate "date to" in ms
 * @param itemsNumber number of items to generate
 * @returns chart data set
 */
export const generateData = (startDate: number, endDate: number, itemsNumber: number): ChartData[] => {
  const dataSet: ChartData[] = []
  const timeStep = Math.floor((endDate - startDate) / itemsNumber)

  for (let i = 0; i < itemsNumber; i++) {
    const x = startDate + timeStep * i // ms
    const y = getRandomValue(0, 100)

    dataSet.push({ x, y })
  }

  return dataSet
}
