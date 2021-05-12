import apiWrapper from "../../api/apiWrapper";

const actions = {
  setUserId: (value) => ({ setState, getState }) => {
    const currState = getState();
    setState({
      ...currState,
      userId: value,
    });
  },


  signIn: (data, onFailed) => async ({ setState, getState }) => {
    setState({
      accessToken: "",
      userId: "",
      userEmail: "",
      userName: "",
    });
    try {
      const response = await apiWrapper({
        url: `${process.env.REACT_APP_PATIENT_SERVER_URL}/signin`,
        method: "POST",
        data,
      });
      setState({
        accessToken: response.accessToken,
        userId: response.id,
        userEmail: response.email,
        userName: response.fullName,
      });
    } catch (error) {
      onFailed(error);
      setState({
        ...getState(),
        accessToken: "",
        userId: "",
        userEmail: "",
        userName: "",
      });
    }
  },
  myProfile: (data, header, onFailed) => async ({ setState, getState }) => {
    setState({
      userId: "",
      userEmail: "",
      userName: "",
      phone: "",
    });
    try {
      const response = await apiWrapper({
        url: `${process.env.REACT_APP_PATIENT_SERVER_URL}/info`,
        method: "PUT",
        data,
        headers: header,
      });
      setState({
        userEmail: response.email,
        userName: response.fullName,
        phone: response.phone,
        userId: response.id,
      });
    } catch (error) {
      onFailed(error);
      setState({
        ...getState(),
        phone: "",
      });
    }
  },

  signUp: (data, fullName, onFailed) => async ({ setState, getState }) => {
    setState({
      userEmail: "",
      accessToken: "",
      userId: "",
      userName: fullName,
    });
    try {
      const response = await apiWrapper({
        url: `${process.env.REACT_APP_PATIENT_SERVER_URL}/registration`,
        method: "POST",
        data,
      });
      setState({
        userEmail: response.email,
        userName: fullName,
      });
    } catch (error) {
      onFailed(error);
      setState({
        accessToken: "",
        userId: "",
        userName: "",
        userEmail: "",
      });
    }
  },

  confirmOTP: (data) => async ({ setState, getState }) => {
    try {
      const response = await apiWrapper({
        url: `${
          process.env.REACT_APP_PATIENT_SERVER_URL
        }/registration/confirm?token=${data}&email=${getState().userEmail}`,
        method: "GET",
      });
      setState({
        accessToken: response.data.token,
        userId: response.data.id,
      });
    } catch (error) {
      setState({
        accessToken: "",
        userId: "",
        userEmail: getState().userEmail,
        userName: "",
      });
    }
  },

  resendOTP: () => async ({ setState, getState }) => {
    try {
      await apiWrapper({
        url: `${process.env.REACT_APP_PATIENT_SERVER_URL}/sendtoken&email=${
          getState().userEmail
        }`,
        method: "GET",
      });
    } catch (error) {}
  },

  signOut: () => async ({ setState, getState }) => {
    setState({
      accessToken: "",
      userId: "",
      userEmail: "",
      userName: "",
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
      previousLocation: "",
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
