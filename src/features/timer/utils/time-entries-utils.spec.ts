import { sub } from 'date-fns'
import {
  formatDate,
  formatDurationToInlineTime,
} from 'features/timer/utils/time-entries-utils'
import { seconds } from 'test/test-utils'

test('formatDurationToInlineTime', () => {
  expect(
    formatDurationToInlineTime(seconds({ hours: 1, minutes: 45, seconds: 30 })),
  ).toBe('1:45:30')

  expect(
    formatDurationToInlineTime(seconds({ minutes: 45, seconds: 30 })),
  ).toBe('0:45:30')

  expect(formatDurationToInlineTime(seconds({ minutes: 1, seconds: 5 }))).toBe(
    '0:01:05',
  )

  expect(formatDurationToInlineTime(seconds({ seconds: 5 }))).toBe('0:00:05')

  expect(formatDurationToInlineTime(0)).toBe('0:00:00')
})

test('formatDate', () => {
  const today = new Date()
  const yesterday = sub(today, { days: 1 })

  expect(formatDate(today, 2022)).toEqual('Today')
  expect(formatDate(yesterday, 2022)).toEqual('Yesterday')
  expect(formatDate(new Date('2022-08-01'), 2022)).toEqual('Mon, 1 Aug')
  expect(formatDate(new Date('2021-12-31'), 2022)).toEqual('Fri, 31 Dec, 2021')
})
