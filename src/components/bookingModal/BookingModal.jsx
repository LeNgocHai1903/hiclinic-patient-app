import { useState } from 'react';
import Modal from '../../modules/booking/bookingModal/BookingModal';
import { useCounter } from '../../store/booking/bookingStore';

const BookingModal = (props) => {
  const [state, actions] = useCounter();

  const doctor = {
    id: 1,
    fullName: 'Nguyen Anh Tuan',
    experience: '5 years',
    phone: '0984127839',
    license: 'asdasdasd',
    departmentName: 'Răng-Hàm-Mặt',
  };

  const [isModalShow, setIsModalShow] = useState(false);

  const closeModal = () => {
    setIsModalShow(!isModalShow);
  };

  const bookingHandler = () => {
    setIsModalShow(true);
    actions.saveClinicAndDoctor(doctor.fullName, doctor.experience);
  };

  return (
    <>
      <button onClick={bookingHandler}>Make booking</button>
      {isModalShow ? <Modal data={doctor} show={isModalShow} modalClosed={closeModal} /> : null}
    </>
  );
};

export default BookingModal;
