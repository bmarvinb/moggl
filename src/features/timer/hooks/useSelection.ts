import { Dispatch, useReducer } from 'react';
import { assertNever } from 'utils/assert';
import {
  ChildTimeEntry,
  ParentTimeEntry,
  TimeEntryRow,
} from '../components/TimeEntryViewRow';

export type SelectionChanges = {
  added: string[];
  removed: string[];
};

export type SelectionEvent =
  | {
      type: 'RESET';
    }
  | {
      type: 'ALL';
    }
  | {
      type: 'PARENT';
      changes: SelectionChanges;
    }
  | {
      type: 'CHILD';
      id: string;
    };

export type SelectionState = {
  selected: string[];
  entries: string[];
};

const initialState: SelectionState = {
  selected: [],
  entries: [],
};

function reducer(
  state: SelectionState,
  action: SelectionEvent,
): SelectionState {
  switch (action.type) {
    case 'RESET':
      return { ...state, selected: [] };
    case 'ALL':
      return {
        ...state,
        selected:
          state.entries.length === state.selected.length ? [] : state.entries,
      };
    case 'PARENT':
      return {
        ...state,
        selected: state.selected
          .filter(id => !action.changes.removed.includes(id))
          .concat(action.changes.added),
      };
    case 'CHILD':
      return {
        ...state,
        selected: state.selected.includes(action.id)
          ? state.selected.filter(selectedId => selectedId !== action.id)
          : state.selected.concat([action.id]),
      };
    default:
      return assertNever(action);
  }
}

export function useSelection(
  entries: string[] = [],
): [SelectionState, Dispatch<SelectionEvent>] {
  const [state, send] = useReducer(reducer, {
    ...initialState,
    entries,
  });
  return [state, send];
}

export function isParentTimeEntry(
  timeEntry: TimeEntryRow,
): timeEntry is ParentTimeEntry {
  return timeEntry.type === 'parent';
}

export function isChildTimeEntry(
  timeEntry: TimeEntryRow,
): timeEntry is ChildTimeEntry {
  return timeEntry.type === 'child';
}

export type TimeEntryRowType = 'regular' | 'parent' | 'child';
