import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BiCart } from 'react-icons/bi'
import { Box } from 'common/components/Box'
import { Button } from 'common/components/Button'
import { darkTheme } from 'core/theme/config'
import { globalStyles } from 'core/theme/globalStyles'
import { Row } from '../utils/Row'

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
        <Row>
          <Button color={'transparent'} size={'sm'}>
            Button
          </Button>
          <Button color={'transparent'} size={'md'}>
            Button
          </Button>
          <Button color={'transparent'} size={'lg'}>
            Button
          </Button>
          <Button color={'transparent'} size={'xl'}>
            Button
          </Button>
        </Row>
      </Box>

      <Box>
        <Row>
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
        </Row>
      </Box>

      <Box>
        <Row>
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
        </Row>
      </Box>

      <Box>
        <Row>
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
        </Row>
      </Box>

      <Box>
        <Row>
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
        </Row>
      </Box>
    </Box>
  )
}

const IconTemplate: ComponentStory<typeof Button> = (args: any) => {
  globalStyles()
  return (
    <Box className={args.darkMode ? darkTheme : ''}>
      <Box>
        <Row>
          <Button color="transparent" variant="icon" size={'sm'}>
            <BiCart />
          </Button>
          <Button color="transparent" variant="icon" size={'md'}>
            <BiCart />
          </Button>
          <Button color="transparent" variant="icon" size={'lg'}>
            <BiCart />
          </Button>
          <Button color="transparent" variant="icon" size={'xl'}>
            <BiCart />
          </Button>
        </Row>
      </Box>

      <Box>
        <Row>
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
        </Row>
      </Box>

      <Box>
        <Row>
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
        </Row>
      </Box>

      <Box>
        <Row>
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
        </Row>
      </Box>

      <Box>
        <Row>
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
        </Row>
      </Box>
    </Box>
  )
}

export const Basic = BasicTemplate.bind({})

export const Icon = IconTemplate.bind({})
