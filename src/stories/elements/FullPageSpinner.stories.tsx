import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Box } from 'common/components/Box'
import { FullPageSpinner } from 'common/components/FullPageSpinner'
import { darkTheme } from 'core/theme/config'
import { globalStyles } from 'core/theme/globalStyles'

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

export const Spinner = Template.bind({})
