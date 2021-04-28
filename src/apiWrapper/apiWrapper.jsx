import axios from 'axios';
import { BASE_API_ENDPOINT } from '../constant/apiUrl/apiUrl';
const request = axios.create({
  baseURL: `${process.env.REACT_APP_PATIENT_SERVER_URL_FAKE}`,
});

const get = async (url) => {
  const requestOptions = {
    method: 'GET',
  };
  return await request({ url, requestOptions }).then(handleResponse);
};

const post = async (url, body) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  return await request({ url, requestOptions }).then(handleResponse);
};

const put = async (url, body) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  return await request({ url, requestOptions }).then(handleResponse);
};

// prefixed with underscored because delete is a reserved word in javascript
const _delete = async (url) => {
  const requestOptions = {
    method: 'DELETE',
  };
  return await request({ url, requestOptions }).then(handleResponse);
};

// helper functions

function handleResponse(response) {
  if (response.statusText !== 'OK') {
    // const error = (response.data && response.data.message) || response.statusText;
    return Promise.reject(response);
  } else return response.data;
  // return response.text().then((text) => {
  //   const data = text && JSON.parse(text);
  //   console.log( JSON.parse(text) )
  //   if (!response.ok) {
  //     const error = (data && data.message) || response.statusText;
  //     return Promise.reject(error);
  //   }

  //   return data;
  // });
}

export const apiWrapper = {
  get,
  post,
  put,
  delete: _delete,
};
