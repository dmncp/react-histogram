import { useEffect, useMemo, useRef, useState } from 'react'
import { useAxisCalculator } from '../../hooks/useAxisCalculator'
import { AxisProps, AxisVariant } from '../../types/HistogramTypes'
import { LabelsYContainer } from './AxisStyle'

const AxisY = (props: AxisProps): JSX.Element => {
  // TODO: add style customization from props
  const containerRef = useRef<HTMLDivElement | null>(null)

  const { axisValues } = useAxisCalculator({
    containerRef,
    maxValue: props.labels[0]
  })

  return (
    <>
      <LabelsYContainer ref={containerRef}>
        {axisValues.map((label, index: number) => (
          <div key={`x-label-${index}`}>{label}</div>
        ))}
      </LabelsYContainer>
    </>
  )
}

export default AxisY
