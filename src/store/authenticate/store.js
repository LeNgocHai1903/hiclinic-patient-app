import { createStore, createHook, createContainer } from 'react-sweet-state';

import actions from './actions';

export const AuthenticationStoreName = 'AuthStore';

export const initialState = {
  accessToken: '',
  userId: '',
  userImage:'', 
  userName: '',
  previousLocation : ''
};


const AuthenticationStore = createStore({ initialState, actions, name: AuthenticationStoreName });
export const AuthenticationStoreKey = `${AuthenticationStore.key.join('__')}@__global__`;

export const AuthenticationContainer = createContainer(AuthenticationStore, {
  onInit: () => ({ setState }, { initialState }) => {
    setState({ ...initialState });
  },
});

export const useAuth = createHook(AuthenticationStore);