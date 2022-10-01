import { ComponentMeta } from '@storybook/react'
import { Box } from 'components/Box'
import {
  blackA,
  cyan,
  cyanDark,
  neutral,
  neutralDark,
  primary,
  primaryDark,
  red,
  redDark,
  secondary,
  secondaryDark,
  whiteA,
} from 'theme/colors'
import { styled, theme } from 'theme/config'
import { globalStyles } from 'theme/globalStyles'
import { Button } from '../../components/Button'

const Color = styled('div', {
  width: '2rem',
  height: '2rem',
  borderRadius: '9999px',
})

const Row = styled('div', {
  display: 'flex',
  marginBottom: '$4',
  gap: '$4',
})

export default {
  title: 'Core/Pallete',
  argTypes: {},
} as ComponentMeta<typeof Button>

const Template = () => {
  console.log(theme)
  globalStyles()
  return (
    <Box>
      <Box>
        <h2>Primary</h2>
        <Row>
          {Object.values(primary).map(color => (
            <Color css={{ background: color }} />
          ))}
        </Row>
        <Row>
          {Object.values(primaryDark).map(color => (
            <Color css={{ background: color }} />
          ))}
        </Row>
      </Box>

      <Box>
        <h2>Secondary</h2>
        <Row>
          {Object.values(secondary).map(color => (
            <Color css={{ background: color }} />
          ))}
        </Row>
        <Row>
          {Object.values(secondaryDark).map(color => (
            <Color css={{ background: color }} />
          ))}
        </Row>
      </Box>

      <Box>
        <h2>Neutral</h2>
        <Row>
          {Object.values(neutral).map(color => (
            <Color css={{ background: color }} />
          ))}
        </Row>
        <Row>
          {Object.values(neutralDark).map(color => (
            <Color css={{ background: color }} />
          ))}
        </Row>
      </Box>

      <Box>
        <h2>Red</h2>
        <Row>
          {Object.values(red).map(color => (
            <Color css={{ background: color }} />
          ))}
        </Row>
        <Row>
          {Object.values(redDark).map(color => (
            <Color css={{ background: color }} />
          ))}
        </Row>
      </Box>

      <Box>
        <h2>Cyan</h2>
        <Row>
          {Object.values(cyan).map(color => (
            <Color css={{ background: color }} />
          ))}
        </Row>
        <Row>
          {Object.values(cyanDark).map(color => (
            <Color css={{ background: color }} />
          ))}
        </Row>
      </Box>

      <Box>
        <h2>Alpha</h2>
        <Row>
          {Object.values(whiteA).map(color => (
            <Color css={{ background: color }} />
          ))}
        </Row>
        <Row>
          {Object.values(blackA).map(color => (
            <Color css={{ background: color }} />
          ))}
        </Row>
      </Box>
    </Box>
  )
}

export const Pallete = Template.bind({})
