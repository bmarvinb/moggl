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
      <Card>
        <div className="flex justify-between py-6 px-8">
          <div className="align-center flex">
            {props.bulkEditMode && (
              <div className="mr-4">
                <Checkbox
                  onChange={props.onBulkModeChanged}
                  checked={props.allSelected}
                />
              </div>
            )}
            <Label>
              <div className="mr-2 text-slate-900 dark:text-slate-50">
                {formatDate(props.date)}
              </div>
              <DayDuration
                isToday={isToday(props.date)}
                reportedTime={props.reportedTime}
              />
            </Label>
          </div>
          <Label className="relative -right-2">
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
        </div>
        {props.children}
      </Card>
    );
  };
