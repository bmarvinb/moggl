import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Box } from 'common/components/Box';
import { Textarea as TextareaComponent } from 'common/components/Textarea';
import { darkTheme } from 'core/theme/config';
import { globalStyles } from 'core/theme/globalStyles';
import { Row } from 'stories/utils/Row';

export default {
  title: 'Elements/Textarea',
  component: TextareaComponent,
  argTypes: {
    darkMode: { control: 'boolean', defaultValue: false },
  },
} as ComponentMeta<typeof TextareaComponent>;

const Template: ComponentStory<typeof TextareaComponent> = (args: any) => {
  globalStyles();
  return (
    <Box className={args.darkMode ? darkTheme : ''}>
      <Box>
        <Row>
          <TextareaComponent placeholder="Enter value" />
        </Row>
      </Box>

      <Box>
        <Row>
          <TextareaComponent placeholder="Enter value" disabled={true} />
        </Row>
      </Box>
    </Box>
  );
};

export const Textarea = Template.bind({});
