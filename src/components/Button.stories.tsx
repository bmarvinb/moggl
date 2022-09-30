import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Box } from 'components/Box'
import { globalStyles } from 'theme/globalStyles'
import { Button } from './Button'
import { darkTheme } from 'theme/config'
import { BiCart } from 'react-icons/bi'

export default {
  title: 'Elements/Button',
  component: Button,
  argTypes: {
    darkMode: { control: 'boolean', defaultValue: false },
  },
} as ComponentMeta<typeof Button>

const BasicTemplate: ComponentStory<typeof Button> = (args: any) => {
  globalStyles()
  return (
    <Box className={args.darkMode ? darkTheme : ''}>
      <Box>
        <Box
          css={{
            button: {
              marginRight: '$8',
            },
            marginBottom: '$8',
          }}
        >
          <Button size={'sm'}>Button</Button>
          <Button size={'md'}>Button</Button>
          <Button size={'lg'}>Button</Button>
          <Button size={'xl'}>Button</Button>
        </Box>
      </Box>

      <Box>
        <Box
          css={{
            button: {
              marginRight: '$8',
            },
            marginBottom: '$8',
          }}
        >
          <Button size={'sm'} color="primary">
            Button
          </Button>
          <Button size={'md'} color="primary">
            Button
          </Button>
          <Button size={'lg'} color="primary">
            Button
          </Button>
          <Button size={'xl'} color="primary">
            Button
          </Button>
        </Box>
      </Box>

      <Box>
        <Box
          css={{
            button: {
              marginRight: '$8',
            },
            marginBottom: '$8',
          }}
        >
          <Button size={'sm'} color="danger">
            Button
          </Button>
          <Button size={'md'} color="danger">
            Button
          </Button>
          <Button size={'lg'} color="danger">
            Button
          </Button>
          <Button size={'xl'} color="danger">
            Button
          </Button>
        </Box>
      </Box>

      <Box>
        <Box
          css={{
            button: {
              marginRight: '$8',
            },
            marginBottom: '$8',
          }}
        >
          <Button size={'sm'} fill="outline" color="primary">
            Button
          </Button>
          <Button size={'md'} fill="outline" color="primary">
            Button
          </Button>
          <Button size={'lg'} fill="outline" color="primary">
            Button
          </Button>
          <Button size={'xl'} fill="outline" color="primary">
            Button
          </Button>
        </Box>
      </Box>

      <Box>
        <Box
          css={{
            button: {
              marginRight: '$8',
            },
            marginBottom: '$8',
          }}
        >
          <Button size={'sm'} fill="outline" color="danger">
            Button
          </Button>
          <Button size={'md'} fill="outline" color="danger">
            Button
          </Button>
          <Button size={'lg'} fill="outline" color="danger">
            Button
          </Button>
          <Button size={'xl'} fill="outline" color="danger">
            Button
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

const IconTemplate: ComponentStory<typeof Button> = (args: any) => {
  globalStyles()
  return (
    <Box className={args.darkMode ? darkTheme : ''}>
      <Box>
        <Box
          css={{
            button: {
              marginRight: '$8',
            },
            marginBottom: '$8',
          }}
        >
          <Button variant="icon" size={'sm'}>
            <BiCart />
          </Button>
          <Button variant="icon" size={'md'}>
            <BiCart />
          </Button>
          <Button variant="icon" size={'lg'}>
            <BiCart />
          </Button>
          <Button variant="icon" size={'xl'}>
            <BiCart />
          </Button>
        </Box>
      </Box>

      <Box>
        <Box
          css={{
            button: {
              marginRight: '$8',
            },
            marginBottom: '$8',
          }}
        >
          <Button size={'sm'} variant="icon" color="primary">
            <BiCart />
          </Button>
          <Button size={'md'} variant="icon" color="primary">
            <BiCart />
          </Button>
          <Button size={'lg'} variant="icon" color="primary">
            <BiCart />
          </Button>
          <Button size={'xl'} variant="icon" color="primary">
            <BiCart />
          </Button>
        </Box>
      </Box>

      <Box>
        <Box
          css={{
            button: {
              marginRight: '$8',
            },
            marginBottom: '$8',
          }}
        >
          <Button size={'sm'} variant="icon" color="danger">
            <BiCart />
          </Button>
          <Button size={'md'} variant="icon" color="danger">
            <BiCart />
          </Button>
          <Button size={'lg'} variant="icon" color="danger">
            <BiCart />
          </Button>
          <Button size={'xl'} variant="icon" color="danger">
            <BiCart />
          </Button>
        </Box>
      </Box>

      <Box>
        <Box
          css={{
            button: {
              marginRight: '$8',
            },
            marginBottom: '$8',
          }}
        >
          <Button fill="outline" size={'sm'} variant="icon" color="primary">
            <BiCart />
          </Button>
          <Button fill="outline" size={'md'} variant="icon" color="primary">
            <BiCart />
          </Button>
          <Button fill="outline" size={'lg'} variant="icon" color="primary">
            <BiCart />
          </Button>
          <Button fill="outline" size={'xl'} variant="icon" color="primary">
            <BiCart />
          </Button>
        </Box>
      </Box>

      <Box>
        <Box
          css={{
            button: {
              marginRight: '$8',
            },
            marginBottom: '$8',
          }}
        >
          <Button fill="outline" size={'sm'} variant="icon" color="danger">
            <BiCart />
          </Button>
          <Button fill="outline" size={'md'} variant="icon" color="danger">
            <BiCart />
          </Button>
          <Button fill="outline" size={'lg'} variant="icon" color="danger">
            <BiCart />
          </Button>
          <Button fill="outline" size={'xl'} variant="icon" color="danger">
            <BiCart />
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export const Basic = BasicTemplate.bind({})
Basic.args = {}

export const Icon = IconTemplate.bind({})
Basic.args = {}
