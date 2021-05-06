import axios from 'axios';

const actions = {
  setUserId: (value) => ({ setState, getState }) => {
    const currState = getState();
    setState({
      ...currState,
      userId: value,
    });
  },

  //TODO: Handler error code from BE
  signIn: (data, email) => async ({ setState, getState }) => {
    setState({ accessToken: '', userId: '', userEmail: email, errorMessage: '' });
    try {
      const response = await axios.post(`${process.env.REACT_APP_SIGNIN_FAKE}`, data);
      setState({
        accessToken: response.data.accessToken,
        userEmail: email,
      });
    } catch (error) {
      setState({ accessToken: '', userId: '', userName: '', errorMessage: error.response.data.errorMessage });
    }
  },

  signUp: (data) => async ({ setState, getState }) => {
    setState({ userEmail: '', accessToken: '', userId: '' });
    try {
      const response = await axios.post(`${process.env.REACT_APP_PATIENT_SIGNUP}`, data);

      setState({
        userEmail: response.data.email,
      });
    } catch (error) {
      setState({ accessToken: '', userId: '', userName: '' });
    }
  },

  confirmOTP: (data) => async ({ setState, getState }) => {
    try {
      console.log(getState().userEmail);
      const response = await axios.get(
        `${process.env.REACT_APP_PATIENT_SIGNUP}/confirm?token=${data}&email=${getState().userEmail}`,
      );
      setState({
        accessToken: response.data.token,
        userId: response.data.id,
      });
    } catch (error) {
      setState({ accessToken: '', userId: '', userEmail: '' });
    }
  },

  signOut: () => async ({ setState, getState }) => {
    setState({ accessToken: '', userId: '', userEmail: '' });
  },

  savePreviousLocation: (location) => ({ getState, setState }) => {
    setState({
      previousLocation: location,
    });
  },

  deletePreviousLocation: () => ({ getState, setState }) => {
    setState({
      previousLocation: '',
    });
  },
};

export default actions;
