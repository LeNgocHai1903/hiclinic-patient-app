import { createStore, createHook } from 'react-sweet-state';

const Store = createStore({
  initialState: {
    doctorName: '',
    clinicName: '',
    bookingDate: '',
    bookingTime: '',
  },

  actions: {
    saveClinicAndDoctor: (clinicName, doctorName) => ({ setState, getState }) => {
      setState({
        clinicName,
        doctorName,
      });
    },
    saveDateAndTime: (bookingDate, bookingTime) => ({ setState, getState }) => {
      setState({
        bookingDate,
        bookingTime,
      });
    },
  },

  name: 'booking store',
});

export const useCounter = createHook(Store);
