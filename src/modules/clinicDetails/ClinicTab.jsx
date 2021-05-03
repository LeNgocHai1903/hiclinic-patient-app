import { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import DoctorImg from '../../asset/img/doctor.jpg';
import './ClinicTab.scss';
import DoctorCard from './DoctorCard';
import { useTranslation } from 'react-i18next';

const ClinicTab = (props) => {
  const [activeTab, setActiveTab] = useState('0');
  const { t } = useTranslation();
  const { data } = props;
  const depAndDoc = data.doctors;
  const depNames = depAndDoc.map((doc) => doc.departmentName);
  let docData;

  const uniqueDepNames = depNames.filter((item, pos, self) => {
    return self.indexOf(item) === pos;
  });

  //get components for department tab
  const depTab = uniqueDepNames.map((item, index) => {
    return (
      <NavItem className="nav-item">
        <NavLink
          className={classnames({ active: activeTab === index.toString() })}
          onClick={() => {
            toggle(index);
          }}
        >
          {item}
        </NavLink>
      </NavItem>
    );
  });

  //get components for doctor tab corresponding to department tab
  const docTab = (uniqueDepNames, depAndDoc) => {
    let i = 0;
    let j = 0;
    let k = -1;
    var docTab = [];

    for (i = 0; i < uniqueDepNames.length; i++) {
      docTab.push([]);
      docTab[i].push([]);
      for (j = 0; j < depAndDoc.length; j++) {
        if (uniqueDepNames[i] === depAndDoc[j].departmentName) {
          docTab[i][++k] = depAndDoc[j].fullName;
        }
      }
      k = -1;
    }
    return docTab;
  };

  docData = docTab(uniqueDepNames, depAndDoc);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const tabPaneContent = uniqueDepNames.map((depName, index) => {
    return (
      <TabPane
        tabId={index}
        className={classnames({
          active: activeTab === index.toString(),
        })}
      >
        <Row>
          {docData[index].map((doc) => {

            return (
              <Col lg="4" sm="6">
                <DoctorCard fullName={doc} image={DoctorImg} onclick={props.onclick} />
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
