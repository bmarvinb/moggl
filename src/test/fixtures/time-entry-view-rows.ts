import {
  ParentTimeEntry,
  TimeEntryRowType,
} from 'features/timer/components/TimeEntryViewRow';
import { seconds } from 'test/utils/test-utils';
import * as O from 'fp-ts/lib/Option';

const tesla: ParentTimeEntry = {
  type: TimeEntryRowType.Parent,
  data: {
    id: '1',
    description: '',
    billable: true,
    project: {
      name: 'Tesla',
      color: 'red',
      clientName: O.some('Elon Musk'),
    },
    task: O.none,
    start: new Date('2022-09-17T12:00:00.000Z'),
    end: new Date('2022-09-17T12:31:30.000Z'),
    duration: seconds({ minutes: 2, seconds: 45 }),
  },
  children: [
    {
      type: TimeEntryRowType.Child,
      data: {
        id: '1',
        description: '',
        billable: true,
        project: {
          name: 'Tesla',
          color: 'red',
          clientName: O.some('Elon Musk'),
        },
        task: O.none,
        start: new Date('2022-09-17T12:00:00.000Z'),
        end: new Date('2022-09-17T12:01:30.000Z'),
        duration: seconds({ minutes: 1, seconds: 30 }),
      },
    },
    {
      type: TimeEntryRowType.Child,
      data: {
        id: '2',
        description: '',
        billable: true,
        project: {
          name: 'Tesla',
          color: 'blue',
          clientName: O.some('Elon Musk'),
        },
        task: O.none,
        start: new Date('2022-09-17T12:30:15.000Z'),
        end: new Date('2022-09-17T12:31:30.000Z'),
        duration: seconds({ minutes: 1, seconds: 15 }),
      },
    },
  ],
};

const facebook: ParentTimeEntry = {
  type: TimeEntryRowType.Parent,
  data: {
    id: '1',
    description: 'News feed',
    billable: true,
    project: {
      name: 'Facebook',
      color: 'blue',
      clientName: O.some('Mark'),
    },
    task: O.some('UI refactoring'),
    start: new Date('2022-10-20T19:00:00.000Z'),
    end: new Date('2022-10-20T23:30:00.000Z'),
    duration: seconds({ hours: 4, minutes: 30 }),
  },
  children: [
    {
      type: TimeEntryRowType.Child,
      data: {
        id: '1',
        description: 'News feed',
        billable: true,
        project: {
          name: 'Facebook',
          color: 'blue',
          clientName: O.some('Mark'),
        },
        task: O.some('UI refactoring'),
        start: new Date('2022-10-20T19:00:00.000Z'),
        end: new Date('2022-10-17T23:30:00.000Z'),
        duration: seconds({ hours: 4, minutes: 30 }),
      },
    },
  ],
};

export const timeEntryViewRows = {
  tesla,
  facebook,
};
