import './ListView.scss';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

import * as routeType from '../../../../constant/route/route';

const ListClinicItem = (props) => {
  const { data } = props;

  const { t } = useTranslation();
  const moveToDetail = (e) => {
    e.preventDefault();
    props.history.push(`${routeType.ROUTE_CLINIC_DETAIL_BUILD(props.data.id)}`);
  };
  return (
    <div className="clinic-item-list-row">
      <div className="list-group clinic-item-list">
        <Link className="clinic-item-list-items " onClick={moveToDetail}>
          <div className="clinic-item-list-items ">
            <img alt="clinic-img" src={data.clinicImage} className="clinic-item-list-img" />
            <div className="justify-content-between  clinic-item-list-content">
              <div className="d-flex justify-content-between w-300 ">
                <h5 className="mb-1">{data.clinicName}</h5>
              </div>
              <label className="mb-1" data-test-time="time">
                <b>{t('workingTime')}:</b> {data.openAt} - {data.closeAt}
              </label>
              <p className="mb-1" data-test-address="address">
                <b>{t('address')}:</b> {data.address}
              </p>
              <div data-test-description="description" className="clinic-item-description">
                {data.description}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ListClinicItem;
