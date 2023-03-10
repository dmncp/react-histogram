import './App.css'
import { generateData } from './helpers/dataGenerator'
import { Histogram, Slider } from './lib'

function App() {
  const data = generateData()

  return (
    <div className='App'>
      <Histogram data={data} type='bar' />
      <Slider />
    </div>
  )
}

export default App
