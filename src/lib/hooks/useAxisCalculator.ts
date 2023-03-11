import { getOuterHeight } from './../helpers/getOuterHeight'
import { MutableRefObject, useEffect, useMemo, useState } from 'react'

type ChartDetails = {
  containerRef: MutableRefObject<HTMLDivElement | null>
  dataValues: number[]
}

type ReturnData = {
  axisValues: number[]
}

export const useAxisCalculator = (props: ChartDetails): ReturnData => {
  const [histogramHeight, setHistogramHeight] = useState<number | undefined>(undefined)
  const [lineHeight, setLineHeight] = useState<number | undefined>(undefined)
  const [axisValues, setAxisValues] = useState<number[]>(props.dataValues)

  const sortedUniqueValues = useMemo(() => {
    const sorted = props.dataValues.sort((a, b) => b - a)
    return [...new Set(sorted)]
  }, [props.dataValues])

  useEffect(() => {
    setHistogramHeight(props.containerRef.current?.clientHeight)
    setLineHeight(getOuterHeight(props.containerRef.current?.firstElementChild))
  }, [])

  useEffect(() => {
    if (histogramHeight && lineHeight) {
      const maxValue = sortedUniqueValues[0]
      const minValue = sortedUniqueValues[sortedUniqueValues.length - 1]

      const possibleDivsNumber = Math.floor(histogramHeight / lineHeight)
      const valuesStep = Math.floor(maxValue / possibleDivsNumber)

      setAxisValues([])
      for (let i = 1; i <= possibleDivsNumber; i++) {
        setAxisValues((prevState) => [minValue + valuesStep * i, ...prevState])
      }
    }
  }, [lineHeight, histogramHeight, sortedUniqueValues])

  return {
    axisValues
  }
}
