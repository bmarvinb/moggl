import { z } from 'zod';

const rateSchema = z.object({
  amount: z.number(),
  currency: z.string(),
});

const membershipSchema = z.object({
  userId: z.string(),
  hourlyRate: z.number().nullable(),
  costRate: z.number().nullable(),
  targetId: z.string(),
  membershipType: z.string(),
  membershipStatus: z.string(),
});

const roundSchema = z.object({
  round: z.string(),
  minutes: z.string(),
});

const automaticLockSchema = z.object({
  changeDay: z.string(),
  dayOfMonth: z.number(),
  firstDay: z.string(),
  olderThanPeriod: z.string(),
  olderThanValue: z.number(),
  type: z.string(),
});

const workspaceSettingsSchema = z.object({
  timeRoundingInReports: z.boolean(),
  onlyAdminsSeeBillableRates: z.boolean(),
  onlyAdminsCreateProject: z.boolean(),
  onlyAdminsSeeDashboard: z.boolean(),
  defaultBillableProjects: z.boolean(),
  lockTimeEntries: z.string().nullable(),
  round: roundSchema,
  projectFavorites: z.boolean(),
  canSeeTimeSheet: z.boolean(),
  canSeeTracker: z.boolean(),
  projectPickerSpecialFilter: z.boolean(),
  forceProjects: z.boolean(),
  forceTasks: z.boolean(),
  forceTags: z.boolean(),
  forceDescription: z.boolean(),
  onlyAdminsSeeAllTimeEntries: z.boolean(),
  onlyAdminsSeePublicProjectsEntries: z.boolean(),
  trackTimeDownToSecond: z.boolean(),
  projectGroupingLabel: z.string(),
  adminOnlyPages: z.array(z.string()),
  automaticLock: automaticLockSchema.nullable(),
  onlyAdminsCreateTag: z.boolean(),
  onlyAdminsCreateTask: z.boolean(),
  timeTrackingMode: z.string(),
  isProjectPublicByDefault: z.boolean(),
});

const workspaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  hourlyRate: rateSchema,
  memberships: z.array(membershipSchema),
  workspaceSettings: workspaceSettingsSchema,
  imageUrl: z.string(),
  featureSubscriptionType: z.string(),
});

export type Workspace = z.infer<typeof workspaceSchema>;

export const workspacesSchema = z
  .array(workspaceSchema)
  .nonempty({ message: 'Should be at least 1 workspace' });

export type Workspaces = z.infer<typeof workspacesSchema>;
