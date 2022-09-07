import { Rate } from 'services/workspaces'
import { client } from 'utils/api-client'

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

export function getTasks(
  workspaceId: string,
  projectId: string,
  taskId: string,
): Promise<Task> {
  return client(
    `workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`,
  )
}
