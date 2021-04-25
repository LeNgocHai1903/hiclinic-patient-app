import "./ClinicItem-List.scss";

import { AiFillStar } from "react-icons/ai";
import Img from "../../../asset/img/clinic-list-example.jpeg";

const ListClinicItem = (props) => {
  return (
    <div className="clinic-item-list-row">
      <div className="list-group clinic-item-list">
        <div className="clinic-item-list-items ">
          <img alt="clinic-img" src={Img} className="clinic-item-list-img" />
          <div className="justify-content-between  clinic-item-list-content">
            <div className="d-flex justify-content-between w-300 ">
              <h5 className="mb-1">{props.data.name}</h5>
              <small>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
              </small>
            </div>
            <label className="mb-1" data-test-time="time">
              <b>Working Time:</b> {props.data.workingTime}
            </label>
            <p className="mb-1" data-test-address="address">
              <b>Address:</b> {props.data.address}
            </p>
            <small data-test-description="description">
              {props.data.description}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListClinicItem;
