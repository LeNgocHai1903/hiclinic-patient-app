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
  signIn: (data) => async ({ setState, getState }) => {
    setState({
      accessToken: '',
      userId: '',
      userEmail: '',
      errorMessage: '',
      userName: '',
    });
    try {
      const response = await axios.post(`${process.env.REACT_APP_PATIENT_SERVER_URL}/signin`, data);

      setState({
        accessToken: response.data.accessToken,
        userId: response.data.id,
        userEmail: response.data.email,
        userName: response.data.fullName,
      });
    } catch (error) {
      if (error.response.data.status === 401) {
        setState({
          accessToken: '',
          userId: '',
          userEmail: '',
          userName: '',
          errorMessage: 'Email or password is incorrect',
        });
      } else {
        setState({
          accessToken: '',
          userId: '',
          userEmail: '',
          userName: '',
          errorMessage: error.response.data.errorMessage,
        });
      }
    }
  },
  myProfile: (data, header) => async ({ setState, getState }) => {
    setState({
      userId: '',
      userEmail: '',
      errorMessage: '',
      userName: '',
      phone: '',
      errorMessage: '',
    });
    try {
      console.log('get into the function');
      const response = await axios.put(`${process.env.REACT_APP_PATIENT_SERVER_URL}/info`, data, {
        headers: header,
      });
      setState({
        userEmail: response.data.email,
        userName: response.data.fullName,
        phone: response.data.phone,
        userId: response.data.id,
      });
    } catch (error) {
      if (error.response.data.status === 401) {
        setState({
          userId: '',
          userEmail: '',
          userName: '',
          phone: '',
          errorMessage: 'Unauthorized',
        });
      } else {
        setState({
          userId: '',
          userEmail: '',
          userName: '',
          phone: '',
          errorMessage: error.response.data.errorMessage,
        });
      }
    }
  },

  signUp: (data, fullName) => async ({ setState, getState }) => {
    setState({
      userEmail: '',
      accessToken: '',
      userId: '',
      userName: fullName,
    });
    try {
      const response = await axios.post(`${process.env.REACT_APP_PATIENT_SERVER_URL}/registration`, data);
      setState({
        userEmail: response.data.email,
        userName: fullName,
      });
    } catch (error) {
      setState({
        accessToken: '',
        userId: '',
        userName: '',
        userEmail: '',
        errorMessage: error.response.data.errorMessage,
      });
    }
  },

  confirmOTP: (data) => async ({ setState, getState }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PATIENT_SERVER_URL}/registration/confirm?token=${data}&email=${getState().userEmail}`,
      );
      setState({
        accessToken: response.data.token,
        userId: response.data.id,
      });
    } catch (error) {
      setState({
        accessToken: '',
        userId: '',
        userEmail: getState().userEmail,
        userName: '',
        errorMessage: error.response.data.errorMessage,
      });
    }
  },

  resendOTP: () => async ({ setState, getState }) => {
    setState({
      errorMessage: '',
    });
    try {
      await axios.get(`${process.env.REACT_APP_PATIENT_SERVER_URL}/sendtoken&email=${getState().userEmail}`);
    } catch (error) {}
  },

  signOut: () => async ({ setState, getState }) => {
    setState({
      accessToken: '',
      userId: '',
      userEmail: '',
      userName: '',
      errorMessage: '',
      noti: [],
    });
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

  clearErrorMessage: () => async ({ setState, getState }) => {
    setState({
      errorMessage: '',
    });
  },

  saveNoti: (data) => ({ setState, getState }) => {
    const currNoti = [...getState().noti];
    setState({
      ...getState(),
      noti: [data, ...currNoti],
    });
  },
  removeNoti: () => ({ setState, getState }) => {
    setState({
      ...getState(),
      noti: getState().noti,
    });
  },
};

export default actions;
