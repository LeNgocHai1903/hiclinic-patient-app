import './SignIn.scss';
import LogoImg from '../../asset/img/logo.png';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../store/authenticate/store';

import * as routeType from '../../constant/route/route';

const SignIn = () => {
  const history = useHistory();

  const [state, actions] = useAuth();

  state.accessToken && history.push(state.previousLocation);

  const { t } = useTranslation();

  const initialValues = {
    email: '',
    password: '',
  };

  const validateSchema = Yup.object().shape({
    email: Yup.string()
      .email(`${t('invalidEmail')}`)
      .required(`${t('emailIsRequired')}`),
    password: Yup.string()
      .min(8)
      .max(50)
      .required(`${t('passwordRequired')}`),
  });

  const submitForm = async (values, formActions) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    await actions.signIn(data, values.email);
    formActions.setSubmitting(false);
  };

  const backToHomePage = () => {
    history.push('/');
  };

  return (
    <div className="signin-wrapper">
      <Formik initialValues={initialValues} validationSchema={validateSchema} onSubmit={submitForm}>
        {(formik) => {
          const { errors, isValid, dirty, values, handleChange, handleBlur, handleSubmit, touched } = formik;
          return (
            <form className="signin-form" onSubmit={handleSubmit}>
              <img className="signin-logo" alt="hiclinic-logo" src={LogoImg} onClick={backToHomePage} />
              <h1 className="signin-title">{t('signIn')}</h1>
              {state.errorMessage && <div className="signin-error">{state.errorMessage}</div>}
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
              <button type="submit" className="signin-btn" disabled={!errors || !isValid || !dirty}>
                {t('submit')}
              </button>
              <span>{t('youDontHaveAnyAccount?')}</span>
              <Link to={`${routeType.ROUTE_SIGN_UP}`}> {t('clickHereToSignUp')}</Link>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SignIn;
