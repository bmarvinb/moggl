import { Box } from 'shared/components/Box';
import { Button } from 'shared/components/Button';
import { Card } from 'shared/components/Card';
import { Checkbox } from 'shared/components/Checkbox';
import { styled } from 'theme/config';
import { isToday } from 'date-fns';
import { DayDuration } from 'features/timer/components/DayDuration';
import { formatDate } from 'features/timer/utils/time-entries-utils';
import React from 'react';
import { BiListUl } from 'react-icons/bi';

type TimeEntriesTableViewProps = {
  children: React.ReactNode;
  bulkEditMode: boolean;
  allSelected: boolean;
  reportedTime: number;
  date: Date;
  onBulkModeChanged: () => void;
  onToggleClicked: () => void;
};

const TimeEntriesTable = styled(Card, {
  marginBottom: '1rem',
  '&:last-child': {
    marginBottom: 0,
  },
});

const Label = styled('div', {
  fontSize: '$lg',
  lineHeight: '$lg',
  display: 'flex',
  alignItems: 'center',
  fontWeight: '$semibold',
});

export const TimeEntriesTableView: React.FC<TimeEntriesTableViewProps> =
  props => {
    return (
      <TimeEntriesTable>
        <Box
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '$6 $8',
          }}
        >
          <Box
            css={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {props.bulkEditMode && (
              <Box
                css={{
                  marginRight: '$4',
                }}
              >
                <Checkbox
                  onChange={props.onBulkModeChanged}
                  checked={props.allSelected}
                />
              </Box>
            )}
            <Label>
              <Box
                css={{
                  marginRight: '$2',
                  color: '$neutral10',
                }}
              >
                {formatDate(props.date)}
              </Box>
              <DayDuration
                isToday={isToday(props.date)}
                reportedTime={props.reportedTime}
              />
            </Label>
          </Box>
          <Label
            css={{
              position: 'relative',
              right: '-0.25rem',
            }}
          >
            <Button
              variant="icon"
              color="transparent"
              size={'lg'}
              aria-label="Toggle edit mode"
              onClick={props.onToggleClicked}
            >
              <BiListUl title="Toggle" />
            </Button>
          </Label>
        </Box>
        {props.children}
      </TimeEntriesTable>
    );
  };
