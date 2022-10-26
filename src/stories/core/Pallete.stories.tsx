import { ComponentMeta } from '@storybook/react';
import { Box } from 'shared/components/Box';
import { Button } from 'shared/components/Button';
import {
  blackA,
  cyan,
  cyanDark,
  neutral,
  neutralDark,
  primary,
  primaryDark,
  red,
  redDark,
  secondary,
  secondaryDark,
  whiteA,
} from 'theme/colors';
import { styled } from 'theme/config';
import { globalStyles } from 'theme/globalStyles';
import { Row } from 'stories/utils/Row';

const Color = styled('div', {
  width: '2rem',
  height: '2rem',
  borderRadius: '9999px',
});

export default {
  title: 'Core/Pallete',
  argTypes: {},
} as ComponentMeta<typeof Button>;

const Template = () => {
  globalStyles();
  return (
    <Box>
      <Box>
        <h2>Primary</h2>
        <Row>
          {Object.values(primary).map(color => (
            <Color key={color} css={{ background: color }} />
          ))}
        </Row>
        <Row>
          {Object.values(primaryDark).map(color => (
            <Color key={color} css={{ background: color }} />
          ))}
        </Row>
      </Box>

      <Box>
        <h2>Secondary</h2>
        <Row>
          {Object.values(secondary).map(color => (
            <Color key={color} css={{ background: color }} />
          ))}
        </Row>
        <Row>
          {Object.values(secondaryDark).map(color => (
            <Color key={color} css={{ background: color }} />
          ))}
        </Row>
      </Box>

      <Box>
        <h2>Neutral</h2>
        <Row>
          {Object.values(neutral).map(color => (
            <Color key={color} css={{ background: color }} />
          ))}
        </Row>
        <Row>
          {Object.values(neutralDark).map(color => (
            <Color key={color} css={{ background: color }} />
          ))}
        </Row>
      </Box>

      <Box>
        <h2>Red</h2>
        <Row>
          {Object.values(red).map(color => (
            <Color key={color} css={{ background: color }} />
          ))}
        </Row>
        <Row>
          {Object.values(redDark).map(color => (
            <Color key={color} css={{ background: color }} />
          ))}
        </Row>
      </Box>

      <Box>
        <h2>Cyan</h2>
        <Row>
          {Object.values(cyan).map(color => (
            <Color key={color} css={{ background: color }} />
          ))}
        </Row>
        <Row>
          {Object.values(cyanDark).map(color => (
            <Color key={color} css={{ background: color }} />
          ))}
        </Row>
      </Box>

      <Box>
        <h2>Alpha</h2>
        <Row>
          {Object.values(whiteA).map(color => (
            <Color key={color} css={{ background: color }} />
          ))}
        </Row>
        <Row>
          {Object.values(blackA).map(color => (
            <Color key={color} css={{ background: color }} />
          ))}
        </Row>
      </Box>
    </Box>
  );
};

export const Pallete = Template.bind({});
