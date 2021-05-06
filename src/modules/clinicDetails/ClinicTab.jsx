import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import './ClinicTab.scss';

import DoctorCard from './DoctorCard';

const ClinicTab = (props) => {
  const [activeTab, setActiveTab] = useState('0');
  const { t } = useTranslation();
  const { data } = props;
  const depAndDoc = data.departments;
  const depNames = depAndDoc.map((doc) => doc.departmentName);
  const docNamesOfDep = depAndDoc.map((doc) => doc.doctors);

  const depTab = depNames.map((item, index) => {
    return (
      <NavItem className="nav-item">
        <NavLink
          className={classnames({ active: activeTab === index.toString() })}
          onClick={() => {
            toggle(index.toString());
          }}
        >
          {item}
        </NavLink>
      </NavItem>
    );
  });

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const tabPaneContent = depNames.map((depTab, index) => {
    return (
      <TabPane
        tabId={index}
        className={classnames({
          active: activeTab === index.toString(),
        })}
      >
        <Row>
          {docNamesOfDep[index].map(function (doctor) {
            return (
              <Col lg="4" sm="6">
                <DoctorCard fullName={doctor.fullName} image={doctor.image} onclick={props.onclick} />
              </Col>
            );
          })}
        </Row>
      </TabPane>
    );
  });

  return (
    <div className="tab-container">
      <Nav tabs>{depTab}</Nav>
      <TabContent activeTab={activeTab}>{tabPaneContent ? tabPaneContent : <div>{t('loading')}</div>}</TabContent>
    </div>
  );
};
export default ClinicTab;