import { useLocalStorage } from 'common/hooks/useLocalStorage';
import { useWindowSize } from 'common/hooks/useWindowSize';
import { assertNever } from 'common/utils/assert';
import React, { useEffect } from 'react';
import { isSmallScreen } from './utils';

export type DrawerType = 'permanent' | 'temporary';

type State = {
  type: DrawerType | undefined;
  open: boolean;
};

type Action = 'OPEN' | 'CLOSE' | 'SET_TEMPORARY_MODE' | 'SET_PERMANENT_MODE';

function reducer(state: State, event: Action): State {
  switch (event) {
    case 'OPEN':
      return { ...state, open: true };
    case 'CLOSE':
      return { ...state, open: false };
    case 'SET_TEMPORARY_MODE':
      return { ...state, type: 'temporary' };
    case 'SET_PERMANENT_MODE':
      return {
        ...state,
        type: 'permanent',
      };
    default:
      return assertNever(event);
  }
}

const initialState: State = {
  type: undefined,
  open: false,
};

export function useDrawer() {
  const [preferExpandedDrawer, setPreferExpandedDrawer] = useLocalStorage(
    'preferExpandedDrawer',
    true,
  );
  const { width } = useWindowSize();
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const isTemporaryMode = state.type === 'temporary';
  const isPermanentMode = state.type === 'permanent';

  useEffect(() => {
    if (!width) return;
    if (!isTemporaryMode && isSmallScreen(width)) {
      dispatch('SET_TEMPORARY_MODE');
      dispatch('CLOSE');
    }
    if (!isPermanentMode && !isSmallScreen(width)) {
      dispatch('SET_PERMANENT_MODE');
      preferExpandedDrawer ? dispatch('OPEN') : dispatch('CLOSE');
    }
  }, [isPermanentMode, isTemporaryMode, preferExpandedDrawer, width]);

  const toggle = () => {
    state.open ? dispatch('CLOSE') : dispatch('OPEN');
    if (isPermanentMode) {
      setPreferExpandedDrawer(!state.open);
    }
  };

  const close = () => {
    dispatch('CLOSE');
  };

  return [state, { toggle, close }] as const;
}
