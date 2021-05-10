import axios from 'axios';

const actions = {
  saveDoctor: (departmentName, doctorName, docId) => ({ setState, getState }) => {
    setState({
      dataBooking: {
        ...getState().dataBooking,
        doctor: {
          ...getState().dataBooking.doctor,
          id: docId,
          fullName: doctorName,
          departmentName,
        },
      },
    });
  },

  saveDoctorSchedule: (schedule, experience) => ({ setState, getState }) => {
    setState({
      dataBooking: {
        ...getState().dataBooking,
        doctor: {
          ...getState().dataBooking.doctor,
          experience,
          workingSchedule: schedule,
        },
      },
    });
  },

  saveClinic: (data) => ({ setState, getState }) => {
    setState({
      dataBooking: {
        ...getState().dataBooking,
        clinic: {
          id: data.id,
          clinicName: data.clinicName,
          phone: 'empty',
          address: data.address,
        },
      },
    });
  },
  saveDateAndTime: (bookingDate, bookingTime) => ({ setState, getState }) => {
    setState({
      dataBooking: {
        ...getState().dataBooking,
        bookingDate: bookingDate,
        bookingFrom: bookingTime,
      },
    });
  },
  savePatientData: (id, userName, userEmail) => ({ setState, getState }) => {
    setState({
      dataBooking: {
        ...getState().dataBooking,
        patient: {
          id,
          email: userEmail,
          fullName: userName,
        },
      },
    });
  },
  makeBooking: (data) => async ({ setState, getState }) => {
    const response = await axios.post('https://hiclinic-ms-api-gateway.herokuapp.com/booking/patient/booking', data);
  },
};

export default actions;
