import { Route, Routes } from 'react-router-dom'
import { ErrorPage, Home } from './modules'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default App