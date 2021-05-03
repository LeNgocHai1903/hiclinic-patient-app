import { useState } from 'react';

import { useContext } from 'react';
import './SignIn.scss';
import LogoImg from '../../asset/img/logo.png';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { useTranslation } from 'react-i18next';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../../components/context/AuthContext';

import axios from 'axios';

const SignIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const auth = useContext(AuthContext);

  const { t } = useTranslation();

  const initialValues = {
    email: '',
    password: '',
  };

  const validateSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(8).max(50).required('Password is required'),
  });

  const submitForm = (values, actions) => {
    signInHandler(values.email, values.password);
  };

  const signInHandler = (email, password) => {
    try {
      axios
        .post(`https://hiclinic-patient-portal-server.herokuapp.com/signin`, {
          email: email,
          password: password,
        })
        .then((result) => {
          if (result.status === 200) {
            localStorage.setItem('tokens', JSON.stringify(result.data));
            setIsLoggedIn(true);
            auth.login(result.data.id, JSON.stringify(result.data));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {}
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signin-wrapper">
      <Formik initialValues={initialValues} validationSchema={validateSchema} onSubmit={submitForm}>
        {(formik) => {
          const { errors, isValid, dirty, values, handleChange, handleBlur, handleSubmit, touched } = formik;
          return (
            <form onSubmit={handleSubmit} className="signin-form">
              <img className="signin-logo" alt="hiclinic-logo" src={LogoImg} />
              <h1 className="signin-title">{t('signIn')}</h1>
              <b>{t('email')}</b>
              <input
                className="signin-form-input"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                name="email"
                autoComplete="off"
              />
              {errors.email && touched.email && <div className="signin-error">{errors.email}</div>}
              <b>{t('password')}</b>
              <input
                className="signin-form-input"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                name="password"
              />
              {errors.password && touched.password && <div className="signin-error">{errors.password}</div>}
              <button
                type="submit"
                className="signin-btn"
                disabled={!errors || !isValid || !dirty}
                onClick={() => signInHandler(values.email, values.password)}
              >
                {t('submit')}
              </button>
              <span>{t('youDontHaveAnyAccount?')}</span>
              <Link to="/signup"> {t('clickHereToSignUp')}</Link>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SignIn;
