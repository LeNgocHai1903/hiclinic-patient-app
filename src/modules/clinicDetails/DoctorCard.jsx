import { Card, Button, CardTitle, CardImg } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import './DoctorCard.scss';

import MessageModal from '../../components/messageModal/MessageModal';

import { useAuth } from '../../store/authenticate/store';

const DoctorCard = (props) => {
  const [state, actions] = useAuth();
  const { docId, fullName, image, depName } = props;
  const { t } = useTranslation();
  return (
    <div>
      <Card className="doctor-item">
        <CardImg className="doctor-image" top width="100%" src={image} alt="Card image cap" />
        <Card body>
          <div className="doctor-name">{fullName}</div>
          {state.accessToken ? (
            <Button className="button-book" onClick={() => props.onclick(fullName, image, depName, docId)}>
              {t('bookNow')}
            </Button>
          ) : (
            <MessageModal className="button-book" buttonLabel={t('bookNow')} />
          )}
        </Card>
      </Card>
    </div>
  );
};

export default DoctorCard;
