import {
  isChildTimeEntry,
  isParentTimeEntry,
  TimeEntryRowType,
} from 'features/timer/hooks/useSelection';
import { CompletedTimeEntry } from 'features/timer/models/time-entry';
import {
  BiDollar,
  BiDotsVerticalRounded,
  BiPlay,
  BiPurchaseTag,
} from 'react-icons/bi';
import { ButtonIcon } from 'components/Elements/ButtonIcon';
import { Checkbox } from 'components/Checkbox';

export type ParentTimeEntry = {
  data: CompletedTimeEntry;
  type: 'parent';
  children: ChildTimeEntry[];
};

export type RegularTimeEntry = {
  data: CompletedTimeEntry;
  type: 'regular';
};

export type ChildTimeEntry = {
  data: CompletedTimeEntry;
  siblings: number;
  type: 'child';
};

export type TimeEntryRow = RegularTimeEntry | ParentTimeEntry | ChildTimeEntry;

type TimeEntryViewRowProps = {
  timeEntry: TimeEntryRow;
  edit: boolean;
  selected: boolean;
  duration: string;
  projectInfo: string | undefined;
  onSelectionChange: () => void;
  onPlayClicked: () => void;
  onToggleChildrenVisibility?: () => void;
};

export const TimeEntryViewRow = (props: TimeEntryViewRowProps) => {
  return (
    <div
      key={props.timeEntry.data.id}
      className="flex items-center gap-4 border-t border-neutral-100 py-3 px-4 dark:border-neutral-dark-100"
    >
      {props.edit && (
        <Checkbox checked={props.selected} onChange={props.onSelectionChange} />
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
            <div className="ml-2 text-lg font-semibold">{props.duration}</div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between">
          <div>
            {!props.timeEntry.data.project ? (
              <div className="text-sm text-neutral-600 dark:text-neutral-dark-600">
                Select project
              </div>
            ) : (
              <div className="text-sm">{props.projectInfo}</div>
            )}
          </div>
          <div className="relative -right-1 flex gap-1">
            <ButtonIcon
              onClick={props.onPlayClicked}
              icon={<BiPlay title="Play" />}
            />
            <ButtonIcon icon={<BiDotsVerticalRounded title="Actions" />} />
          </div>
        </div>
      </div>
    </div>
  );
};
