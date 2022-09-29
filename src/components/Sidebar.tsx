import { Box } from 'components/Box'
import { FC } from 'react'
import { styled } from 'theme/config'

export type SidebarProps = {
  expanded: boolean
  onModeChanged: () => void
}

const Menu = styled('div', {
  position: 'fixed',
  zIndex: 1,
  top: '3rem',
  background: '$neutral0',
  height: '100vh',
  width: '85%',
  color: '$neutral9',
  padding: '1rem',
  boxShadow: '$md',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

export const Sidebar: FC<SidebarProps> = props => {
  return (
    <Box
      onClick={props.onModeChanged}
      css={{
        display: props.expanded ? 'flex' : 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.3)',
        zIndex: 1,
      }}
    >
      <Menu
        onClick={e => e.stopPropagation()}
        css={{
          display: props.expanded ? 'flex' : 'none',
        }}
      >
        <select>
          <option>Workspace 1</option>
          <option>Workspace 2</option>
        </select>
      </Menu>
    </Box>
  )
}
