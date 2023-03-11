import { getOuterHeight } from './../helpers/getOuterHeight'
import { MutableRefObject, useEffect, useMemo, useState } from 'react'

type ChartDetails = {
  containerRef: MutableRefObject<HTMLDivElement | null>
  maxValue: number
}

type ReturnData = {
  axisValues: number[]
}

export const useAxisCalculator = (props: ChartDetails): ReturnData => {
  const [histogramHeight, setHistogramHeight] = useState<number | undefined>(undefined)
  const [lineHeight, setLineHeight] = useState<number | undefined>(undefined)
  const [axisValues, setAxisValues] = useState<number[]>([])

  const getLineHeight = (): number | undefined => {
    let divHeight

    const div = document.createElement('div')
    div.innerHTML = '0'
    div.style.borderBottom = '1px solid black'
    div.style.paddingTop = '10px'
    props.containerRef.current?.appendChild(div)

    divHeight = getOuterHeight(div)

    props.containerRef.current?.removeChild(div)

    return divHeight
  }

  useEffect(() => {
    setHistogramHeight(props.containerRef.current?.clientHeight)
    setLineHeight(getLineHeight())
  }, [])

  useEffect(() => {
    if (histogramHeight && lineHeight) {
      const minValue = 0

      console.log(props.maxValue, minValue)

      const oneLinePercentage = lineHeight / histogramHeight
      const possibleDivsNumber = Math.floor(histogramHeight / lineHeight)

      setAxisValues([])
      for (let i = 0; i < possibleDivsNumber; i++) {
        setAxisValues((prevState) => [Math.round(oneLinePercentage * i * props.maxValue * 10) / 10, ...prevState])
      }
    }
  }, [lineHeight, histogramHeight, props.maxValue])

  return {
    axisValues
  }
}
