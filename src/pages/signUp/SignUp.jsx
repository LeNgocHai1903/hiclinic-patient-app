import { useState } from 'react';
import './SignUp.scss';
import LogoImg from '../../asset/img/logo.png';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { useAuth } from '../../store/authenticate/store';

import * as routeType from '../../constant/route/route';

const SignUp = () => {
  const [OTPModal, setOTPModal] = useState(false);
  const { t } = useTranslation();
  const [state, actions] = useAuth();
  const [OTPValue, setOTPValue] = useState('');
  const history = useHistory();

  console.log(state);

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validateSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required('Email is required').max(50),
    password: Yup.string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Password must contain 1 upper character, 1 digit. ')
      .min(8)
      .max(50)
      .required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm password must match'),
  });

  const submitForm = async (values, formActions) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    await actions.signUp(data);
    setOTPModal(true);
    formActions.setSubmitting(false);
  };

  const openModal = () => {
    setOTPModal(true);
  };

  const closeModal = () => {
    setOTPModal(false);
  };

  const confirmSignUp = async () => {
    await actions.confirmOTP(OTPValue);
    history.push('/');
  };

  const OTPChange = (e) => {
    setOTPValue(e.target.value);
  };

  const backToHomePage = () => {
    history.push('/');
  };

  return (
    <div className="signup-wrapper">
      <Formik initialValues={initialValues} validationSchema={validateSchema} onSubmit={submitForm}>
        {(formik) => {
          const { errors, isValid, dirty, values, touched, handleChange, handleBlur, handleSubmit } = formik;
          return (
            <form onSubmit={handleSubmit} className="signup-form">
              <img className="signup-logo" src={LogoImg} alt="hiclinic logo" onClick={backToHomePage} />
              <h1 className="signup-title">{t('signUp')}</h1>
              <b>{t('email')}</b>
              <input
                className="signup-form-input"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                name="email"
              />
              {errors.email && touched.email && <div className="signup-error">{errors.email}</div>}
              <b>{t('password')}</b>
              <input
                className="signup-form-input"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                name="password"
              />
              {errors.password && touched.password && <div className="signup-error">{errors.password}</div>}
              <b>{t('confirmPassword')}</b>
              <input
                className="signup-form-input"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                name="confirmPassword"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="signup-error">{errors.confirmPassword}</div>
              )}
              <button type="submit" className="signup-btn" disabled={!errors || !isValid || !dirty} onClick={openModal}>
                {t('submit')}
              </button>
              <span>{t('youAlreadyHaveAccount')}</span>
              <Link to={`${routeType.ROUTE_SIGN_IN}`}>{t('clickHereToSignIn')}</Link>
            </form>
          );
        }}
      </Formik>
      {OTPModal && (
        <Modal isOpen={OTPModal} fade={false}>
          <ModalHeader>{t('OTPCode')}</ModalHeader>
          <ModalBody className="otp-wrapper">
            <input className="otp-input" onChange={OTPChange}></input>
          </ModalBody>
          <div className="otp-retry">
            <span>{t('ifYouDontHaveAnyOTPCodeSendToYourEmail')} </span>
            <b>{t('pleaseComebackAndRetry')}</b>
          </div>
          <ModalFooter>
            <Button color="secondary" onClick={closeModal}>
              {t('cancel')}
            </Button>{' '}
            <Button color="primary" onClick={confirmSignUp}>
              {t('confirm')}
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
};

export default SignUp;
