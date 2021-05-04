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
    setState({ accessToken: '', userId: '',userImage: '', userName:'' });
    try {
      const response = await axios.post(`http://localhost:5000/signin`,data);
      setState({
        accessToken: response.data.accessToken,
        userId: response.data.email,
        userImage: response.data.image,
        userName: response.data.userName
      });
    } catch (error) {
      setState({ accessToken: '', userId: '',userImage: '', userName:''});
    }
  },

  signOut: () => async ({ setState, getState }) => {
    setState({ accessToken: '', userId: '',userImage: '', userName:'' });
  },
};

export default actions;