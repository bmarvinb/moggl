import { Box } from 'components/Box'
import { Button } from 'components/Button'
import { FC } from 'react'
import { BiMenuAltLeft, BiMoon, BiSun } from 'react-icons/bi'

export type NavProps = {
  darkMode: boolean
  onToggleSidebar: () => void
  onToggleDarkMode: () => void
}

export const Nav: FC<NavProps> = props => {
  return (
    <Box
      as="nav"
      css={{
        background: '$navBg',
        color: '$neutral1',
        padding: '$2 $4',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1,
        minHeight: '3rem',
      }}
    >
      <Button
        variant="icon"
        color="transparent"
        size="lg"
        css={{
          color: '$lightTextColor',
          '&:hover': {
            color: '$lightTextColor',
          },
        }}
        onClick={() => props.onToggleSidebar()}
      >
        <BiMenuAltLeft />
      </Button>

      <Button
        variant="icon"
        color="transparent"
        size="lg"
        css={{
          color: '$lightTextColor',
          '&:hover': {
            color: '$lightTextColor',
          },
        }}
        onClick={props.onToggleDarkMode}
      >
        {props.darkMode ? <BiMoon /> : <BiSun />}
      </Button>
    </Box>
  )
}
