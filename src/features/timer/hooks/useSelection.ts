import * as A from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/function'
import { Dispatch, useReducer } from 'react'
import { assertNever } from 'utils/function'

export type SelectionChanges = {
  added: string[]
  removed: string[]
}

export type SelectionEvent =
  | {
      type: 'RESET'
    }
  | {
      type: 'TOGGLE'
    }
  | {
      type: 'SELECT.PARENT'
      payload: SelectionChanges
    }
  | {
      type: 'SELECT.CHILD'
      payload: string
    }

export type SelectionState = {
  selectedIds: string[]
  entriesIds: string[]
}

const initialState: SelectionState = {
  selectedIds: [],
  entriesIds: [],
}

function reducer(state: SelectionState, action: SelectionEvent) {
  switch (action.type) {
    case 'RESET':
      return { ...state, selectedIds: [] }
    case 'TOGGLE':
      return {
        ...state,
        selectedIds:
          state.entriesIds.length === state.selectedIds.length
            ? []
            : state.entriesIds,
      }
    case 'SELECT.PARENT':
      return {
        ...state,
        selectedIds: pipe(
          state.selectedIds,
          A.filter(id => !action.payload.removed.includes(id)),
          A.concat(action.payload.added),
        ),
      }
    case 'SELECT.CHILD':
      return {
        ...state,
        selectedIds: state.selectedIds.includes(action.payload)
          ? state.selectedIds.filter(
              selectedId => selectedId !== action.payload,
            )
          : state.selectedIds.concat([action.payload]),
      }
    default:
      return assertNever(action)
  }
}

export function useSelection(
  entriesIds: string[] = [],
): [SelectionState, Dispatch<SelectionEvent>] {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    entriesIds,
  })
  return [state, dispatch]
}
