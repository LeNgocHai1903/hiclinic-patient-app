export const BASE_URL = process.env.REACT_APP_PATIENT_SERVER_URL;

//CLINIC
export const GET_ALL_CLINIC = `${process.env.REACT_APP_PATIENT_SERVER_URL}/clinics`;
export const GET_HIGHTLIGHT_CLINIC = `${process.env.REACT_APP_PATIENT_SERVER_URL}/clinics/?isHighlight=true`;
export const SEARCH_CLINICS = `${process.env.REACT_APP_PATIENT_SERVER_URL}/clinics/search/`;
export const CLINIC_DETAILS = `${process.env.REACT_APP_PATIENT_SERVER_URL}/clinics/detail`;

//NEWS
export const NEWS_URL = `${process.env.REACT_APP_PATIENT_NEWS_SERVER}`;

//doctors

export const DOCTORS_DETAIL = `${process.env.REACT_APP_DOCTOR_DETAIL}`;
