import {
  ParentTimeEntry,
  TimeEntryRowType,
} from 'features/timer/components/TimeEntryViewRow'
import { seconds } from 'test/test-utils'

export const parentTimeEntry: ParentTimeEntry = {
  type: TimeEntryRowType.Parent,
  data: {
    id: '1',
    description: '',
    billable: true,
    project: {
      name: 'Tesla',
      color: '#F44336',
      clientName: 'Elon Musk',
    },
    task: undefined,
    start: new Date('2022-09-17T12:00:00.000Z'),
    end: new Date('2022-09-17T12:31:30.000Z'),
    duration: seconds({ minutes: 2, seconds: 45 }),
  },
  children: [
    {
      type: TimeEntryRowType.Child,
      data: {
        id: '2',
        description: '',
        billable: true,
        project: {
          name: 'Tesla',
          color: '#F44336',
          clientName: 'Elon Musk',
        },
        task: undefined,
        start: new Date('2022-09-17T12:00:00.000Z'),
        end: new Date('2022-09-17T12:01:30.000Z'),
        duration: seconds({ minutes: 1, seconds: 30 }),
      },
    },
    {
      type: TimeEntryRowType.Child,
      data: {
        id: '3',
        description: '',
        billable: true,
        project: {
          name: 'Tesla',
          color: '#F44336',
          clientName: 'Elon Musk',
        },
        task: undefined,
        start: new Date('2022-09-17T12:30:15.000Z'),
        end: new Date('2022-09-17T12:31:30.000Z'),
        duration: seconds({ minutes: 1, seconds: 15 }),
      },
    },
  ],
}
