import { ChartData, ChartType } from '../../types/HistogramTypes'

export type HistogramProps = {
  data: ChartData[]
  type: ChartType
  disableSlider?: boolean
}

const Histogram = (props: HistogramProps): JSX.Element => {
  return <div>Hello Histogram</div>
}

export default Histogram
