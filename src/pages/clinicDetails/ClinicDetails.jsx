import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useParams } from 'react-router-dom';

import ClinicTab from '../../modules/clinicDetails/ClinicTab';
import ClinicOverview from '../../modules/clinicDetails/ClinicOverview';
import apiWrapper from '../../api/apiWrapper';
import BookingModal from '../../modules/booking/bookingModal/BookingModal';
import { useCounter } from '../../store/booking/bookingStore';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';

const ClinicDetails = () => {
  const [state, actions] = useCounter();

  const [data, setData] = useState({});
  const [overviewData, setOverviewData] = useState({});
  const [loading, setLoading] = useState(true);
  const [overviewLoading, setOverviewLoading] = useState(true);
  const [isModalShow, setIsModalShow] = useState(false);
  const [chooseDoctor, setChooseDoctor] = useState();

  const { t } = useTranslation();
  const clinicId = useParams();

  useEffect(() => {
    apiWrapper({
      url: `${process.env.REACT_APP_PATIENT_CLINIC_SERVER}/${clinicId.clinicId}`,
      method: 'GET',
    }).then((res) => {
      setOverviewData(res);
      setOverviewLoading(false);
    });
  }, [clinicId.clinicId]);

  useEffect(() => {
    apiWrapper({
      url: `${process.env.REACT_APP_PATIENT_CLINIC_DETAILS_SERVER}/${clinicId.clinicId}`,
      method: 'GET',
    }).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [clinicId.clinicId]);

  const closeModal = () => {
    setIsModalShow(!isModalShow);
  };

  const bookingHandler = (doctorName) => {
    setChooseDoctor(data.doctors.find((i) => i.fullName === doctorName));
    setIsModalShow(true);
    actions.saveClinicAndDoctor(data.clinicName, doctorName);
  };
  return (
    <div>
      {loading || overviewLoading ? (
        <div className="loading">
          <LoadingSpinner />
        </div>
      ) : (
        <div>
          <ClinicOverview data={overviewData} />
          <ClinicTab data={data} onclick={bookingHandler} />
        </div>
      )}
      {isModalShow ? <BookingModal data={data} show={isModalShow} modalClosed={closeModal} /> : null}
    </div>
  );
};

export default ClinicDetails;