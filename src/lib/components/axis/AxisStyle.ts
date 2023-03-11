import styled from 'styled-components'

export const LabelsXContainer = styled.div`
  width: 80%;
  height: 20px;
  /* background-color: red; */
  position: absolute;
  top: 101%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  display: flex;
  justify-content: space-between;
`

export const LineX = styled.div`
  width: 100%;
  height: 3px;
  background-color: black;
  position: absolute;
  top: 100%;
`

export const LabelsYContainer = styled.div`
  width: 90%;
  height: 100%;
  /* background-color: green; */
  position: relative;
  left: 50%;
  transform: translateX(-50%);

  & > div {
    border-bottom: 1px solid black;
    padding-top: 10px;
  }
`
