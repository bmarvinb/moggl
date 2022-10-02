import { Box } from 'components/Box'
import { Button } from 'components/Button'
import { FC } from 'react'
import { BiMenuAltLeft } from 'react-icons/bi'

export type NavProps = {
  onMenuClicked: () => void
}

export const Navigation: FC<NavProps> = props => {
  return (
    <Box
      as="nav"
      css={{
        background: '$navBg',
        color: '$neutral1',
        minHeight: '2.75rem',
      }}
    >
      <Button
        variant="icon"
        color="transparent"
        size="lg"
        css={{
          position: 'absolute',
          top: '0.25rem',
          left: '0.75rem',
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
