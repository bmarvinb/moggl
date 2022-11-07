import { Card } from 'common/components/Card/Card';
import { Checkbox } from 'common/components/Checkbox';
import { isToday } from 'date-fns';
import React from 'react';
import { BiListUl } from 'react-icons/bi';
import { formatDate } from '../utils';
import { DayDuration } from './DayDuration';

type TimeEntryRowContainerProps = {
  children: React.ReactNode;
  bulkEditMode: boolean;
  allSelected: boolean;
  reportedTime: number;
  date: Date;
  onBulkModeChanged: () => void;
  onToggleClicked: () => void;
};

export const TimeEntryRowContainer = (props: TimeEntryRowContainerProps) => {
  return (
    <Card className="mb-4">
      <div className="flex justify-between py-3 px-4">
        <div className="flex items-center">
          {props.bulkEditMode && (
            <Checkbox
              className="mr-4"
              onChange={props.onBulkModeChanged}
              checked={props.allSelected}
            />
          )}
          <div className="mr-2 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
            {formatDate(props.date)}
          </div>
          <DayDuration
            isToday={isToday(props.date)}
            reportedTime={props.reportedTime}
          />
        </div>
        <div className="relative -right-0.5 flex items-center text-lg font-bold">
          <button aria-label="Toggle edit mode" onClick={props.onToggleClicked}>
            <BiListUl title="Toggle" />
          </button>
        </div>
      </div>
      {props.children}
    </Card>
  );
};
