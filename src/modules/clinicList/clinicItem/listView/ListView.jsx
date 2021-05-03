import './ListView.scss';

import { useHistory } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

const ListClinicItem = (props) => {
  const history = useHistory();
  const { data } = props;

  const { t } = useTranslation();

  function changeSiteHandler(e) {
    e.preventDefault();
    history.push(`/clinics/detail/${data.id}`);
  }

  return (
    <div className="clinic-item-list-row" onClick={changeSiteHandler}>
      <div className="list-group clinic-item-list">
        <div className="clinic-item-list-items ">
          <img alt="clinic-img" src={data.clinicImage} className="clinic-item-list-img" />
          <div className="justify-content-between  clinic-item-list-content">
            <div className="d-flex justify-content-between w-300 ">
              <h5 className="mb-1">{data.name}</h5>
              <small>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
              </small>
            </div>
            <label className="mb-1" data-test-time="time">
              <b>{t('workingTime')}:</b> {data.workingTime}
            </label>
            <p className="mb-1" data-test-address="address">
              <b>{t('address')}:</b> {data.address}
            </p>
            <small data-test-description="description">{data.description}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListClinicItem;
