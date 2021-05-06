import { Card, Button, CardTitle, CardImg } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import './DoctorCard.scss';

import MessageModal from '../../components/messageModal/MessageModal';

import { useAuth } from '../../store/authenticate/store';

const DoctorCard = (props) => {
  const [state, actions] = useAuth();
  const { id, fullName, image } = props;
  const { t } = useTranslation();
  return (
    <div>
      <Card className="doctor-item">
        <CardImg className="doctor-image" top width="100%" src={image} alt="Card image cap" />
        <Card body>
          <CardTitle className="doctor-name">{fullName}</CardTitle>
          {state.accessToken ? (
            <Button className="button-book" onClick={() => props.onclick(fullName, image)}>
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
