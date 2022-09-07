import { client } from 'utils'

export type SummaryReportSettings = {
  group: string
  subgroup: string
}

export type Settings = {
  weekStart: string
  timeZone: string
  timeFormat: string
  dateFormat: string
  sendNewsletter: boolean
  weeklyUpdates: boolean
  longRunning: boolean
  scheduledReports: boolean
  approval: boolean
  pto: boolean
  alerts: boolean
  reminders: boolean
  timeTrackingManual: boolean
  summaryReportSettings: SummaryReportSettings
  isCompactViewOn: boolean
  dashboardSelection: string
  dashboardViewType: string
  dashboardPinToTop: boolean
  projectListCollapse: number
  collapseAllProjectLists: boolean
  groupSimilarEntriesDisabled: boolean
  myStartOfDay: string
  projectPickerTaskFilter: boolean
  lang: string
  multiFactorEnabled: boolean
  theme: string
  scheduling: boolean
  onboarding: boolean
}

export type User = {
  id: string
  email: string
  name: string
  memberships: any[]
  profilePicture: string
  activeWorkspace: string
  defaultWorkspace: string
  settings: Settings
  status: string
  customFields: any[]
}

export function me(): Promise<User> {
  return client('user')
}
