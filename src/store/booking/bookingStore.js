import { createStore, createHook } from 'react-sweet-state';
import actions from './actions';

const Store = createStore({
  initialState: {
    noti: [],
    dataBooking: {
      doctor: {
        id: 'Not use',
        fullName: '',
        experience: 'Not use',
        departmentName: '',
        workingSchedule: [],
      },
      patient: {
        id: 'Not use',
        fullName: '',
        email: '',
      },
      clinic: {
        id: 'Not use',
        clinicName: '',
        phone: 'Not use',
        address: 'Not use',
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
