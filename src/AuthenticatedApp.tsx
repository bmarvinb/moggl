import { UserInfo } from 'auth/context/auth-context'
import { TimerPage } from 'pages/TimerPage'
import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

export type AuthenticatedAppProps = {
  userInfo: UserInfo
}

export const AuthenticatedApp: FC<AuthenticatedAppProps> = props => {
  return (
    <Routes>
      <Route path="/" element={<TimerPage userInfo={props.userInfo} />} />
      <Route path="/login" element={<Navigate replace to="/" />} />
    </Routes>
  )
}

export default AuthenticatedApp
