import { Box } from 'common/components/Box';
import { formatDuration } from 'features/timer/utils/time-entries-utils';
import { FC } from 'react';
import { styled } from 'core/theme/config';

export type WeekDurationProps = {
  weekDuration: number;
};

const Title = styled('div', {
  fontWeight: 'bold',
  fontSize: '$xl',
  lineHeight: '$xl',
  color: '$neutral10',
});

const TotalTime = styled('div', {
  display: 'inline-flex',
  fontSize: '$lg',
  fontWeight: '$normal',
  lineHeight: '$lg',
  color: '$neutral9',
  marginLeft: '$4',
});

export const WeekDuration: FC<WeekDurationProps> = props => {
  return (
    <>
      <Box
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '1rem 0',
        }}
      >
        <Title>
          This week
          <TotalTime>{formatDuration(props.weekDuration)}</TotalTime>
        </Title>
      </Box>
    </>
  );
};
