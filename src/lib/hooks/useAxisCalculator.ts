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
      const maxValue = props.dataValues[0]
      const minValue = props.dataValues[props.dataValues.length - 1]

      console.log(maxValue, minValue)

      const possibleDivsNumber = Math.floor(histogramHeight / lineHeight)
      const valuesStep = Math.floor(maxValue / possibleDivsNumber)

      setAxisValues([])
      for (let i = 1; i <= possibleDivsNumber; i++) {
        setAxisValues((prevState) => [minValue + valuesStep * i, ...prevState])
      }
    }
  }, [lineHeight, histogramHeight, props.dataValues])

  return {
    axisValues
  }
}
