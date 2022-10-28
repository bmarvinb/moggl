import { Button } from 'shared/components/Button';
import { Card } from 'shared/components/Card';
import { Checkbox } from 'shared/components/Checkbox';
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

export const TimeEntriesTableView: React.FC<TimeEntriesTableViewProps> =
  props => {
    return (
      <Card className="mb-4">
        <div className="flex justify-between py-3 px-4">
          <div className="flex items-center">
            {props.bulkEditMode && (
              <div className="mr-4">
                <Checkbox
                  onChange={props.onBulkModeChanged}
                  checked={props.allSelected}
                />
              </div>
            )}
            <div className="mr-2 text-lg font-semibold text-slate-900 dark:text-slate-50">
              {formatDate(props.date)}
            </div>
            <DayDuration
              isToday={isToday(props.date)}
              reportedTime={props.reportedTime}
            />
          </div>
          <div className="relative -right-2 flex items-center text-lg font-bold">
            <Button
              variant="icon"
              color="transparent"
              size={'lg'}
              aria-label="Toggle edit mode"
              onClick={props.onToggleClicked}
            >
              <BiListUl title="Toggle" />
            </Button>
          </div>
        </div>
        {props.children}
      </Card>
    );
  };
