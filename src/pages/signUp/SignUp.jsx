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
  const [checkError, setCheckError] = useState('');
  const history = useHistory();

  state.accessToken && history.push(state.previousLocation);

  const initialValues = {
    email: '',
    password: '',
    fullName: '',
    confirmPassword: '',
  };

  const validateSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is not valid')
      .required(`${t('emailIsRequired')}`)
      .max(50),
    fullName: Yup.string()
      .matches(/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/, `${'noSpecialCharacters'}`)
      .required(`${t('thisFieldIsRequired')}`)
      .max(20),
    password: Yup.string()
      .min(8)
      .max(50)
      .required(`${t('passwordRequired')}`),
    confirmPassword: Yup.string()
      .required(`${t('confirmPasswordRequired')}`)
      .oneOf([Yup.ref('password'), null], `${t('matchPassword')}`),
  });

  const submitForm = async (values, formActions) => {
    const data = {
      email: values.email,
      password: values.password,
      fullName: values.fullName,
    };

    await actions.signUp(data, values.fullName);
    !state.errorMessage && setCheckError('true');
    if (checkError === 'true') {
      setOTPModal(true);
    }
    // if (!state.errorMessage) {
    //   setOTPModal(true);
    // } else {
    //   setOTPModal(false);
    // }
    formActions.setSubmitting(false);
  };

  const closeModal = () => {
    setOTPModal(false);
  };
  const confirmSignUp = async () => {
    await actions.confirmOTP(OTPValue);
  };

  const OTPChange = (e) => {
    setOTPValue(e.target.value);
  };

  const backToHomePage = () => {
    history.push('/');
  };

  const changeToSignInPage = () => {
    actions.clearErrorMessage();
    history.push(`${routeType.ROUTE_SIGN_IN}`);
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
              {state.errorMessage && <div className="signup-error">{state.errorMessage}</div>}
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
              <b>{t('fullName')}</b>
              <input
                className="signup-form-input"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fullName}
                name="fullName"
              />
              {errors.fullName && touched.fullName && <div className="signup-error">{errors.fullName}</div>}
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
              <button type="submit" className="signup-btn" disabled={!errors || !isValid || !dirty}>
                {t('submit')}
              </button>
              <span>{t('youAlreadyHaveAccount')}</span>
              <Link>
                <span onClick={changeToSignInPage}>{t('clickHereToSignIn')}</span>
              </Link>
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
          {state.errorMessage && (
            <div className="otp-retry">
              <span>{t('ifYouDontHaveAnyOTPCodeSendToYourEmail?')} </span>
              <a>
                <b onClick={actions.resendOTP}>{t('reTry')}</b>
              </a>
            </div>
          )}

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
