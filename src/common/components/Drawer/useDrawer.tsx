import { useLocalStorage } from 'common/hooks/useLocalStorage';
import { useWindowSize } from 'common/hooks/useWindowSize';
import React, { useEffect } from 'react';
import { isSmallScreen } from './utils';

type DrawerMode = 'permanent' | 'temporary';

type State = {
  mode: DrawerMode;
  open: boolean;
};

type Action =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'SET_TEMPORARY_MODE' }
  | { type: 'SET_PERMANENT_MODE' };

function reducer(state: State, event: Action): State {
  switch (event.type) {
    case 'OPEN':
      return { ...state, open: true };
    case 'CLOSE':
      return { ...state, open: false };
    case 'SET_TEMPORARY_MODE':
      return { ...state, mode: 'temporary' };
    case 'SET_PERMANENT_MODE':
      return {
        ...state,
        mode: 'permanent',
      };
    default:
      return state;
  }
}

const initialState: State = {
  mode: 'temporary',
  open: false,
};

export function useDrawer() {
  const [preferExpandedDrawer, setPreferExpandedDrawer] = useLocalStorage(
    'preferExpandedDrawer',
    true,
  );
  const { width } = useWindowSize();
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    if (!width) return;
    if (state.mode !== 'temporary' && isSmallScreen(width)) {
      dispatch({ type: 'SET_TEMPORARY_MODE' });
      dispatch({ type: 'CLOSE' });
    }
    if (state.mode !== 'permanent' && !isSmallScreen(width)) {
      dispatch({ type: 'SET_PERMANENT_MODE' });
      preferExpandedDrawer
        ? dispatch({ type: 'OPEN' })
        : dispatch({ type: 'CLOSE' });
    }
  }, [preferExpandedDrawer, state.mode, width]);

  const toggle = () => {
    if (state.mode === 'permanent') {
      setPreferExpandedDrawer(!state.open);
    }
    state.open ? dispatch({ type: 'CLOSE' }) : dispatch({ type: 'OPEN' });
  };

  const close = () => {
    return dispatch({ type: 'CLOSE' });
  };

  return [state, { toggle, close }] as const;
}
