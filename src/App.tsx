import './App.css'
import { generateData } from './helpers/dataGenerator'
import { Histogram, Slider } from './lib'

const DAY = 86_400_000 // ms
const START_DATE = Date.now()
const END_DATE = Date.now() + 20 * DAY

function App() {
  const data = generateData(START_DATE, END_DATE, 100)

  return (
    <div className='App' style={{ width: '95vw', height: 700, backgroundColor: 'darkorchid' }}>
      <Histogram data={data} type='bar' width={'80%'} height={'50%'} dateFormat='DAYS' />
    </div>
  )
}

export default App
