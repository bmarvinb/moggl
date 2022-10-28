import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Input as InputComponent } from 'shared/components/Input';
import { darkTheme } from 'theme/config';
import { globalStyles } from 'theme/globalStyles';
import { Row } from 'stories/utils/Row';

export default {
  title: 'Elements/Input',
  component: InputComponent,
  argTypes: {
    darkMode: { control: 'boolean', defaultValue: false },
  },
} as ComponentMeta<typeof InputComponent>;

const Template: ComponentStory<typeof InputComponent> = (args: any) => {
  globalStyles();
  return (
    <div className={args.darkMode ? darkTheme : ''}>
      <div>
        <Row>
          <InputComponent placeholder="Enter value" />
        </Row>
      </div>

      <div>
        <Row>
          <InputComponent variant="inline" placeholder="Enter value" />
        </Row>
      </div>

      <div>
        <Row>
          <InputComponent placeholder="Enter value" disabled={true} />
        </Row>
      </div>
    </div>
  );
};

export const Input = Template.bind({});
