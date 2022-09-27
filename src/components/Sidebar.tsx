import { FC } from 'react'
import styled from 'styled-components'
import 'styled-components/macro'

export type SidebarProps = {
  expanded: boolean
  onModeChanged: () => void
}

const Menu = styled.div<{ $collapsed: boolean }>`
  position: fixed;
  z-index: 1;
  top: 40px;
  background: var(--neutral0);
  height: 100vh;
  width: 85%;
  color: var(--neutral9);
  padding: 1rem;
  box-shadow: var(--shadowMd);
  display: ${props => (props.$collapsed ? 'none' : 'flex')};
  flex-direction: column;
  justify-content: space-between;
`

export const Sidebar: FC<SidebarProps> = props => {
  return (
    <div
      onClick={props.onModeChanged}
      css={`
        display: ${!props.expanded ? 'none' : 'flex'};
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        z-index: 1;
      `}
    >
      <Menu $collapsed={!props.expanded}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis nemo
        hic tempore atque cupiditate repudiandae magnam rerum ipsam amet!
        Doloribus dolore sequi aperiam minima ea, nihil tempore expedita dicta
        ducimus!
      </Menu>
    </div>
  )
}
