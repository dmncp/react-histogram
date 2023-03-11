import './App.css'
import { generateData } from './helpers/dataGenerator'
import { Histogram, Slider } from './lib'

const DAY = 86_400_000 // ms
const START_DATE = Date.now()
const END_DATE = Date.now() + 20 * DAY

function App() {
  const data = generateData(START_DATE, END_DATE, 40)

  return (
    <div className='App' style={{ width: '95vw', height: 500, backgroundColor: 'darkorchid' }}>
      <Histogram data={data} type='bar' width={'80%'} height={'80%'} disableSlider dateFormat='DAYS' />
    </div>
  )
}

export default App
