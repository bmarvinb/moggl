import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BiCart } from 'react-icons/bi';
import { Button } from 'shared/components/Button';
import { darkTheme } from 'theme/config';
import { globalStyles } from 'theme/globalStyles';
import { Row } from '../utils/Row';

export default {
  title: 'Elements/Button',
  component: Button,
  argTypes: {
    darkMode: { control: 'boolean', defaultValue: false },
  },
} as ComponentMeta<typeof Button>;

const BasicTemplate: ComponentStory<typeof Button> = (args: any) => {
  globalStyles();
  return (
    <div className={args.darkMode ? darkTheme : ''}>
      <div>
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
      </div>

      <div>
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
      </div>

      <div>
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
      </div>

      <div>
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
      </div>

      <div>
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
      </div>
    </div>
  );
};

const IconTemplate: ComponentStory<typeof Button> = (args: any) => {
  globalStyles();
  return (
    <div className={args.darkMode ? darkTheme : ''}>
      <div>
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
      </div>

      <div>
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
      </div>

      <div>
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
      </div>

      <div>
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
      </div>

      <div>
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
      </div>
    </div>
  );
};

export const Basic = BasicTemplate.bind({});

export const Icon = IconTemplate.bind({});
