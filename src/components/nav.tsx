import { Box } from 'components/Box'
import { Button } from 'components/Button'
import { FC } from 'react'
import { BiMenuAltLeft } from 'react-icons/bi'

export type NavProps = {
  onMenuClicked: () => void
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
        title="Open menu"
        onClick={() => props.onMenuClicked()}
      >
        <BiMenuAltLeft />
      </Button>
    </Box>
  )
}
