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
      const response = await axios.post(`${process.env.REACT_APP_SIGNIN_FAKE}`,data);
      setState({
        accessToken: response.data.accessToken,
        // userId: response.data.email,
        // userName: response.data.userName
      });
    } catch (error) {
      setState({ accessToken: '', userId: '',userImage: '', userName:''});
    }
  },

  signOut: () => async ({ setState, getState }) => {
    setState({ accessToken: '', userId: '',userImage: '', userName:'' });
  },


  savePreviousLocation : (location) => ({getState, setState}) => {
      setState({ 
          previousLocation: location,
      })
  },

  deletePreviousLocation : () => ({getState, setState}) => {
    setState({ 
        previousLocation: "",
    })
}
};

export default actions;