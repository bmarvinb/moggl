import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FullPageSpinner } from 'shared/components/FullPageSpinner';
import { darkTheme } from 'theme/config';
import { globalStyles } from 'theme/globalStyles';

export default {
  title: 'Elements/FullPageSpinner',
  component: FullPageSpinner,
  argTypes: {
    darkMode: { control: 'boolean', defaultValue: false },
  },
} as ComponentMeta<typeof FullPageSpinner>;

const Template: ComponentStory<typeof FullPageSpinner> = (args: any) => {
  globalStyles();
  return (
    <div className={args.darkMode ? darkTheme : ''}>
      <FullPageSpinner />
    </div>
  );
};

export const Spinner = Template.bind({});
