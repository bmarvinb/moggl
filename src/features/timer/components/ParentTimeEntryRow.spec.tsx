import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ParentTimeEntryRow } from 'features/timer/components/ParentTimeEntryRow'
import { timeEntryViewRows } from 'features/timer/fixtures/time-entry-view-rows'
import { noop } from 'utils/test-utils'

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
      onPlayClicked={noop}
      onParentSelectionChange={noop}
      onChildSelectionChange={noop}
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
      onPlayClicked={noop}
      onParentSelectionChange={noop}
      onChildSelectionChange={noop}
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
      onPlayClicked={noop}
      onParentSelectionChange={noop}
      onChildSelectionChange={noop}
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

test('parent should be checked if all children are checked', async () => {
  render(
    <ParentTimeEntryRow
      timeEntry={timeEntryViewRows.tesla}
      edit={true}
      selectedIds={['1', '2']}
      onPlayClicked={noop}
      onParentSelectionChange={noop}
      onChildSelectionChange={noop}
    />,
  )
  const parent = screen.getByTestId(selectors.parent('1'))
  const checkbox = await within(parent).findByRole('checkbox')
  const toggleChildrenButton = screen.getByTestId(
    selectors.toggleChildrenButton,
  )

  userEvent.click(toggleChildrenButton)

  expect(checkbox).toBeChecked()
})

test('parent should be unchecked if some child is not checked', async () => {
  render(
    <ParentTimeEntryRow
      timeEntry={timeEntryViewRows.tesla}
      edit={true}
      selectedIds={['1']}
      onPlayClicked={noop}
      onParentSelectionChange={noop}
      onChildSelectionChange={noop}
    />,
  )
  const parent = screen.getByTestId(selectors.parent('1'))
  const checkbox = await within(parent).findByRole('checkbox')
  const toggleChildrenButton = screen.getByTestId(
    selectors.toggleChildrenButton,
  )

  userEvent.click(toggleChildrenButton)

  expect(checkbox).not.toBeChecked()
})
