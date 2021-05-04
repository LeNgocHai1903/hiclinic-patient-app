import axios from "axios";
const signIn = ({ email, password }) => {
  return axios.post(`${process.env.REACT_APP_PATIENT_SERVER_URL_FAKE}/signin`, {
    email,
    password,
  });
};

const UserService = {
  signIn,
};

export default UserService;
