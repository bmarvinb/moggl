import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Button } from './Button'

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {},
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = args => (
  <Button color={args.color}>Content</Button>
)

export const Default = Template.bind({})
Default.args = {
  color: 'primary',
}
export const Danger = Template.bind({})
Danger.args = {
  color: 'danger',
}
