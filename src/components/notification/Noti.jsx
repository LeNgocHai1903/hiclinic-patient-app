import { Media, Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../store/authenticate/store';

import './Noti.scss';
const Noti = (props) => {
  const { data } = props;
  const { bookingNotification } = data;
  const { map } = bookingNotification;

  const [state, actions] = useAuth();

  const { t } = useTranslation();
  let style;
  switch (map.bookingStatus) {
    case 'CONFIRMED':
      style = 'success';
      break;
    case 'CANCELLED':
      style = 'danger';
      break;
    case 'PENDING':
      style = 'secondary';
      break;
    case 'CONFIRMED':
      style = 'primary';
      break;
  }

  const removeNoti = (index) => {
    actions.removeNoti(state.noti.splice(index, 1));
  };

  return (
    <Media className="notificaiton-modal">
      <Media middle left className="mr-3">
        {map.bookingStatus === 'CONFIRMED' ? (
          <i className="fa fa-fw fa-2x fa-check" style={{ color: 'green' }}></i>
        ) : (
          <i className="fa fa-fw fa-2x fa-times" style={{ color: 'red' }}></i>
        )}
      </Media>
      <Media body>
        <Media heading tag="h6">
          {map.bookingStatus}
        </Media>
        <Media className="noti-content">
          {map.bookingStatus === 'CONFIRMED' ? <b>{t('bookingStatusSuccess')} </b> : <b>{t('bookingStatusReject')}</b>}
          <span>
            {t('clinic')}: {map.clinic.map.clinicName}
          </span>
          <span>
            {t('doctor')}: {map.doctor.map.fullName}
          </span>
          <span>
            {t('time')}: {map.bookFrom}
          </span>
          <span>
            {t('date')}: {map.bookingDate}{' '}
          </span>
        </Media>
        <div className="d-flex mt-2">
          <Button color="link" onClick={props.closeNotiModal} className={`ml-2 text-${style}`}>
              {t('confirm')}
          </Button>
          <Button color="link" onClick={() => removeNoti(props.index)} className={`ml-2 text-${style}`}>
              {t('delete')}
          </Button>
        </div>
      </Media>
    </Media>
  );
};

export default Noti;
