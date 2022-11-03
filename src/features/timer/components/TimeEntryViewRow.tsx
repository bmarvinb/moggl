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
import {
  BiDollar,
  BiDotsVerticalRounded,
  BiPlay,
  BiPurchaseTag,
} from 'react-icons/bi';
import { ButtonIcon } from 'shared/components/ButtonIcon';
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

export const TimeEntryViewRow = (props: TimeEntryViewRowProps) => {
  return (
    <>
      <div
        className="flex items-center gap-4 border-t border-neutral-100 py-3 px-4 dark:border-neutral-dark-100"
        key={props.timeEntry.data.id}
      >
        {props.edit && (
          <Checkbox
            checked={props.selected}
            onChange={() => props.onSelectionChange(props.timeEntry.data.id)}
          />
        )}
        {isParentTimeEntry(props.timeEntry) && (
          <button
            className="text-neutral-800 dark:text-neutral-100"
            onClick={() =>
              props.onToggleChildrenVisibility &&
              props.onToggleChildrenVisibility()
            }
            aria-label="Toggle children visibility"
            data-testid="TOGGLE_CHILDREN_VISIBILITY_BUTTON"
          >
            {props.timeEntry.children.length}
          </button>
        )}

        {isChildTimeEntry(props.timeEntry) && (
          <button className="opacity-0">{props.timeEntry.siblings}</button>
        )}

        <div className="flex w-full flex-col">
          <div className="mb-2 grid grid-cols-[5fr_1fr] items-center gap-3">
            <div
              className={` truncate ${
                props.timeEntry.data.description.length === 0
                  ? 'text-neutral-600 dark:text-neutral-100'
                  : 'text-neutral-900 dark:text-neutral-50'
              }`}
              data-testid="TIME_ENTRY_DESCRIPTION"
            >
              {props.timeEntry.data.description || 'Add description'}
            </div>
            <div className="flex items-center justify-end gap-1">
              <ButtonIcon icon={<BiPurchaseTag title="Select tags" />} />
              <ButtonIcon icon={<BiDollar title="Change billable status" />} />
              <div className="hidden">
                {formatTimeEntryDate(
                  props.timeEntry.data.start,
                  props.timeEntry.data.end,
                )}
              </div>
              <div className="ml-2 text-lg font-semibold">
                {formatDuration(props.timeEntry.data.duration)}
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between">
            <div>
              {!props.timeEntry.data.project ? (
                <div className="text-sm text-neutral-600 dark:text-neutral-dark-600">
                  Select project
                </div>
              ) : (
                <div className="text-sm">
                  {getTimeEntryInfo(props.timeEntry.data)}
                </div>
              )}
            </div>
            <div className="relative -right-1 flex gap-1">
              <ButtonIcon
                onClick={() => props.onPlayClicked(props.timeEntry)}
                icon={<BiPlay title="Play" />}
              />
              <ButtonIcon icon={<BiDotsVerticalRounded title="Actions" />} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
