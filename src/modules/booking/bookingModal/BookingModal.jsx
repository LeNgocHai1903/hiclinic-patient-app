import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './BookingModal.scss';
import 'react-calendar/dist/Calendar.css';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';

import Calendar from 'react-calendar';

import { useCounter } from '../../../store/booking/bookingStore';

import { Formik } from 'formik';
import * as Yup from 'yup';

import Backdrop from '../../../components/backdrop/BackDrop';
import MiniModal from '../../../components/modal/MiniModal';
import testImg from '../../../asset/img/clinic-grid-example.jpeg';

const Modal = (props) => {
  const [state, actions] = useCounter();
  const [value, onChange] = useState(new Date());
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  let date = new Date(); // Now
  date.setDate(date.getDate() + 30);

  const confirmHandler = (time) => {
    setModal(!modal);
    actions.saveDateAndTime(value.toLocaleDateString('en-GB'), time);
  };

  const { t } = useTranslation();

  const timeList = [
    { time: '9AM- 12AM', id: '1' },
    { time: '12AM- 18AM', id: '2' },
    { time: '18AM- 21PM', id: '3' },
  ];

  const initialValues = {
    date: value.toLocaleDateString('en-GB'),
    time: '',
  };

  const validateSchema = Yup.object().shape({
    date: Yup.string().required('Please pick a date before make a book'),

    time: Yup.string().required('Please choose one timebox'),
  });

  const submitForm = (values, actions) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    });
  };

  console.log(props);
  return (
    <>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <Formik initialValues={initialValues} validationSchema={validateSchema} onSubmit={submitForm}>
        {(formik) => {
          const { errors, isValid, dirty, values, handleChange } = formik;
          return (
            <div className="booking-modal">
              <div className="booking-modal-title">{t('booking')}</div>
              <div className="booking-modal-content">
                <div className="booking-modal-infomation">
                  <img src={props.doc.docImage} />
                  <div className="booking-modal-doctor">
                    <h3>{props.data.clinicName}</h3>
                    <label>
                      <b>{t('doctorName')}:</b> {props.doc.docName}{' '}
                    </label>
                  </div>
                </div>
                <div className="booking-modal-date">
                  <label type="date" id="PopoverLegacy" className="booking-modal-calendar">
                    {initialValues.date}
                    <FaRegCalendarAlt />
                  </label>
                  <UncontrolledPopover trigger="legacy" placement="right" target="PopoverLegacy">
                    <PopoverHeader>{t('pickDate')}</PopoverHeader>
                    <PopoverBody>
                      <Calendar minDate={new Date()} maxDate={date} onChange={onChange} value={value} name="date" />
                    </PopoverBody>
                  </UncontrolledPopover>
                </div>
                <div className="booking-modal-time">
                  <div className="booking-modal-time-list">
                    {timeList.map((item) => (
                      <button
                        key={item.id}
                        className={item.time === values.time ? 'time-selected-active' : 'time-selected'}
                        value={item.time}
                        id={item.id}
                        name="time"
                        onClick={handleChange}
                      >
                        {item.time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="booking-modal-btn">
                <button className="btn btn-secondary" onClick={props.modalClosed}>
                  {t('cancle')}
                </button>
                <button
                  disabled={!dirty || !errors || !isValid}
                  className="btn btn-primary"
                  onClick={() => confirmHandler(values.time)}
                >
                  {t('confirm')}
                </button>
              </div>
            </div>
          );
        }}
      </Formik>
      <MiniModal toggle={toggle} modal={modal}>
        <h3>
          {t('clinicName')} : {state.clinicName}
        </h3>
        <label>
          {t('doctorName')}: {state.doctorName}
        </label>
        <label>
          {t('date')}: {state.bookingDate}
        </label>
        <label>
          {t('time')}: {state.bookingTime}
        </label>
      </MiniModal>
    </>
  );
};

export default Modal;
