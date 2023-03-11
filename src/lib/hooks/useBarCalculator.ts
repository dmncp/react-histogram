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
  const [barWidth, setBarWidth] = useState<number>(0) // px
  const [barHeight, setBarHeight] = useState<number>(0) // px
  const [barPosition, setBarPosition] = useState<number>(0) // px
  const [barContainerHeight, setBarContainerHeight] = useState<number | undefined>(undefined)

  const getBarPosition = (axisItem: Element): number => {
    const histogramContainer = document.getElementById('chart-container')
    const histogramPositionX = histogramContainer?.getBoundingClientRect().x
    const axisPositionX = axisItem.getBoundingClientRect().x

    return histogramPositionX ? axisPositionX - histogramPositionX : 0
  }

  useEffect(() => {
    const axisItem = document.getElementsByClassName('x-axis-item')[props.representedValueIndex]

    setBarContainerHeight(props.barRef.current?.clientHeight)
    setBarWidth(axisItem?.clientWidth ?? 0)
    setBarPosition(getBarPosition(axisItem))
  }, [props.representedValueIndex, props.data])

  useEffect(() => {
    if (barContainerHeight) {
      const oneUnitPixels = barContainerHeight / props.maxValue
      setBarHeight(oneUnitPixels * props.data.y)
    }
  }, [props.data, barContainerHeight, props.maxValue])

  return {
    width: barWidth,
    height: barHeight,
    position: barPosition
  }
}
