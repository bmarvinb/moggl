import { Box } from 'components/Box'
import { formatDuration } from 'features/timer/utils/time-entries-utils'
import { FC } from 'react'
import { styled } from 'theme/config'

export type WeekDurationProps = {
  weekDuration: number
}

const Title = styled('div', {
  fontWeight: 700,
  fontSize: '$xl',
  lineHeight: '$xl',
})

const TotalTime = styled('div', {
  display: 'inline-flex',
  fontWeight: '400',
  fontSize: '$lg',
  lineHeight: '$lg',
  color: '$neutral8',
  marginLeft: '0.5rem',
  minWidth: '5rem',
})

export const WeekDuration: FC<WeekDurationProps> = props => {
  return (
    <>
      <Box
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '1rem 0',
        }}
      >
        <Title>
          This week
          <TotalTime>{formatDuration(props.weekDuration)}</TotalTime>
        </Title>
      </Box>
    </>
  )
}
