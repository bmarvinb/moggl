import { FC } from 'react'
import styled from 'styled-components'
import 'styled-components/macro'

export type SidebarProps = {
  expanded: boolean
  onModeChanged: () => void
}

const Menu = styled.div<{ $compact: boolean }>`
  background: var(--primary4);
  height: 100vh;
  width: 10rem;
  color: var(--neutral0);
  padding: 1rem;
  box-shadow: var(--shadowMd);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Sidebar: FC<SidebarProps> = props => {
  console.log('sidebar props', props)
  return (
    <div css={``}>
      <Menu $compact={props.expanded} onClick={props.onModeChanged}>
        <div>Menu</div>
        <div>Collapse</div>
      </Menu>
    </div>
  )
}
