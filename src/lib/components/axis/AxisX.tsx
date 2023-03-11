import { AxisProps, AxisVariant } from '../../types/HistogramTypes'
import { LabelsXContainer, LineX } from './AxisStyle'

const AxisX = (props: AxisProps): JSX.Element => {
  // TODO: add style customization from props
  return (
    <>
      <LineX />
      <LabelsXContainer>
        {props.labels.map((label, index: number) => (
          <div key={`x-label-${index}`}>{label}</div>
        ))}
      </LabelsXContainer>
    </>
  )
}

export default AxisX
