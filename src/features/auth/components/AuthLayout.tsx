import { Box } from 'components/Box'
import { FC } from 'react'
import { styled } from 'theme/config'

const Children = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '6rem 3rem',
  background: '$neutral1',
  height: '100%',

  '@xs': {
    width: '35rem',
    margin: 'auto',
  },
  '@xl': {
    margin: 'initial',
  },
})

export const AuthLayout: FC<{
  children: JSX.Element
}> = ({ children }) => {
  return (
    <Box
      css={{
        display: 'flex',
        height: '100%',
        background: 'linear-gradient($primary5, $primary8)',
      }}
    >
      <Children>{children}</Children>
      <Box
        css={{
          position: 'absolute',
          zIndex: -1,
          height: '100%',
          width: '100%',
        }}
      ></Box>
    </Box>
  )
}
