import { useCallback, useEffect, useMemo, useState } from 'react'
import { Tooltip } from 'react-tooltip'
import { getDateValue } from '../../../helpers/dataGenerator'
import { AxisVariant, ChartData, ChartType, DateFormat } from '../../types/HistogramTypes'
import AxisX from '../axis/AxisX'
import AxisY from '../axis/AxisY'
import Bar from '../bar/Bar'
import Slider from '../slider/Slider'
import { ChartContainer, HistogramContainer } from './HistogramStyle'
import 'react-tooltip/dist/react-tooltip.css'

export type HistogramProps = {
  data: ChartData[]
  type: ChartType
  width: number | string
  height: number | string
  dateFormat: DateFormat
  disableSlider?: boolean
}

export const MAX_BARS_NUMBER = 30

const Histogram = (props: HistogramProps): JSX.Element => {
  // if disableSlider === true: fit all dataset on the graph
  const [data, setData] = useState<ChartData[]>([])
  const [sliceFrom, setSliceFrom] = useState<number>(0)
  const [sliceTo, setSliceTo] = useState<number>(MAX_BARS_NUMBER)

  const getLabels = useCallback(
    (variant: AxisVariant) => {
      if (variant === 'x') {
        return data.map((dataPair) => getDateValue(dataPair.x, props.dateFormat))
      }

      return data.map((dataPair) => dataPair.y)
    },
    [data, props.dateFormat]
  )

  const sortedUniqueValues = useMemo(() => {
    const sorted = getLabels('y').sort((a, b) => b - a)
    return [...new Set(sorted)]
  }, [data])

  useEffect(() => {
    if (props.data.length > MAX_BARS_NUMBER) {
      setData(props.data.slice(sliceFrom, sliceTo))
    } else {
      setData(props.data)
    }
  }, [props.data, sliceFrom, sliceTo])

  return (
    <HistogramContainer style={{ width: props.width, height: props.height }}>
      <ChartContainer id='chart-container'>
        <AxisX labels={getLabels('x')} />
        <AxisY labels={sortedUniqueValues} />

        {data.map((dataPair, index: number) => (
          <Bar
            key={'bar-' + index}
            data={dataPair}
            dataIndex={index}
            maxValue={sortedUniqueValues[0]}
            tooltipContent={dataPair.y.toString()}
          />
        ))}
      </ChartContainer>
      {!props.disableSlider && props.data.length > MAX_BARS_NUMBER ? (
        <Slider barsNumber={props.data.length} setSliceFrom={setSliceFrom} setSliceTo={setSliceTo} />
      ) : null}
      <Tooltip id='histogram-tooltip' />
    </HistogramContainer>
  )
}

export default Histogram
