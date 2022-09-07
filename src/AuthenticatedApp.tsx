import { TimeTrackerPage } from 'pages/TimeTrackerPage'
import { Route, Routes } from 'react-router-dom'

function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<TimeTrackerPage />} />
    </Routes>
  )
}

export default AuthenticatedApp
