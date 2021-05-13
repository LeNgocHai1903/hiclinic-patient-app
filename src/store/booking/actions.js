<<<<<<< HEAD
import apiWrapper from '../../api/apiWrapper';
=======
import apiWrapper from "../../api/apiWrapper";
>>>>>>> a23c6826f572ba19c4d09704ebf5734746a5230e

const actions = {
  saveDoctor: (departmentName, doctorName, docId) => ({
    setState,
    getState,
  }) => {
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
          phone: "empty",
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
  makeBooking: (data, onFailed) => async ({ setState, getState }) => {
    try {
      const response = await apiWrapper({
        url: `${process.env.REACT_APP_PATIENT_BOOKING}`,
<<<<<<< HEAD
        method: 'POST',
=======
        method: "POST",
>>>>>>> a23c6826f572ba19c4d09704ebf5734746a5230e
        data,
      });
    } catch (err) {
      onFailed(err);
    }
  },
};

export default actions;