import { z } from 'zod'

export const inactiveTimeEntryIntervalSchema = z.object({
  start: z.string(),
  end: z.string(),
  duration: z.string(),
})

export const activeTimeEntryIntervalSchema = z.object({
  start: z.string(),
  end: z.null(),
  duration: z.null(),
})

export const summaryReportSettingsSchema = z.object({
  group: z.string(),
  subgroup: z.string(),
})

export const settingsSchema = z.object({
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

export const userSchema = z.object({
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

export const hourlyRateSchema = z.object({
  amount: z.number(),
  currency: z.string().nullable(),
})

export const membershipSchema = z.object({
  userId: z.string(),
  hourlyRate: hourlyRateSchema.nullable(),
  costRate: z.unknown(),
  targetId: z.string(),
  membershipType: z.enum(['PROJECT', 'WORKSPACE']),
  membershipStatus: z.enum(['ACTIVE', 'INACTIVE']),
})

export const taskSchema = z.object({
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
  hourlyRate: hourlyRateSchema.nullable(),
  costRate: z
    .object({
      amount: z.string(),
      currency: z.enum(['USD']),
    })
    .nullable(),
})

export const tagsSchema = z.object({
  archived: z.boolean(),
  id: z.string(),
  name: z.string(),
  workspaceId: z.string(),
})

export const estimateSchema = z.object({
  estimate: z.string(),
  type: z.string(),
})

export const timeEstimateSchema = z.object({
  estimate: z.string(),
  type: z.string(),
  resetOption: z.unknown().nullable(),
  active: z.boolean(),
  includeNonBillable: z.boolean(),
})

export const projectSchema = z.object({
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
  clientName: z.string().nullable(),
  note: z.string(),
  costRate: z.unknown().nullable(),
  timeEstimate: timeEstimateSchema,
  budgetEstimate: z.unknown().nullable(),
  template: z.boolean(),
  public: z.boolean(),
})

export const commonTimeEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  tags: z.array(tagsSchema),
  customFieldValues: z.array(z.unknown()),
  billable: z.boolean(),
  task: taskSchema.nullable(),
  workspaceId: z.string(),
  hourlyRate: hourlyRateSchema.nullable(),
  type: z.enum(['REGULAR']),
  isLocked: z.boolean(),
  kiosk: z.unknown().nullable(),
  kioskId: z.string().nullable(),
  user: userSchema,
  userId: z.string(),
})

export const activeTimeEntrySchema = z.intersection(
  commonTimeEntrySchema,
  z.object({
    project: projectSchema.nullable(),
    projectId: z.string().nullable(),
    timeInterval: activeTimeEntryIntervalSchema,
  }),
)

export const inactiveTimeEntrySchema = z.intersection(
  commonTimeEntrySchema,
  z.object({
    project: projectSchema,
    projectId: z.string(),
    timeInterval: inactiveTimeEntryIntervalSchema,
  }),
)

export const timeEntrySchema = z.union([
  activeTimeEntrySchema,
  inactiveTimeEntrySchema,
])

export type TimeEntry = z.infer<typeof timeEntrySchema>

export type ActiveTimeEntry = z.infer<typeof activeTimeEntrySchema>

export type InactiveTimeEntry = z.infer<typeof inactiveTimeEntrySchema>

export type TimeEntryProject = z.infer<typeof projectSchema>

export type TimeEntriesRequestOptions = {
  description?: string
  start?: string
  end?: string
  project?: string
  task?: string
  tags?: string
  'project-required'?: boolean
  'task-required'?: boolean
  'in-progress'?: boolean
  page?: number
  'page-size'?: number
}

export const timeEntriesSchema = z.array(timeEntrySchema)

export type TimeEntries = z.infer<typeof timeEntriesSchema>
