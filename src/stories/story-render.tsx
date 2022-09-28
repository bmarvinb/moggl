import { FC } from 'react'
import { globalStyles } from 'theme/globalStyles'

export const StoryRender: FC<{ children: JSX.Element }> = props => {
  globalStyles()
  return <>{props.children}</>
}
