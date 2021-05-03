import React from 'react';

import { MdLocationOn } from 'react-icons/md';
import { BiTime } from 'react-icons/bi';
import { GrStatusGood } from 'react-icons/gr';
import './ClinicOverview.scss';
import { useTranslation } from 'react-i18next';

const ClinicOverview = (props) => {
  const { t } = useTranslation();

  const { data } = props;

  return (
    <div>
      {data ? (
        <div className="clinic-overview-container">
          <img src={data.image} />
          <div className="clinic-information">
            <h2 className="clinic-name">{data.clinicName}</h2>
            <p>
              <MdLocationOn className="icon address-icon" />
              {data.address}
            </p>
            <p>
              <BiTime className="icon time-icon" />
              {data.openAt} - {data.closeAt}{' '}
            </p>
            <p>{data.description}</p>
            <p>
              <GrStatusGood className="icon status-icon" />
              {data.status}
            </p>
          </div>
        </div>
      ) : (
        <div>{t('loading')}</div>
      )}
    </div>
  );
};

export default ClinicOverview;
