import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { MAX_BARS_NUMBER } from '../histogram/Histogram'
import { SliderInput } from './SliderStyle'

type SliderProps = {
  barsNumber: number
  setSliceFrom: Dispatch<SetStateAction<number>>
  setSliceTo: Dispatch<SetStateAction<number>>
}

const Slider = (props: SliderProps): JSX.Element => {
  const [sliderThumbWidth, setSliderThumbWidth] = useState(0)
  const [sliderInputWidth, setSliderInputWidth] = useState(0)

  const sliderRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (sliderRef.current) {
      const sliderInputWidth = sliderRef.current.clientWidth
      const sliderPercentage = MAX_BARS_NUMBER / props.barsNumber

      setSliderThumbWidth(sliderInputWidth * sliderPercentage)
      setSliderInputWidth(sliderInputWidth)
    }
  }, [])

  const onInputChange = (input: HTMLInputElement): void => {
    const sliceFrom = Math.min(Number(input.value), 99)
    const sliceTo = Math.min(Number(input.value) + MAX_BARS_NUMBER, props.barsNumber) + 1

    props.setSliceFrom(sliceFrom)
    props.setSliceTo(sliceTo)
  }

  return (
    <SliderInput
      ref={sliderRef}
      type='range'
      defaultValue={0}
      max={props.barsNumber}
      width={sliderThumbWidth}
      onChange={(e) => onInputChange(e.target)}
    />
  )
}

export default Slider
