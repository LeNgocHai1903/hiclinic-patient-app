import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './BookingModal.scss';
import 'react-calendar/dist/Calendar.css';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';

import Calendar from 'react-calendar';

import { useCounter } from '../../../store/booking/bookingStore';

import { Formik } from 'formik';
import * as Yup from 'yup';
import apiWrapper from '../../../api/apiWrapper';
import { DOCTORS_DETAIL } from '../../../api/apiUrl';

import Backdrop from '../../../components/backdrop/BackDrop';
import MiniModal from '../../../components/modal/MiniModal';

const Modal = (props) => {
  const [state, actions] = useCounter();
  const [value, onChange] = useState(new Date());
  const [modal, setModal] = useState(false);

  const [doctor, setDoctor] = useState([]);
  const [schedule, setSchedule] = useState([]);

  let timeList = [];

  const { data, doc } = props;

  function convert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }

  useEffect(() => {
    apiWrapper({
      url: `${DOCTORS_DETAIL}/${doc.docId}`,
      method: 'GET',
    }).then((res) => {
      setDoctor(res);
      setSchedule(res.workingSchedule);
    });
  }, [doc.docId]);

  switch (convert(value)) {
    case `${convert(value)}`:
      timeList = schedule.find((item) => item.workingDate === convert(value));
      break;
  }

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

  const initialValues = {
    date: value.toLocaleDateString('en-GB'),
    time: {
      startAt: '',
      endAt: '',
    },
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
                  <img src={doc.docImage} alt={`${doc.docName}`} />
                  <div className="booking-modal-doctor">
                    <h3>{data.clinicName}</h3>
                    <label>
                      <b>{t('doctorName')}:</b> {doctor.fullName}{' '}
                    </label>
                    <label>
                      <b>{t('experience')}: </b> {doctor.experience} {t('years')}
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
                    {!timeList ? (
                      <div>{t('notAvailable')}</div>
                    ) : (
                      <>
                        {timeList.availableShifts.map((item) => (
                          <button
                            className={
                              item.startAt + ' - ' + item.endAt === values.time
                                ? 'time-selected-active'
                                : 'time-selected'
                            }
                            value={item.startAt + ' - ' + item.endAt}
                            name="time"
                            onClick={handleChange}
                          >
                            {item.startAt} - {item.endAt}
                          </button>
                        ))}
                      </>
                    )}
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
