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
    data: props.data,
    representedValueIndex: props.dataIndex,
    maxValue: props.maxValue
  })

  return (
    <BarContainer ref={barContainerRef} style={{ width, left: position }}>
      <TooltipWrapper
        style={{ top: `calc(100% - ${height}px)` }}
        data-tooltip-id='histogram-tooltip'
        data-tooltip-content={props.tooltipContent}
        data-tooltip-delay-show={200}
        data-tooltip-delay-hide={200}
      >
        <BarDiv style={{ height }} />
      </TooltipWrapper>
    </BarContainer>
  )
}

export default Bar
