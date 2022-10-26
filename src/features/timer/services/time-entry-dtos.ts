import { customFieldSchema } from 'shared/scheme/custom-field';
import { estimateSchema } from 'shared/scheme/estimate';
import { hourlyRateSchema } from 'shared/scheme/hourly-rate';
import { membershipSchema } from 'shared/scheme/membership';
import { statusSchema } from 'shared/scheme/status';
import { z } from 'zod';

const summaryReportSettingsSchema = z.object({
  group: z.string(),
  subgroup: z.string(),
});

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
});

const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  memberships: z.array(z.unknown()),
  profilePicture: z.string(),
  activeWorkspace: z.string(),
  defaultWorkspace: z.string(),
  settings: settingsSchema,
  status: statusSchema,
  customFields: z.array(customFieldSchema),
});

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
});

const tagsSchema = z.object({
  archived: z.boolean(),
  id: z.string(),
  name: z.string(),
  workspaceId: z.string(),
});

const timeEstimateSchema = z.object({
  estimate: z.string(),
  type: z.string(),
  resetOption: z.unknown().nullable(),
  active: z.boolean(),
  includeNonBillable: z.boolean(),
});

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
});

const commonTimeEntrySchema = z.object({});

export const timeEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  tags: z.array(tagsSchema),
  customFieldValues: z.array(customFieldSchema),
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
  projectId: z.string().nullable(),
  project: projectSchema.nullable(),
  timeInterval: z.object({
    start: z.string(),
    end: z.string().nullable(),
    duration: z.string().nullable(),
  }),
});

export const createdTimeEntrySchema = z.object({
  billable: z.boolean(),
  description: z.string(),
  id: z.string(),
  isLocked: z.boolean(),
  projectId: z.string().nullable(),
  tagIds: z.array(z.string()).nullable(),
  taskId: z.string().nullable(),
  timeInterval: z.object({
    start: z.string(),
    end: z.string(),
    duration: z.string(),
  }),
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
});

export type TimeEntryDTO = z.infer<typeof timeEntrySchema>;

export type CreatedTimeEntryDTO = z.infer<typeof createdTimeEntrySchema>;

export type AddTimeEntryDTO = {
  start: string;
  projectId?: string;
  description: string;
  billable: boolean;
};

export type UpdateTimeEntryDTO = {
  billable: boolean;
  description: string;
  start?: string;
  projectId?: string;
};
