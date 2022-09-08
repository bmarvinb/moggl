import { client } from 'utils'

export type Rate = {
  amount: number
  currency: string
}

export type Membership = {
  userId: string
  hourlyRate: null | number
  costRate: null | number
  targetId: string
  membershipType: string
  membershipStatus: string
}

export type Round = {
  round: string
  minutes: string
}

export type WorkspaceSettings = {
  timeRoundingInReports: boolean
  onlyAdminsSeeBillableRates: boolean
  onlyAdminsCreateProject: boolean
  onlyAdminsSeeDashboard: boolean
  defaultBillableProjects: boolean
  lockTimeEntries?: any
  round: Round
  projectFavorites: boolean
  canSeeTimeSheet: boolean
  canSeeTracker: boolean
  projectPickerSpecialFilter: boolean
  forceProjects: boolean
  forceTasks: boolean
  forceTags: boolean
  forceDescription: boolean
  onlyAdminsSeeAllTimeEntries: boolean
  onlyAdminsSeePublicProjectsEntries: boolean
  trackTimeDownToSecond: boolean
  projectGroupingLabel: string
  adminOnlyPages: any[]
  automaticLock?: any
  onlyAdminsCreateTag: boolean
  onlyAdminsCreateTask: boolean
  timeTrackingMode: string
  isProjectPublicByDefault: boolean
}

export type Workspace = {
  id: string
  name: string
  hourlyRate: Rate
  memberships: Membership[]
  workspaceSettings: WorkspaceSettings
  imageUrl: string
  featureSubscriptionType: string
}

export type Task = {
  assigneeIds: string[]
  estimate: string
  id: string
  name: string
  projectId: string
  billable: string
  hourlyRate: Rate
  costRate: Rate
  status: string
}

export function getWorkspaces(): Promise<Workspace[]> {
  return client('workspaces')
}

export function getTasks(
  workspaceId: string,
  projectId: string,
  taskId: string,
): Promise<Task> {
  return client(
    `workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`,
  )
}
