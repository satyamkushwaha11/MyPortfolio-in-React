const envStr = (key) => (process.env[key] || "").trim();

export const API_HOST = envStr("REACT_APP_API_HOST");
export const CONTACT_EMAIL_OVERRIDE = envStr("REACT_APP_CONTACT_EMAIL");
export const CV_URL_OVERRIDE = envStr("REACT_APP_CV_URL");
