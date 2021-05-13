import { useState } from "react";
import "./SignIn.scss";
import LogoImg from "../../asset/img/logo.png";

import { Formik } from "formik";
import * as Yup from "yup";

import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../store/authenticate/store";

import * as routeType from "../../constant/route/route";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

const SignIn = () => {
  const history = useHistory();

  const [state, actions] = useAuth();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleFailed = (error) => {
    if (error.status === 401) {
      setError(t("signInError"));
    } else if (error === "Network Error") {
      setError("Network Error");
    } else {
      setError(
        error.data.message || error.data.errorMessage || error.message || error
      );
    }
    setIsLoading(false);
  };

  const { t } = useTranslation();
  const initialValues = {
    email: "",
    password: "",
  };

  const validateSchema = Yup.object().shape({
    email: Yup.string()
      .email(`${t("invalidEmail")}`)
      .required(`${t("emailIsRequired")}`),
    password: Yup.string()
      .min(8)
      .max(50)
      .required(`${t("passwordRequired")}`),
  });

  const submitForm = async (values, formActions) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    setIsLoading(true);
    await actions.signIn(data, handleFailed);
    formActions.setSubmitting(false);
  };

  const backToHomePage = () => {
    history.push("/");
  };

  // const changeToPreviousLocation = () => {
  //   setIsLoading(false);
  //   history.push(state.previousLocation);
  // };

  state.accessToken && history.push(state.previousLocation)

  const changeToSignUpPage = () => {
    history.push(`${routeType.ROUTE_SIGN_UP}`);
  };

  return (
    <div className="signin-wrapper">
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={submitForm}
      >
        {(formik) => {
          const {
            errors,
            isValid,
            dirty,
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            touched,
          } = formik;
          return (
            <form className="signin-form" onSubmit={handleSubmit}>
              <img
                className="signin-logo"
                alt="hiclinic-logo"
                src={LogoImg}
                onClick={backToHomePage}
              />
              <h1 className="signin-title">{t("signIn")}</h1>
              {error && <div className="signin-error">{error}</div>}
              <b>{t("email")}</b>
              <input
                className="signin-form-input"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                name="email"
                autoComplete="off"
              />
              {errors.email && touched.email && (
                <div className="signin-error">{errors.email}</div>
              )}
              <b>{t("password")}</b>
              <input
                className="signin-form-input"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                name="password"
              />
              {errors.password && touched.password && (
                <div className="signin-error">{errors.password}</div>
              )}
              {!errors || !isValid || !dirty ? (
                <button type="submit" className="signin-btn" disabled>
                  {t("submit")}
                </button>
              ) : (
                <button type="submit" className="signin-btn-active">
                  {isLoading ? <LoadingSpinner color="white" /> : t("submit")}
                </button>
              )}

              <span>{t("youDontHaveAnyAccount?")}</span>
              <Link>
                <span onClick={changeToSignUpPage}>
                  {" "}
                  {t("clickHereToSignUp")}
                </span>
              </Link>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SignIn;
