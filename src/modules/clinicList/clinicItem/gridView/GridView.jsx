import './GridView.scss';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import {FaRegClock} from 'react-icons/fa';
import {GrLocation} from 'react-icons/gr'

import { Link } from 'react-router-dom';

import * as routeType from '../../../../constant/route/route';

const GridClinicItem = (props) => {
  const { data } = props;
  const history = useHistory();

  const { t } = useTranslation();
  const moveToDetail = (e) => {
    e.preventDefault();
    history.push(`${routeType.ROUTE_CLINIC_DETAIL_BUILD(props.data.id)}`);
  };
  return (
    <div className={`col-lg-4 clinic-items`} onClick={moveToDetail}>
      <Link to={`${routeType.ROUTE_CLINIC_DETAIL_BUILD(props.data.id)}`} className="clinic-item">
        <div className="clinic-item-img">
          <img alt="clinic-img" src={data.clinicImage} />
        </div>
        <div className="clinic-item-content">
          <div className="clinic-item-content-header">
            <div className="clinic-name">
              <p data-test-name="name">{data.clinicName}</p>
            </div>
            <div data-test-time="time">
              <FaRegClock/> {data.openAt} - {data.closeAt}
            </div>
            <div className="clinic-address" data-test-address="address">
              <GrLocation/> {data.address}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GridClinicItem;
