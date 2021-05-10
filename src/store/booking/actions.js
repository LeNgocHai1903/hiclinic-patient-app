import axios from 'axios';

const actions = {
  saveClinicAndDoctor: (clinicName, departmentName, doctorName) => ({ setState, getState }) => {
    setState({
      dataBooking: {
        ...getState().dataBooking,
        doctor: {
          ...getState().dataBooking.doctor,
          fullName: doctorName,
          departmentName,
        },
        clinic: {
          ...getState().dataBooking.clinic,
          clinicName,
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
  savePatientData: (userName, userEmail) => ({ setState, getState }) => {
    setState({
      dataBooking: {
        ...getState().dataBooking,
        patient: {
          ...getState().dataBooking.patient,
          email: userEmail,
          fullName: userName,
        },
      },
    });
  },
  makeBooking: (data) => async ({ setState, getState }) => {
    const response = await axios.post('https://test-depoy-ms-booking.herokuapp.com/booking/patient/booking', data);
  },
};

export default actions;
