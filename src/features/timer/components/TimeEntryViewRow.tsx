import { Button, Checkbox } from 'components'
import { Box } from 'components/Box'
import { TimeEntryViewModel } from 'features/timer/components/ReportedDays'
import {
  formatDuration,
  formatTimeEntryDate,
  getTimeEntryInfo,
  isChildTimeEntry,
  isParentTimeEntry,
} from 'features/timer/utils/time-entries-utils'
import { FC } from 'react'
import {
  BiDollar,
  BiDotsVerticalRounded,
  BiPlay,
  BiPurchaseTag,
} from 'react-icons/bi'
import { styled } from 'theme/config'

export const enum TimeEntryRowType {
  Regular = 'Regular',
  Parent = 'Parent',
  Child = 'Child',
}

export type ParentTimeEntry = {
  data: TimeEntryViewModel
  type: TimeEntryRowType.Parent
  children: ChildTimeEntry[]
}

export type RegularTimeEntry = {
  data: TimeEntryViewModel
  type: TimeEntryRowType.Regular
}

export type ChildTimeEntry = {
  data: TimeEntryViewModel
  type: TimeEntryRowType.Child
}

export type TimeEntryRowViewModel =
  | RegularTimeEntry
  | ParentTimeEntry
  | ChildTimeEntry

export type TimeEntryViewRowProps = {
  timeEntry: TimeEntryRowViewModel
  edit: boolean
  selected: boolean
  onSelectionChange: (timeEntryId: string) => void
  onPlayClicked: (timeEntry: TimeEntryRowViewModel) => void
  onToggleChildrenVisibility?: () => void
}

const TimeEntryItem = styled('div', {
  display: 'flex',
  padding: '0.75rem 1rem',
  justifyContent: 'space-between',
  borderBottom: '1px solid $neutral1',
})

const Description = styled('div', {
  lineHeight: '$lg',
  color: '$neutral9',
})

const AdditionalInfo = styled('div', {
  position: 'relative',
  paddingLeft: '0.75rem',
  fontSize: '$sm',
  '&:before': {
    position: 'absolute',
    content: '',
    width: '0.3rem',
    height: '0.3rem',
    borderRadius: '100%',
    top: 'calc(50% - 0.15rem)',
    left: '-0rem',
  },
})

const RoundedButton = styled(Button, {
  borderRadius: '100%',
  background: 'transparent',
  padding: '0.25rem',
  minWidth: '2rem',
  height: '2rem',
  color: '$neutral6',
  border: '1px solid $neutral6',
  margin: 'auto',
  marginRight: '1rem',
  boxShadow: 'none',
  '&:hover': {
    background: 'transparent',
    borderColor: '$primary3',
    color: '$primary4',
  },
  '&:active': {
    background: 'transparent',
    borderColor: '$primary4',
    color: '$primary5',
  },
})

export const TimeEntryViewRow: FC<TimeEntryViewRowProps> = props => {
  return (
    <>
      <TimeEntryItem
        key={props.timeEntry.data.id}
        data-testid="TIME_ENTRY_VIEW_ROW"
      >
        <Box
          css={{
            display: 'flex',
            flexDirection: 'row',
            paddingRight: '0.5rem',
          }}
        >
          {props.edit && (
            <Box
              css={{
                marginRight: '1rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Checkbox
                checked={props.selected}
                onChange={() =>
                  props.onSelectionChange(props.timeEntry.data.id)
                }
              />
            </Box>
          )}
          {isParentTimeEntry(props.timeEntry) && (
            <RoundedButton
              onClick={() =>
                props.onToggleChildrenVisibility &&
                props.onToggleChildrenVisibility()
              }
              aria-label="Toggle children visibility"
              data-testid="TOGGLE_CHILDREN_VISIBILITY_BUTTON"
            >
              {props.timeEntry.children.length}
            </RoundedButton>
          )}
          <Box
            css={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              paddingLeft: isChildTimeEntry(props.timeEntry) ? '3rem' : '0',
            }}
          >
            <Description data-testid="TIME_ENTRY_DESCRIPTION">
              {props.timeEntry.data.description || 'Add description'}
            </Description>
            <AdditionalInfo
              css={{
                color: props.timeEntry.data.project.color,
                '&:before': {
                  background: props.timeEntry.data.project.color,
                },
              }}
              data-testid="TIME_ENTRY_ADDITIONAL_INFO"
            >
              {getTimeEntryInfo(
                props.timeEntry.data.project.name,
                props.timeEntry.data.project.clientName,
                props.timeEntry.data.task,
              )}
            </AdditionalInfo>
          </Box>
        </Box>
        <div>
          <Box
            css={{
              display: 'grid',
              gridTemplateColumns: '2rem 2rem 1fr',
              gridColumnGap: '0.5rem',
              alignItems: 'center',
              marginBottom: '0.5rem',
            }}
          >
            <Button use="icon" color="primary" aria-label="Select tags">
              <BiPurchaseTag title="Select tags" />
            </Button>
            <Button
              use="icon"
              color="primary"
              aria-label="Change billable status"
            >
              <BiDollar title="Change billable status" />
            </Button>
            <Box
              css={{
                display: 'none',
              }}
            >
              {formatTimeEntryDate(props.timeEntry.data)}
            </Box>
            <Box
              css={{
                fontWeight: 500,
                fontSize: '$lg',
                lineHeight: '$lg',
              }}
              data-testid="TIME_ENTRY_DURATION"
            >
              {formatDuration(props.timeEntry.data.duration)}
            </Box>
          </Box>

          <Box
            css={{
              display: 'flex',
              justifyContent: 'right',
              position: 'relative',
              gap: '$2',
            }}
          >
            <Button
              use="icon"
              color="primary"
              onClick={() => props.onPlayClicked(props.timeEntry)}
              aria-label="Start timer"
            >
              <BiPlay title="Play" />
            </Button>
            <Button use="icon" color="primary" aria-label="Open actions">
              <BiDotsVerticalRounded title="Actions" />
            </Button>
          </Box>
        </div>
      </TimeEntryItem>
    </>
  )
}
