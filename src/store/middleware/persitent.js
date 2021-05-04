import { defaults } from 'react-sweet-state';

import { AuthenticationStoreName } from '../authenticate/authenticate';

const WHITE_LIST = [AuthenticationStoreName];

export const persistent = (storeState) => (next) => (fn) => {
  const result = next(fn);
  const { key } = storeState;
  const isWhiteList = WHITE_LIST.filter((store) => key.includes(store));
  if (isWhiteList.length > 0) {
    const state = storeState.getState();
    localStorage.setItem(storeState.key, JSON.stringify(state));
  }

  return result;
};

defaults.middlewares.add(persistent);