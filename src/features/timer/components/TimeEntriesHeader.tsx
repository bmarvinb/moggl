import { FC } from 'react'

export type TimeEntriesHeaderProps = {
  weekTotal: string
}

export const TimeEntriesHeader: FC<TimeEntriesHeaderProps> = props => {
  return <div>Total: {props.weekTotal}</div>
}
