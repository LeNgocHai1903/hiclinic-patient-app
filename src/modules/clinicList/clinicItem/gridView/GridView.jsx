import './GridView.scss';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const GridClinicItem = (props) => {
  const { data } = props;

  const { t } = useTranslation();

  return (

    <div className={`col-lg-4 clinic-items`}>
      <Link to={`/clinics/detail/${data.id}`} className="clinic-item">
        <div className="clinic-item-img">
          <img alt="clinic-img" src={data.image} />
        </div>
        <div className="clinic-item-content">
          <div className="clinic-item-content-header">
            {' '}
            <div className="clinic-name">
              <b data-test-name="name">{data.clinicName}</b>
            </div>
            <div data-test-time="time">
              <b>{t('workingTime')}:</b> {data.openAt} - {data.closeAt}
            </div>
            <div className="clinic-address" data-test-address="address">
              <b>{t('address')}:</b> {data.address}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GridClinicItem;
