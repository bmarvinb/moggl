import { Box } from 'common/components/Box'
import { Button } from 'common/components/Button'
import { Checkbox } from 'common/components/Checkbox'
import { styled } from 'core/theme/config'
import { isToday } from 'date-fns'
import {
  formatDate,
  formatDuration,
} from 'features/timer/utils/time-entries-utils'
import { FC, ReactNode } from 'react'
import { BiListUl } from 'react-icons/bi'

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
  background: '$neutral1',
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
  fontWeight: '$semibold',
})

export const TimeEntriesTableView: FC<TimeEntriesTableViewProps> = props => {
  return (
    <TimeEntriesTable>
      <Box
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '$6 $8',
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
                marginRight: '$4',
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
                marginRight: '$2',
                color: '$neutral10',
              }}
            >
              {formatDate(props.date)}
            </Box>
            <Box
              css={{
                fontWeight: 400,
                color: '$neutral9',
                minWidth: '4rem',
              }}
            >
              {isToday(props.date)
                ? formatDuration(props.totalTime)
                : formatDuration(props.reportedTime)}
            </Box>
          </Label>
        </Box>
        <Label
          css={{
            position: 'relative',
            right: '-0.25rem',
          }}
        >
          <Button
            variant="icon"
            color="transparent"
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
