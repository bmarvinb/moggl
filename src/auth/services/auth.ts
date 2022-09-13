import { client } from 'utils/api-client'
import { z } from 'zod'

const summaryReportSettingsSchema = z.object({
  group: z.string(),
  subgroup: z.string(),
})

const settingsSchema = z.object({
  weekStart: z.string(),
  timeZone: z.string(),
  timeFormat: z.string(),
  dateFormat: z.string(),
  sendNewsletter: z.boolean(),
  weeklyUpdates: z.boolean(),
  longRunning: z.boolean(),
  scheduledReports: z.boolean(),
  approval: z.boolean(),
  pto: z.boolean(),
  alerts: z.boolean(),
  reminders: z.boolean(),
  timeTrackingManual: z.boolean(),
  summaryReportSettings: summaryReportSettingsSchema,
  isCompactViewOn: z.boolean(),
  dashboardSelection: z.string(),
  dashboardViewType: z.string(),
  dashboardPinToTop: z.boolean(),
  projectListCollapse: z.number(),
  collapseAllProjectLists: z.boolean(),
  groupSimilarEntriesDisabled: z.boolean(),
  myStartOfDay: z.string(),
  projectPickerTaskFilter: z.boolean(),
  lang: z.string(),
  multiFactorEnabled: z.boolean(),
  theme: z.string(),
  scheduling: z.boolean(),
  onboarding: z.boolean(),
})

const membershipSchema = z.object({
  hourlyRate: z.object({
    amount: z.string(),
    currency: z.string(),
  }),
  costRate: z.object({
    amount: z.string(),
    currency: z.string(),
  }),
  membershipStatus: z.string(),
  membershipType: z.string(),
  targetId: z.string(),
  userId: z.string(),
})

const customFieldSchema = z.object({
  customFieldId: z.string(),
  userId: z.string(),
  value: z.string(),
  name: z.string(),
  type: z.string(),
})

const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  memberships: z.array(membershipSchema),
  profilePicture: z.string(),
  activeWorkspace: z.string(),
  defaultWorkspace: z.string(),
  settings: settingsSchema,
  status: z.string(),
  customFields: z.array(customFieldSchema),
})

export type User = z.infer<typeof userSchema>

export function me() {
  return client<User>('user', userSchema)
}
