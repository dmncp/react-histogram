import { useCallback, useMemo } from 'react'
import { Tooltip } from 'react-tooltip'
import { getDateValue } from '../../../helpers/dataGenerator'
import { AxisVariant, ChartData, ChartType, DateFormat } from '../../types/HistogramTypes'
import AxisX from '../axis/AxisX'
import AxisY from '../axis/AxisY'
import Bar from '../bar/Bar'
import Slider from '../slider/Slider'
import { HistogramContainer } from './HistogramStyle'
import 'react-tooltip/dist/react-tooltip.css'

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

  const sortedUniqueValues = useMemo(() => {
    const sorted = getLabels('y').sort((a, b) => b - a)
    return [...new Set(sorted)]
  }, [props.data])

  return (
    <>
      <HistogramContainer id='histogram-container' style={{ width: props.width, height: props.height }}>
        <AxisX labels={getLabels('x')} />
        <AxisY labels={sortedUniqueValues} />

        {props.data.map((dataPair, index: number) => (
          <Bar
            key={'bar-' + index}
            data={dataPair}
            dataIndex={index}
            maxValue={sortedUniqueValues[0]}
            tooltipContent={dataPair.y.toString()}
          />
        ))}
      </HistogramContainer>
      {!props.disableSlider ? <Slider /> : null}
      <Tooltip id='histogram-tooltip' />
    </>
  )
}

export default Histogram
