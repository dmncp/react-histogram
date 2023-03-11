import { useRef } from 'react'
import { useBarCalculator } from '../../hooks/useBarCalculator'
import { ChartData } from '../../types/HistogramTypes'
import { BarContainer, BarDiv } from './BarStyle'

type BarProps = {
  data: ChartData
  dataIndex: number
  maxValue: number
}

const Bar = (props: BarProps): JSX.Element => {
  const barContainerRef = useRef<HTMLDivElement | null>(null)

  const { width, height, position } = useBarCalculator({
    barRef: barContainerRef,
    representedValue: props.data.y,
    representedValueIndex: props.dataIndex,
    maxValue: props.maxValue
  })

  return (
    <BarContainer ref={barContainerRef} width={width} position={position}>
      <BarDiv height={height} />
    </BarContainer>
  )
}

export default Bar
