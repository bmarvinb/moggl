import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Box, FullPageSpinner } from 'components'
import { darkTheme } from 'theme/config'
import { globalStyles } from 'theme/globalStyles'

export default {
  title: 'Elements/FullPageSpinner',
  component: FullPageSpinner,
  argTypes: {
    darkMode: { control: 'boolean', defaultValue: false },
  },
} as ComponentMeta<typeof FullPageSpinner>

const Template: ComponentStory<typeof FullPageSpinner> = (args: any) => {
  globalStyles()
  return (
    <Box className={args.darkMode ? darkTheme : ''}>
      <FullPageSpinner />
    </Box>
  )
}

export const Input = Template.bind({})
