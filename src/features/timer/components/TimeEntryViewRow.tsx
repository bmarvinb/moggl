import {
  isChildTimeEntry,
  isParentTimeEntry,
  TimeEntryRowType,
} from 'features/timer/hooks/selection';
import { InactiveTimeEntry } from 'features/timer/models/time-entry';
import {
  formatDuration,
  formatTimeEntryDate,
  getTimeEntryInfo,
} from 'features/timer/utils/time-entries-utils';
import { constNull, pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import React from 'react';
import {
  BiDollar,
  BiDotsVerticalRounded,
  BiPlay,
  BiPurchaseTag,
} from 'react-icons/bi';
import { Button } from 'shared/components/Button';
import { Checkbox } from 'shared/components/Checkbox';

export type ParentTimeEntry = {
  data: InactiveTimeEntry;
  type: TimeEntryRowType.Parent;
  children: ChildTimeEntry[];
};

export type RegularTimeEntry = {
  data: InactiveTimeEntry;
  type: TimeEntryRowType.Regular;
};

export type ChildTimeEntry = {
  data: InactiveTimeEntry;
  siblings: number;
  type: TimeEntryRowType.Child;
};

export type TimeEntryRowViewModel =
  | RegularTimeEntry
  | ParentTimeEntry
  | ChildTimeEntry;

type TimeEntryViewRowProps = {
  timeEntry: TimeEntryRowViewModel;
  edit: boolean;
  selected: boolean;
  onSelectionChange: (timeEntryId: string) => void;
  onPlayClicked: (timeEntry: TimeEntryRowViewModel) => void;
  onToggleChildrenVisibility?: () => void;
};

export const TimeEntryViewRow: React.FC<TimeEntryViewRowProps> = props => {
  return (
    <>
      <div
        className="flex items-center border-t border-slate-100 py-2 px-3 dark:border-slate-800"
        key={props.timeEntry.data.id}
      >
        {props.edit && (
          <Checkbox
            checked={props.selected}
            onChange={() => props.onSelectionChange(props.timeEntry.data.id)}
          />
        )}
        {isParentTimeEntry(props.timeEntry) && (
          <Button
            color="transparent"
            css={{
              minWidth: '2rem',
              minHeight: '2rem',
            }}
            onClick={() =>
              props.onToggleChildrenVisibility &&
              props.onToggleChildrenVisibility()
            }
            aria-label="Toggle children visibility"
            data-testid="TOGGLE_CHILDREN_VISIBILITY_BUTTON"
          >
            {props.timeEntry.children.length}
          </Button>
        )}

        {isChildTimeEntry(props.timeEntry) && (
          <Button
            color="transparent"
            css={{
              minWidth: '2rem',
              minHeight: '2rem',
              visibility: 'hidden',
            }}
          >
            {props.timeEntry.siblings}
          </Button>
        )}

        <div className="flex flex-1 flex-col">
          <div>
            <div className="mb-2 flex flex-row items-center justify-between">
              <div
                className={`text-slate-900 ${
                  props.timeEntry.data.description.length === 0
                }`}
                data-testid="TIME_ENTRY_DESCRIPTION"
              >
                {props.timeEntry.data.description || 'Add description'}
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="icon"
                  size="lg"
                  color="transparent"
                  aria-label="Select tags"
                >
                  <BiPurchaseTag title="Select tags" />
                </Button>
                <Button
                  variant="icon"
                  size="lg"
                  color="transparent"
                  aria-label="Change billable status"
                >
                  <BiDollar title="Change billable status" />
                </Button>
                <div className="hidden">
                  {formatTimeEntryDate(
                    props.timeEntry.data.start,
                    props.timeEntry.data.end,
                  )}
                </div>
                <div
                  className="text-lg font-bold"
                  data-testid="TIME_ENTRY_DURATION"
                >
                  {formatDuration(props.timeEntry.data.duration)}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between">
            <div>
              {pipe(
                props.timeEntry.data,
                getTimeEntryInfo,
                O.fold(constNull, ({ color, name }) => (
                  <div data-testid="TIME_ENTRY_ADDITIONAL_INFO">{name}</div>
                )),
              )}
            </div>
            <div className="relative right-2 flex gap-1">
              <Button
                variant="icon"
                size="lg"
                color="transparent"
                onClick={() => props.onPlayClicked(props.timeEntry)}
                aria-label="Start timer"
              >
                <BiPlay title="Play" />
              </Button>
              <Button
                variant="icon"
                size="lg"
                color="transparent"
                aria-label="Open actions"
              >
                <BiDotsVerticalRounded title="Actions" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
