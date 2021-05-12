import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./BookingModal.scss";
import "react-calendar/dist/Calendar.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import {
  MdPermContactCalendar,
  MdDateRange,
  MdAccessTime,
} from "react-icons/md";
import {
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
  Modal,
  ModalBody,
} from "reactstrap";

import Calendar from "react-calendar";

import { useCounter } from "../../../store/booking/bookingStore";
import { useAuth } from "../../../store/authenticate/store";

import { Formik } from "formik";
import * as Yup from "yup";
import apiWrapper from "../../../api/apiWrapper";
import { DOCTORS_DETAIL } from "../../../api/apiUrl";

import Backdrop from "../../../components/backdrop/BackDrop";
import MiniModal from "../../../components/modal/MiniModal";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";

const BookingModal = (props) => {
  const [state, actions] = useCounter();
  const [authState, authActions] = useAuth();
  const [value, onChange] = useState(new Date());
  const [modal, setModal] = useState(false);
  const [successBookingModal, setSuccessBookingModal] = useState(false);
  const [err, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [doctor, setDoctor] = useState([]);
  const [schedule, setSchedule] = useState([]);

  let timeLists = [];
  let listTimeAvailable = [];

  const { data, doc } = props;

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  useEffect(() => {
    apiWrapper({
      url: `${DOCTORS_DETAIL}/${doc.docId}`,
      method: "GET",
    })
      .then((res) => {
        setDoctor(res);
        setSchedule(res.workingSchedule);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [doc.docId]);

  const handleFailed = (error) => {
    setError(
      error.data.message || error.data.errorMessage || error.message || error
    );
  };

  timeLists = schedule.find((item) => item.workingDate === convert(value));
  if (timeLists) {
    if (!timeLists.availableShifts) {
      listTimeAvailable = [];
    } else {
      var i;
      var j;
      for (j = 0; j < timeLists.availableShifts.length; j++) {
        var timeEndConverted = Number(
          timeLists.availableShifts[j].endAt.split(":", 1)
        );
        var timeStartConverted = Number(
          timeLists.availableShifts[j].startAt.split(":", 1)
        );
        var shiftAmount = timeEndConverted - timeStartConverted;
        for (i = 0; i < shiftAmount; i++) {
          listTimeAvailable.push({
            startAt: (timeStartConverted + i).toString() + ":00",
            endAt: (timeStartConverted + i + 1).toString() + ":00",
          });
        }
      }
    }
  } else {
  }

  const toggle = () => {
    setModal(!modal);
  };

  let date = new Date(); // Now
  date.setDate(date.getDate() + 30);

  const confirmHandler = (time) => {
    setModal(!modal);
    actions.saveDoctorSchedule(schedule, doctor.experience);
    actions.saveDateAndTime(value.toLocaleDateString("en-CA"), time);
    actions.savePatientData(
      authState.userId,
      authState.userName,
      authState.userEmail
    );
  };

  const confirmBooking = async () => {
    await actions.makeBooking(state.dataBooking, handleFailed);
    setSuccessBookingModal(true);
    setModal(!modal);
  };

  const { t } = useTranslation();

  const initialValues = {
    date: value.toLocaleDateString("en-GB"),
    time: {
      startAt: "",
      endAt: "",
    },
  };

  const validateSchema = Yup.object().shape({
    date: Yup.string().required("Please pick a date before make a book"),
    time: Yup.string().required("Please choose one timebox"),
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
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={submitForm}
      >
        {(formik) => {
          const { errors, isValid, dirty, values, handleChange } = formik;
          return (
            <div className="booking-modal">
              <div className="booking-modal-title">{t("booking")}</div>
              <div className="booking-modal-content">
                <div className="booking-modal-infomation">
                  <img src={doc.docImage} alt={`${doc.docName}`} />
                  <div className="booking-modal-doctor">
                    <h3>{data.clinicName}</h3>
                    <label>
                      <b>{t("doctorName")}:</b> {doctor.fullName}{" "}
                    </label>
                    <label>
                      <b>{t("experience")}: </b> {doctor.experience}{" "}
                      {t("years")}
                    </label>
                  </div>
                </div>
                <div className="booking-modal-date">
                  <label
                    type="date"
                    id="PopoverLegacy"
                    className="booking-modal-calendar"
                  >
                    {initialValues.date}
                    <FaRegCalendarAlt />
                  </label>
                  <UncontrolledPopover
                    trigger="legacy"
                    placement="right"
                    target="PopoverLegacy"
                  >
                    <PopoverHeader>{t("pickDate")}</PopoverHeader>
                    <PopoverBody>
                      <Calendar
                        minDate={new Date()}
                        maxDate={date}
                        onChange={onChange}
                        value={value}
                        name="date"
                      />
                    </PopoverBody>
                  </UncontrolledPopover>
                </div>
                <div className="booking-modal-time">
                  <div className="booking-modal-time-list">
                    {isLoading ? (
                      <LoadingSpinner />
                    ) : (
                      <>
                        {listTimeAvailable.length === 0 ? (
                          <div className="booking-no-result">
                            {t("notAvailable")}
                          </div>
                        ) : (
                          <>
                            {listTimeAvailable.map((item) => (
                              <button
                                className={
                                  item.startAt === values.time
                                    ? "time-selected-active"
                                    : "time-selected"
                                }
                                value={item.startAt}
                                name="time"
                                onClick={handleChange}
                              >
                                {item.startAt} - {item.endAt}
                              </button>
                            ))}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="booking-modal-btn">
                <button
                  className="btn btn-secondary"
                  onClick={props.modalClosed}
                >
                  {t("cancle")}
                </button>
                <button
                  disabled={!dirty || !errors || !isValid}
                  className="btn btn-primary"
                  onClick={() => confirmHandler(values.time)}
                >
                  {t("confirm")}
                </button>
              </div>
            </div>
          );
        }}
      </Formik>
      {modal && (
        <MiniModal
          toggle={toggle}
          modal={modal}
          confirmBooking={confirmBooking}
        >
          <h3>{state.dataBooking.clinic.clinicName}</h3>

          <label>
            <MdPermContactCalendar /> {t("doctorName")}:{" "}
            {state.dataBooking.doctor.fullName}
          </label>
          <label>
            <MdDateRange /> {t("date")}: {state.dataBooking.bookingDate}
          </label>
          <label>
            <MdAccessTime /> {t("time")}: {state.dataBooking.bookingFrom} -{" "}
            {(
              parseInt(state.dataBooking.bookingFrom.slice(0, -3)) + 1
            ).toString() + ":00"}
          </label>
          {err && <div>{t('somethingwentwrong')}</div>}
        </MiniModal>
      )}
      {successBookingModal && (
        <>
          <div>
            <Modal isOpen={successBookingModal}>
              <ModalBody>
                <div className="mini-modal">{t("successBookingMessage")}</div>
              </ModalBody>
            </Modal>
          </div>
          {setTimeout(() => {
            setSuccessBookingModal(false);
            props.modalClosed();
          }, 2000)}
        </>
      )}
    </>
  );
};

export default BookingModal;
