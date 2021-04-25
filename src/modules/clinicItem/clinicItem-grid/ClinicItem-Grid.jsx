import "./ClinicItem-Grid.scss";

import { AiFillStar } from "react-icons/ai";
import {useTranslation} from 'react-i18next';

import Img from "../../../asset/img/clinic-grid-example.jpeg";


const GridClinicItem = (props) => {

  const {t} = useTranslation();

  return (
    <div className={`col-lg-4 clinic-items`}>
      <div className="clinic-item">
        <div className="clinic-item-img">
          <img alt="clinic-img" src={Img} />
        </div>
        <div className="clinic-item-content">
          <div className="clinic-item-content-header">
            {" "}
            <div className="clinic-name">
              <b data-test-name="name">{props.data.name}</b>
              <span>
                <AiFillStar style={{ color: "yellow" }} />
                <AiFillStar style={{ color: "yellow" }} />
                <AiFillStar style={{ color: "yellow" }} />
                <AiFillStar />
                <AiFillStar />
              </span>
            </div>
            <div data-test-time="time">
              <b>{t('Working Time')}:</b> {props.data.workingTime}
            </div>
            <div className="clinic-address" data-test-address="address">
              <b>{t('Address')}:</b> {props.data.address}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridClinicItem;
