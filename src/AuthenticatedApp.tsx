import { TimerPage } from 'pages/TimerPage'
import { Route, Routes } from 'react-router-dom'

function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<TimerPage />} />
    </Routes>
  )
}

export default AuthenticatedApp
