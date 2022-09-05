import {Route, Routes} from 'react-router-dom'
import {HomePage} from './pages/HomePage'
import {LoginPage} from './pages/LoginPage'

function UnauthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
    </Routes>
  )
}

export default UnauthenticatedApp
