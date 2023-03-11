import styled from 'styled-components'

type BarContainerProps = {
  width: number
  position: number
}

type BarDivProps = {
  height: number
}

export const BarContainer = styled.div<BarContainerProps>`
  /* background-color: blue; */
  height: 100%;
  width: ${(props) => props.width + 'px'};
  position: absolute;
  top: 0;
  left: ${(props) => props.position + 'px'};
`

export const BarDiv = styled.div<BarDivProps>`
  background-color: darkgreen;
  width: 100%;
  position: relative;
  height: ${(props) => props.height + 'px'};
`

export const TooltipWrapper = styled.a<BarDivProps>`
  position: relative;
  top: ${(props) => `calc(100% - ${props.height}px)`};
`
