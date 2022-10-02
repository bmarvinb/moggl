import * as A from 'fp-ts/lib/Array'
import { absurd, pipe } from 'fp-ts/lib/function'
import { Dispatch, useReducer } from 'react'

export type SelectionChanges = {
  added: string[]
  removed: string[]
}

export type SelectionEvent =
  | {
      type: 'RESET'
    }
  | {
      type: 'ALL'
    }
  | {
      type: 'PARENT'
      payload: SelectionChanges
    }
  | {
      type: 'CHILD'
      payload: string
    }

export type SelectionState = {
  selected: string[]
  entries: string[]
}

const initialState: SelectionState = {
  selected: [],
  entries: [],
}

function reducer(
  state: SelectionState,
  action: SelectionEvent,
): SelectionState {
  switch (action.type) {
    case 'RESET':
      return { ...state, selected: [] }
    case 'ALL':
      return {
        ...state,
        selected:
          state.entries.length === state.selected.length ? [] : state.entries,
      }
    case 'PARENT':
      return {
        ...state,
        selected: pipe(
          state.selected,
          A.filter(id => !action.payload.removed.includes(id)),
          A.concat(action.payload.added),
        ),
      }
    case 'CHILD':
      return {
        ...state,
        selected: state.selected.includes(action.payload)
          ? state.selected.filter(selectedId => selectedId !== action.payload)
          : state.selected.concat([action.payload]),
      }
    default:
      return absurd(action)
  }
}

export function useSelection(
  entries: string[] = [],
): [SelectionState, Dispatch<SelectionEvent>] {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    entries,
  })
  return [state, dispatch]
}
