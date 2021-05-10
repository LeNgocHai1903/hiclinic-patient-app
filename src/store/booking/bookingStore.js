import { createStore, createHook } from 'react-sweet-state';
import actions from './actions';

const Store = createStore({
  initialState: {
    noti: [],
    dataBooking: {
      doctor: {
        id: '',
        fullName: '',
        experience: '',
        departmentName: '',
        workingSchedule: [],
      },
      patient: {
        id: '',
        fullName: '',
        email: '',
      },
      clinic: {
        id: '',
        clinicName: '',
        phone: '',
        address: '',
      },
      bookingDate: '',
      bookingFrom: '',
      cost: 1,
    },
  },
  actions,
  name: 'booking store',
});

export const useCounter = createHook(Store);
