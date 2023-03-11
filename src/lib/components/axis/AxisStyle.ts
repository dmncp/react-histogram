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
  gap: 3px;

  & > div {
    text-align: center;
    width: 30px;
  }
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
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  & > div {
    border-bottom: 1px solid black;
    padding-top: 10px;
  }

  & > div:last-of-type {
    /* background-color: red; */
    visibility: hidden;
  }
`
