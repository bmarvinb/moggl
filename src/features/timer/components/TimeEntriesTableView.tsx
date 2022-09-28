import { Button, Checkbox } from 'components'
import { Box } from 'components/Box'
import { isToday } from 'date-fns'
import {
  formatDate,
  formatDuration,
} from 'features/timer/utils/time-entries-utils'
import { FC, ReactNode } from 'react'
import { BiListUl } from 'react-icons/bi'
import { styled } from 'theme/config'

export type TimeEntriesTableViewProps = {
  children: ReactNode
  bulkEditMode: boolean
  allSelected: boolean
  totalTime: number
  reportedTime: number
  date: Date
  onBulkModeChanged: () => void
  onToggleClicked: () => void
}

const TimeEntriesTable = styled('div', {
  marginBottom: '1rem',
  background: '$neutral0',
  borderRadius: '$md',
  boxShadow: '$sm',
  '&:last-child': {
    marginBottom: 0,
  },
})

const Label = styled('div', {
  fontSize: '$lg',
  lineHeight: '$lg',
  display: 'flex',
  alignItems: 'center',
  fontWeight: 500,
})

export const TimeEntriesTableView: FC<TimeEntriesTableViewProps> = props => {
  return (
    <TimeEntriesTable>
      <Box
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0.75rem 1rem',
        }}
      >
        <Box
          css={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {props.bulkEditMode && (
            <Box
              css={{
                marginRight: '1rem',
              }}
            >
              <Checkbox
                onChange={props.onBulkModeChanged}
                checked={props.allSelected}
              />
            </Box>
          )}
          <Label>
            <Box
              css={{
                marginRight: '0.25rem',
              }}
            >
              {formatDate(props.date)}
            </Box>
            <Box
              css={{
                fontWeight: 400,
                color: '$neutral8',
                minWidth: '4rem',
              }}
            >
              {isToday(props.date)
                ? formatDuration(props.totalTime)
                : formatDuration(props.reportedTime)}
            </Box>
          </Label>
        </Box>
        <Label>
          <Button
            use="icon"
            color="primary"
            size={'lg'}
            aria-label="Toggle edit mode"
            onClick={props.onToggleClicked}
          >
            <BiListUl title="Toggle" />
          </Button>
        </Label>
      </Box>
      {props.children}
    </TimeEntriesTable>
  )
}
