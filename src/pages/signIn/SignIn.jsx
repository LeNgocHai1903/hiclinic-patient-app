
import "./SignIn.scss";
import LogoImg from "../../asset/img/logo.png";

import { Formik } from "formik";
import * as Yup from "yup";

import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../store/authenticate/store";


const SignIn = () => {
  const history = useHistory();

  const [state, actions] = useAuth();

  state.accessToken && history.push(state.previousLocation);

  const { t } = useTranslation();

  const initialValues = {
    email: "",
    password: "",
  };

  const validateSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,"Password must contain 1 upper character, 1 digit. ").min(8).max(50).required("Password is required"),
  });

  const submitForm = async (values, formActions) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    await actions.signIn(data);
    formActions.setSubmitting(false);
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
              <img className="signin-logo" alt="hiclinic-logo" src={LogoImg} />
              <h1 className="signin-title">{t("signIn")}</h1>
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
              <button
                type="submit"
                className="signin-btn"
                disabled={!errors || !isValid || !dirty}
              >
                {t("submit")}
              </button>
              <span>{t("youDontHaveAnyAccount?")}</span>
              <Link to="/signup"> {t("clickHereToSignUp")}</Link>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SignIn;
