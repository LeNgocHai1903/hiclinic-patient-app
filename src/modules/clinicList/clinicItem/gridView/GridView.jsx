import './GridView.scss';

import { useHistory } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

const GridClinicItem = (props) => {
  const history = useHistory();
  const { data } = props;

  const { t } = useTranslation();

  function changeSiteHandler(e) {
    e.preventDefault();
    history.push(`/clinics/detail/${data.id}`);
  }

  return (
    <div className={`col-lg-4 clinic-items`} onClick={changeSiteHandler}>
      <div className="clinic-item">
        <div className="clinic-item-img">
          <img alt="clinic-img" src={data.image} />
        </div>
        <div className="clinic-item-content">
          <div className="clinic-item-content-header">
            {' '}
            <div className="clinic-name">
              <b data-test-name="name">{data.clinicName}</b>
              <span>
                <AiFillStar style={{ color: 'yellow' }} />
                <AiFillStar style={{ color: 'yellow' }} />
                <AiFillStar style={{ color: 'yellow' }} />
                <AiFillStar />
                <AiFillStar />
              </span>
            </div>
            <div data-test-time="time">
              <b>{t('workingTime')}:</b> {data.openAt} - {data.closeAt}
            </div>
            <div className="clinic-address" data-test-address="address">
              <b>{t('address')}:</b> {data.address}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridClinicItem;
