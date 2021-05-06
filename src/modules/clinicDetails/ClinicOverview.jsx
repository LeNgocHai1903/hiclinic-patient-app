import './ClinicOverview.scss';
import { useTranslation } from 'react-i18next';

import { MdLocationOn } from 'react-icons/md';
import { BiTime } from 'react-icons/bi';
import { GrStatusGood } from 'react-icons/gr';

const ClinicOverview = (props) => {
  const { t } = useTranslation();
  const data = props;
  const clinicDetails = data.data;
  return (
    <div>
      {clinicDetails ? (
        <div>
          <div className="clinic-overview-container">
            <img src={clinicDetails.clinicImage} />
            <div className="clinic-information">
              <h2 className="clinic-details-name">{clinicDetails.clinicName}</h2>
              <p>
                <MdLocationOn className="icon address-icon" />
                {clinicDetails.address}
              </p>
              <p>
                <BiTime className="icon time-icon" />
                {clinicDetails.openAt}:00 - {clinicDetails.closeAt}:00
              </p>
            </div>
          </div>
          <div className="clinic-overview-description">
            <h2>{t('clinicDescription')}</h2>
            <p>{clinicDetails.description}</p>
          </div>
        </div>
      ) : (
        <div>{t('loading')}</div>
      )}
    </div>
  );
};

export default ClinicOverview;