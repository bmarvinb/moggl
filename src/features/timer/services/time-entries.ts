import { client, createURLSearchParams } from 'utils/api-client'
import { z } from 'zod'

const inactiveTimeEntryIntervalSchema = z.object({
  start: z.string(),
  end: z.string(),
  duration: z.string(),
})

const activeTimeEntryIntervalSchema = z.object({
  start: z.string(),
  end: z.null(),
  duration: z.null(),
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
  hourlyRate: hourlyRateSchema.nullable(),
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
  hourlyRate: hourlyRateSchema.nullable(),
  costRate: z
    .object({
      amount: z.string(),
      currency: z.enum(['USD']),
    })
    .nullable(),
})

const tagsSchema = z.object({
  archived: z.boolean(),
  id: z.string(),
  name: z.string(),
  workspaceId: z.string(),
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
  clientName: z.string().nullable(),
  note: z.string(),
  costRate: z.unknown().nullable(),
  timeEstimate: timeEstimateSchema,
  budgetEstimate: z.unknown().nullable(),
  template: z.boolean(),
  public: z.boolean(),
})

const commonTimeEntrySchema = z.object({
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

const activeTimeEntrySchema = z.intersection(
  commonTimeEntrySchema,
  z.object({
    project: projectSchema.nullable(),
    projectId: z.string().nullable(),
    timeInterval: activeTimeEntryIntervalSchema,
  }),
)

const inactiveTimeEntrySchema = z.intersection(
  commonTimeEntrySchema,
  z.object({
    project: projectSchema,
    projectId: z.string(),
    timeInterval: inactiveTimeEntryIntervalSchema,
  }),
)

const timeEntrySchema = z.union([
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

const timeEntriesSchema = z.array(timeEntrySchema)
export type TimeEntries = z.infer<typeof timeEntriesSchema>

export async function getTimeEntries(
  workspaceId: string,
  userId: string,
  options: TimeEntriesRequestOptions = {},
) {
  const params = createURLSearchParams({ ...options, hydrated: true })
  return client<TimeEntries>(
    `workspaces/${workspaceId}/user/${userId}/time-entries?${params}`,
    timeEntriesSchema,
  )
}

const createdTimeEntrySchema = z.object({
  billable: z.boolean(),
  description: z.string(),
  id: z.string(),
  isLocked: z.boolean(),
  projectId: z.string().nullable(),
  tagIds: z.array(z.string()).nullable(),
  taskId: z.string().nullable(),
  timeInterval: activeTimeEntryIntervalSchema,
  userId: z.string(),
  workspaceId: z.string(),
  customFieldValues: z
    .array(
      z.object({
        customFieldId: z.string(),
        timeEntryId: z.string(),
        value: z.string(),
        name: z.string(),
        type: z.string(),
      }),
    )
    .nullable(),
})

export type CreatedTimeEntry = z.infer<typeof createdTimeEntrySchema>

export type CreateTimeEntryPayload = {
  start: string
  billable: boolean
  description: string
  projectId: string | undefined
  taskId: string | undefined
  end: string | undefined
  tagIds: string[] | undefined
  customFields: { customFieldId: string; value: string }[]
}

export async function createTimeEntry(
  workspaceId: string,
  data: CreateTimeEntryPayload,
) {
  return client<CreatedTimeEntry>(
    `/workspaces/${workspaceId}/time-entries`,
    createdTimeEntrySchema,
    { data },
  )
}
