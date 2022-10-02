import { UserInfo } from 'features/auth/index'
import { TimeEntries } from 'features/timer'
import { FC } from 'react'

export type TimerPageProps = {
  userInfo: UserInfo
}

export const TimerPage: FC<TimerPageProps> = props => (
  <TimeEntries
  />
)
