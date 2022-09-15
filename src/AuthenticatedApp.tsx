import { TimerPage } from 'pages/TimerPage'
import { Navigate, Route, Routes } from 'react-router-dom'

function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<TimerPage />} />
      <Route path="/login" element={<Navigate replace to="/" />} />
    </Routes>
  )
}

export default AuthenticatedApp
