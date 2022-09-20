import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ParentTimeEntryRow } from 'features/timer/components/ParentTimeEntryRow'
import { timeEntryViewRowData } from 'features/timer/fixtures/time-entry-view-row-data'
import { noop } from 'test/test-utils'

const selectors = {
  toggleChildrenButton: 'TOGGLE_CHILDREN_VISIBILITY_BUTTON',
  description: 'TIME_ENTRY_DESCRIPTION',
  duration: 'TIME_ENTRY_DURATION',
}

test('should render tesla project', async () => {
  render(
    <ParentTimeEntryRow
      timeEntry={timeEntryViewRowData.tesla}
      edit={false}
      checkedIds={[]}
      onPlayClicked={noop}
      onParentCheckedChange={noop}
    />,
  )
  const toggleChildrenButton = screen.getByTestId(
    selectors.toggleChildrenButton,
  )
  const parent = within(screen.getByTestId(timeEntryViewRowData.tesla.data.id))
  const description = parent.getByTestId(selectors.description)
  const duration = parent.getByTestId(selectors.duration)

  expect(toggleChildrenButton.textContent).toBe('2')
  expect(description.textContent).toBe('Add description')
  expect(duration.textContent).toBe('0:02:45')
})

test('should render facebook project', async () => {
  render(
    <ParentTimeEntryRow
      timeEntry={timeEntryViewRowData.facebook}
      edit={false}
      checkedIds={[]}
      onPlayClicked={noop}
      onParentCheckedChange={noop}
    />,
  )
  const toggleChildrenButton = screen.getByTestId(
    selectors.toggleChildrenButton,
  )
  const parent = within(screen.getByTestId(timeEntryViewRowData.tesla.data.id))
  const description = parent.getByTestId(selectors.description)
  const duration = parent.getByTestId(selectors.duration)

  expect(toggleChildrenButton.textContent).toBe('1')
  expect(description.textContent).toBe('News feed')
  expect(duration.textContent).toBe('4:30:00')
})

test('should toggle children visibility', async () => {
  render(
    <ParentTimeEntryRow
      timeEntry={timeEntryViewRowData.tesla}
      edit={false}
      checkedIds={[]}
      onPlayClicked={noop}
      onParentCheckedChange={noop}
    />,
  )

  const children = screen.getByTestId(
    `${timeEntryViewRowData.tesla.data.id}-children`,
  )
  const toggleChildrenButton = screen.getByTestId(
    selectors.toggleChildrenButton,
  )

  expect(children.hidden).toBe(true)
  userEvent.click(toggleChildrenButton)
  expect(children.hidden).toBe(false)
  userEvent.click(toggleChildrenButton)
  expect(children.hidden).toBe(true)
})

// should show/hide checkboxes

// should toggle checking children correctly

// should change checked children
