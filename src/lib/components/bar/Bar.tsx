import { useRef } from 'react'
import { useBarCalculator } from '../../hooks/useBarCalculator'
import { ChartData } from '../../types/HistogramTypes'
import { BarContainer, BarDiv, TooltipWrapper } from './BarStyle'

type BarProps = {
  data: ChartData
  dataIndex: number
  maxValue: number
  tooltipContent?: string
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
      <TooltipWrapper
        height={height}
        data-tooltip-id='histogram-tooltip'
        data-tooltip-content={props.tooltipContent}
        data-tooltip-delay-show={200}
        data-tooltip-delay-hide={200}
      >
        <BarDiv height={height} />
      </TooltipWrapper>
    </BarContainer>
  )
}

export default Bar
