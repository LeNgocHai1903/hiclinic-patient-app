import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import ClinicTab from '../../modules/clinicDetails/ClinicTab';
import LoaddingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import ClinicOverview from '../../modules/clinicDetails/ClinicOverview';
import apiWrapper from '../../api/apiWrapper';
import BookingModal from '../../modules/booking/bookingModal/BookingModal';

import { useCounter } from '../../store/bookingStore';

const ClinicDetails = () => {
  const [state, actions] = useCounter();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalShow, setIsModalShow] = useState(false);
  const [chooseDoctor, setChooseDoctor] = useState();

  const { t } = useTranslation();
  const clinicId = useParams();
  useEffect(() => {
    apiWrapper({
      url: `${process.env.REACT_APP_PATIENT_SERVER_URL_FAKE}/clinic/details/${clinicId.clinicId}`,
      method: 'POST',
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

  console.log(data);

  return (
    <div>
      <>
        {loading ? (
          <div className="loading">
            <LoaddingSpinner />
          </div>
        ) : (
          <div>
            <h1>{t('clinicDetails')}</h1>
            <ClinicOverview data={data} />
            <ClinicTab data={data} onclick={bookingHandler} />
          </div>
        )}
        {isModalShow ? <BookingModal data={chooseDoctor} show={isModalShow} modalClosed={closeModal} /> : null}
      </>
    </div>
  );
};

export default ClinicDetails;
