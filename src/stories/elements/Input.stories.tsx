import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Box, Input as InputComponent } from 'components'
import { globalStyles } from 'theme/globalStyles'
import { darkTheme } from 'theme/config'
import { Row } from 'stories/utils/Row'

export default {
  title: 'Elements/Input',
  component: InputComponent,
  argTypes: {
    darkMode: { control: 'boolean', defaultValue: false },
  },
} as ComponentMeta<typeof InputComponent>

const Template: ComponentStory<typeof InputComponent> = (args: any) => {
  globalStyles()
  return (
    <Box className={args.darkMode ? darkTheme : ''}>
      <Box>
        <Row>
          <InputComponent placeholder="Enter value" />
        </Row>
      </Box>

      <Box>
        <Row>
          <InputComponent variant="inline" placeholder="Enter value" />
        </Row>
      </Box>

      <Box>
        <Row>
          <InputComponent placeholder="Enter value" disabled={true} />
        </Row>
      </Box>
    </Box>
  )
}

export const Input = Template.bind({})
