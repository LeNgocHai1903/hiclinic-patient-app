import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import './Notification.scss';

import { Button, Media } from "reactstrap";
import { Toast } from "reactstrap";

const Notifications = (props) => {
  const [isShow, setIsShow] = useState(false);

  const show = () => {
    setIsShow(!isShow);
  };

  return (
    <div className="noti-wrapper">
      <Toast isOpen={props.isShow} transition>
        <Media >
          <Media middle left className="mr-3">
            <i className="fa fa-fw fa-2x fa-check"></i>
          </Media>
          <Media body>
            <Media heading tag="h6">
              Success!w2q1
            </Media>
            <p>You successfully read this important alert message.</p>
            <div className="d-flex mt-2">
              <Button color="success">I Understand</Button>
              <Button color="link" className="ml-2 text-success">
                Cancel
              </Button>
            </div>
          </Media>
        </Media>
        <Media>
          <Media middle left className="mr-3">
            <i className="fa fa-fw fa-2x fa-close"></i>
          </Media>
          <Media body>
            <Media heading tag="h6">
              Danger!
            </Media>
            <p>Change a few things up and try submitting.</p>
            <div className="d-flex mt-2">
              <Button color="danger">I Understand</Button>
              <Button color="link" className="ml-2 text-danger">
                Cancel
              </Button>
            </div>
          </Media>
        </Media>
      </Toast>
    </div>
  );
};

export default Notifications;
