import { Card, Button, CardTitle, CardSubtitle, CardImg, Alert } from 'reactstrap';
import './MyProfile.scss';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import apiWrapper from '../../api/apiWrapper';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import classnames from 'classnames';
import { Tooltip, InputGroup, InputGroupAddon, InputGroupText, Input, Row, FormFeedback } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../store/authenticate/store';

const MyProfile = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const profileId = useParams();
  const [edit, setEdit] = useState(false);
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [status, setStatus] = useState();
  const [visible, setVisible] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [state, actions] = useAuth();

  const token = state.accessToken;
  useEffect(() => {
    apiWrapper({
      url: `${process.env.REACT_APP_PATIENT_SERVER_URL}/info`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [profileId.profileId]);

  const changeFullName = (value) => {
    if (fullName !== value) setFullName(value);
  };
  const changeEmail = (value) => {
    if (email !== value) setEmail(value);
  };
  const changePhone = (value) => {
    if (phone !== value) setPhone(value);
  };

  const onDismiss = () => {
    setVisible(false);
  };

  const tooltipToggle = () => {
    setTooltipOpen(!tooltipOpen);
  };

  //assign initial values for 3 fields
  if (data && !fullName && !email && !phone) {
    changeFullName(data.fullName);
    changeEmail(data.email);
    changePhone(data.phone);
  }
  const editHandler = () => {
    setEdit(true);
  };
  const cancelHandler = () => {
    setEdit(false);
  };

  const fullNameRegex = /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const phoneRegex = /^[0][0-9]{9}$/;
  const ProfileSchema = Yup.object().shape({
    fullName: Yup.string()
      .required('Please enter the required field')
      .min(8, 'Minimum 8 characters')
      .max(30, 'Maximum 30 characters')
      .matches(fullNameRegex, 'Invalid name'),
    phone: Yup.string().matches(phoneRegex, 'Invalid phone'),
    email: Yup.string().matches(emailRegex, 'Invalid email').email('Invalid email').required('Required'),
  });
  const submitForm = async (values) => {
    console.log('token ', token);
    const data = {
      email: values.email,
      fullName: values.fullName,
      phone: values.phone,
    };
    const header = {
      Authorization: `Bearer ${token}`,
    };
    await actions.myProfile(data, header);
    //formActions.setSubmitting(false);
  };

  return (
    <div className="profile">
      {loading ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : (
        <div>
          <Card id="patient-profile" className="patient-profile-container">
            <CardImg
              className="patient-profile-image"
              top
              width="100%"
              src="https://icons-for-free.com/iconfiles/png/512/avatar+human+man+profile+icon-1320085876716628234.png"
              alt="Card image cap"
            />
            <Card body>
              <Formik
                initialValues={{
                  fullName: data.fullName,
                  email: data.email,
                  phone: data.phone,
                }}
                validationSchema={ProfileSchema}
                onSubmit={(values) => {
                  console.log('values: ', values);

                  //2 lines below will be moved to then
                  setVisible(true);
                  setEdit(false);
                  submitForm(values);

                }}
              >
                {({ errors, touched, values, handleBlur, handleChange, setFieldValue, handleSubmit, status }) => (
                  <Form onSubmit={handleSubmit}>
                    {state && state.errorMessage ? (
                      <Alert color="info" isOpen={visible} toggle={onDismiss}>
                        Something went wrong
                      </Alert>
                    ) : (
                      <Alert color="info" isOpen={visible} toggle={onDismiss}>
                        Successfully updated!
                      </Alert>
                    )}
                    <CardTitle>
                      <InputGroup>
                        <Input
                          className={classnames({
                            'patient-profile-name': true,
                            'patient-profile-input': true,
                            'patient-profile-input-active': edit === true,
                          })}
                          name="fullName"
                          id="fullName"
                          tag={Field}
                          component="input"
                          invalid={!!errors.fullName && touched.fullName && edit}
                          value={edit || (!edit && visible) || (!edit && !visible) ? values.fullName : data.fullName}
                          disabled={edit === false}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <FormFeedback>{errors.fullName}</FormFeedback>
                      </InputGroup>
                    </CardTitle>

                    <CardSubtitle className="patient-profile-input">
                      <InputGroup className="patient-profile-email">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText className="patient-profile-label">{t('email')}:</InputGroupText>
                        </InputGroupAddon>
                        <Input
                          className={classnames({
                            'patient-profile-email': true,
                            'patient-profile-input-active': edit === true,
                          })}
                          tag={Field}
                          component="input"
                          name="email"
                          id="email"
                          type="email"
                          // onChange={handleChange}
                          // onBlur={handleBlur}
                          // invalid={!!errors.email && touched.email && edit}
                          // value={edit || (!edit && visible) || (!edit && !visible) ? values.email : data.email}
                          // disabled={edit === false}
                          readOnly
                        />
                        <Tooltip placement="right" isOpen={tooltipOpen} target="email" toggle={tooltipToggle}>
                          {t("readonlyEmail")}
                        </Tooltip>
                        <FormFeedback>{errors.email}</FormFeedback>
                      </InputGroup>
                    </CardSubtitle>
                    <CardSubtitle className="patient-profile-input">
                      <InputGroup className="patient-profile-phone patient-profile-input">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText className="patient-profile-label">{t('phoneNumber')}:</InputGroupText>
                        </InputGroupAddon>
                        <Input
                          className={classnames({ 'patient-profile-phone': true })}
                          component="input"
                          id="phone"
                          name="phone"
                          invalid={!!errors.phone && touched.phone && edit}
                          value={edit || (!edit && visible) || (!edit && !visible) ? values.phone : data.phone}
                          disabled={edit === false}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <FormFeedback>{errors.phone}</FormFeedback>
                      </InputGroup>
                    </CardSubtitle>
                    <Button
                      id="patient-profile-edit-button"
                      className={classnames({ 'patient-profile-edit-true': edit === true })}
                      onClick={() => editHandler()}
                    >
                      {t('editProfile')}
                    </Button>
                    <Row className="profile-edit-buttons">
                      <Button
                        className={classnames({
                          'patient-profile-cancel': edit === true,
                          'patient-profile-edit-false': edit === false,
                        })}
                        onClick={() => cancelHandler()}
                      >
                        {t('cancle')}
                      </Button>
                      <Button
                        type="submit"
                        className={classnames({
                          'patient-profile-save': edit === true,
                          'patient-profile-edit-false': edit === false,
                        })}
                      >
                        {t('saveProfile')}
                      </Button>
                    </Row>
                  </Form>
                )}
              </Formik>
            </Card>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
