import { useCallback, useMemo } from 'react'
import { getDateValue } from '../../../helpers/dataGenerator'
import { AxisVariant, ChartData, ChartType, DateFormat } from '../../types/HistogramTypes'
import AxisX from '../axis/AxisX'
import AxisY from '../axis/AxisY'
import Slider from '../slider/Slider'
import { HistogramContainer } from './HistogramStyle'

export type HistogramProps = {
  data: ChartData[]
  type: ChartType
  width: number | string
  height: number | string
  dateFormat: DateFormat
  disableSlider?: boolean
}

const Histogram = (props: HistogramProps): JSX.Element => {
  // if disableSlider === true: fit all dataset on the graph

  const getLabels = useCallback(
    (variant: AxisVariant) => {
      if (variant === 'x') {
        return props.data.map((dataPair) => getDateValue(dataPair.x, props.dateFormat))
      }

      return props.data.map((dataPair) => dataPair.y)
    },
    [props.data, props.dateFormat]
  )

  return (
    <>
      <HistogramContainer style={{ width: props.width, height: props.height }}>
        <AxisX labels={getLabels('x')} />
        <AxisY labels={getLabels('y')} />
      </HistogramContainer>
      {!props.disableSlider ? <Slider /> : null}
    </>
  )
}

export default Histogram
