import { createStore, createHook, createContainer } from 'react-sweet-state';

import actions from './actions';

export const AuthenticationStoreName = 'AuthStore';

export const initialState = {
  errorMessage: '',
  accessToken: '',
  userId: '',
  userName: '',
  previousLocation: '',
  OTP: '',
  userEmail: '',
};

const AuthenticationStore = createStore({ initialState, actions, name: AuthenticationStoreName });
export const AuthenticationStoreKey = `${AuthenticationStore.key.join('__')}@__global__`;

export const AuthenticationContainer = createContainer(AuthenticationStore, {
  onInit: () => ({ setState }, { initialState }) => {
    setState({ ...initialState });
  },
});

export const useAuth = createHook(AuthenticationStore);
