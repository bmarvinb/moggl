import { render, screen } from '@testing-library/react'
import { parentTimeEntry } from 'features/test/fixtures/time-entry-row-data'
import { ParentTimeEntryRow } from 'features/timer/components/ParentTimeEntryRow'

test('should render', async () => {
  render(
    <ParentTimeEntryRow
      timeEntry={parentTimeEntry}
      edit={false}
      checkedIds={[]}
      onPlayClicked={() => {}}
      onParentCheckedChange={() => {}}
    />,
  )
  const toggleChildrenButton = screen.getByTestId(
    'TOGGLE_CHILDREN_VISIBILITY_BUTTON',
  )
  const description = screen.getByTestId('TIME_ENTRY_DESCRIPTION')
  const duration = screen.getByTestId('TIME_ENTRY_DURATION')

  expect(toggleChildrenButton.textContent).toBe('2')
  expect(description.textContent).toBe('Add description')
  expect(duration.textContent).toBe('0:02:45')
})
