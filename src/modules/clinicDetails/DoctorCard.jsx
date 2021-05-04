
import { Card, Button, CardTitle, CardImg } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import {useAuth} from '../../store/authenticate/authenticate';
import './DoctorCard.scss';
import MessageModal from '../../components/messageModal/MessageModal';

const DoctorCard = (props) => {
  const [state, actions] = useAuth();
  const { fullName, image } = props;
  const { t } = useTranslation();
  return (
    <div>
      <Card className="doctor-item">
        <CardImg className="doctor-image" top width="100%" src={image} alt="Card image cap" />
        <Card body>
          <CardTitle className="doctor-name">{fullName}</CardTitle>
          {state.accessToken ? (
            <Button className="button-book" onClick={() => props.onclick(props.fullName)}>
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
