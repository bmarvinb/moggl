import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ParentTimeEntryRow } from 'features/timer/components/ParentTimeEntryRow'
import { constVoid } from 'fp-ts/lib/function'
import { timeEntryViewRows } from 'test/fixtures/time-entry-view-rows'

const selectors = {
  parent: (id: string) => `${id}-parent`,
  parentChildren: (id: string) => `${id}-children`,
  toggleChildrenButton: 'TOGGLE_CHILDREN_VISIBILITY_BUTTON',
  description: 'TIME_ENTRY_DESCRIPTION',
  duration: 'TIME_ENTRY_DURATION',
}

test('should render Tesla', async () => {
  render(
    <ParentTimeEntryRow
      timeEntry={timeEntryViewRows.tesla}
      edit={false}
      selectedIds={[]}
      onPlayClicked={constVoid}
      onParentSelectionChange={constVoid}
      onChildSelectionChange={constVoid}
    />,
  )
  const toggleChildrenButton = screen.getByTestId(
    selectors.toggleChildrenButton,
  )
  const parent = within(screen.getByTestId(selectors.parent('1')))
  const description = parent.getByTestId(selectors.description)
  const duration = parent.getByTestId(selectors.duration)

  expect(toggleChildrenButton.textContent).toBe('2')
  expect(description.textContent).toBe('Add description')
  expect(duration.textContent).toBe('0:02:45')
})

test('should render Facebook', async () => {
  render(
    <ParentTimeEntryRow
      timeEntry={timeEntryViewRows.facebook}
      edit={false}
      selectedIds={[]}
      onPlayClicked={constVoid}
      onParentSelectionChange={constVoid}
      onChildSelectionChange={constVoid}
    />,
  )
  const toggleChildrenButton = screen.getByTestId(
    selectors.toggleChildrenButton,
  )
  const parent = within(screen.getByTestId(selectors.parent('1')))
  const description = parent.getByTestId(selectors.description)
  const duration = parent.getByTestId(selectors.duration)

  expect(toggleChildrenButton.textContent).toBe('1')
  expect(description.textContent).toBe('News feed')
  expect(duration.textContent).toBe('4:30:00')
})

test('should toggle children visibility', async () => {
  render(
    <ParentTimeEntryRow
      timeEntry={timeEntryViewRows.tesla}
      edit={false}
      selectedIds={[]}
      onPlayClicked={constVoid}
      onParentSelectionChange={constVoid}
      onChildSelectionChange={constVoid}
    />,
  )
  const children = screen.getByTestId(selectors.parentChildren('1'))
  const toggleChildrenButton = screen.getByTestId(
    selectors.toggleChildrenButton,
  )

  expect(children.hidden).toBe(true)
  userEvent.click(toggleChildrenButton)
  expect(children.hidden).toBe(false)
  userEvent.click(toggleChildrenButton)
  expect(children.hidden).toBe(true)
})
