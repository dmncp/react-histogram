import { MutableRefObject, useEffect, useMemo, useState } from 'react'
import { ChartData } from '../types/HistogramTypes'

type BarDetails = {
  barRef: MutableRefObject<HTMLDivElement | null>
  data: ChartData
  representedValueIndex: number
  maxValue: number
}

type ReturnData = {
  width: number
  height: number
  position: number
}

export const useBarCalculator = (props: BarDetails): ReturnData => {
  const [barContainerHeight, setBarContainerHeight] = useState<number>(0)
  const [axisWidth, setAxisWidth] = useState(0)
  const [axisPositionX, setAxisPositionX] = useState(0)

  useEffect(() => {
    if (props.barRef.current) {
      setBarContainerHeight(props.barRef.current.clientHeight)
    }
  }, [])

  useEffect(() => {
    const axisItem = document.getElementsByClassName('x-axis-item')[props.representedValueIndex]

    setAxisWidth(axisItem.clientWidth)
    setAxisPositionX(axisItem.getBoundingClientRect().x)
  }, [props.representedValueIndex, props.data.x])

  const getBarPosition = (): number => {
    const histogramContainer = document.getElementById('chart-container')
    const histogramPositionX = histogramContainer?.getBoundingClientRect().x

    return histogramPositionX ? axisPositionX - histogramPositionX : 0
  }

  const barPosition = useMemo(() => getBarPosition(), [axisPositionX])
  const barHeight = useMemo(
    () => (barContainerHeight / props.maxValue) * props.data.y,
    [barContainerHeight, props.maxValue, props.data.y]
  )

  return {
    width: axisWidth ?? 0,
    height: barHeight,
    position: barPosition
  }
}
