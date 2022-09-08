import { createURLSearchParams, client } from 'utils'
import { z } from 'zod'

const timeIntervalSchema = z.object({
  start: z.string(),
  end: z.string().nullable(),
  duration: z.string(),
})

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
  showOnlyWorkingDays: z.boolean(),
})

const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  memberships: z.array(z.unknown()),
  profilePicture: z.string(),
  activeWorkspace: z.string(),
  defaultWorkspace: z.string(),
  settings: settingsSchema,
  status: z.string(),
  customFields: z.array(z.unknown()),
})

const hourlyRateSchema = z.object({
  amount: z.number(),
  currency: z.string().nullable(),
})

const membershipSchema = z.object({
  userId: z.string(),
  hourlyRate: hourlyRateSchema,
  costRate: z.unknown(),
  targetId: z.string(),
  membershipType: z.enum(['PROJECT', 'WORKSPACE']),
  membershipStatus: z.enum(['ACTIVE', 'INACTIVE']),
})

const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  projectId: z.string(),
  assigneeIds: z.array(z.string()),
  assigneeId: z.array(z.string()).nullable(),
  userGroupIds: z.array(z.string()),
  estimate: z.string(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  duration: z.string(),
  billable: z.boolean(),
  hourlyRate: hourlyRateSchema,
  costRate: z
    .object({
      amount: z.string(),
      currency: z.enum(['USD']),
    })
    .nullable(),
})

const estimateSchema = z.object({
  estimate: z.string(),
  type: z.string(),
})

const timeEstimateSchema = z.object({
  estimate: z.string(),
  type: z.string(),
  resetOption: z.unknown().nullable(),
  active: z.boolean(),
  includeNonBillable: z.boolean(),
})

const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  hourlyRate: hourlyRateSchema,
  clientId: z.string(),
  workspaceId: z.string(),
  billable: z.boolean(),
  memberships: z.array(membershipSchema),
  color: z.string(),
  estimate: estimateSchema,
  archived: z.boolean(),
  duration: z.string(),
  clientName: z.string(),
  note: z.string(),
  costRate: z.unknown().nullable(),
  timeEstimate: timeEstimateSchema,
  budgetEstimate: z.unknown().nullable(),
  template: z.boolean(),
  public: z.boolean(),
})

const hydratedTimeEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  tags: z.unknown(),
  user: userSchema,
  billable: z.boolean(),
  task: taskSchema,
  project: projectSchema,
  timeInterval: timeIntervalSchema,
  workspaceId: z.string(),
  hourlyRate: hourlyRateSchema,
  userId: z.string(),
  customFieldValues: z.array(z.unknown()),
  type: z.string(),
  projectId: z.string(),
  isLocked: z.boolean(),
})

export type TimeEntry = z.infer<typeof hydratedTimeEntrySchema>

export function getTimeEntries(
  workspaceId: string,
  userId: string,
  options: {},
): Promise<TimeEntry[]> {
  const params = createURLSearchParams({ ...options, hydrated: true })
  return client(
    `workspaces/${workspaceId}/user/${userId}/time-entries?${params}`,
  )
}
