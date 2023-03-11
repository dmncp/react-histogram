import styled from 'styled-components'

type SliderInputProps = {
  width: number
}

export const SliderInput = styled.input<SliderInputProps>`
  -webkit-appearance: none;
  width: 90%;
  height: 10px;
  background-color: lightgray;
  border-radius: 50px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 10px;
    width: ${(props) => props.width + 'px'};
    background-color: green;
    cursor: pointer;
    border-radius: 50px;
  }

  &::-moz-range-thumb {
    height: 10px;
    width: ${(props) => props.width + 'px'};
    background-color: green;
    cursor: pointer;
    border-radius: 50px;
  }
`
