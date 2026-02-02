import './App.css'
import { Widget } from './modules/calendar/presentation/Widget'

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-8">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Standalone Calendar Dev</h1>
        <Widget />
      </div>
    </div>
  )
}

export default App
