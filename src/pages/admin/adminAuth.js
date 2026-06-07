const AUTH_KEY = 'portfolio_admin_auth_v1';
const PASSWORD_KEY = 'portfolio_admin_password_v1';

// The admin panel only edits the current browser's localStorage (no server),
// and its client-side password check can't be made truly secret in a static
// bundle. So we expose it only during local development (`npm start`) and
// 404 it in the production build (`npm run build`). Edit content locally,
// commit the JSON, then redeploy.
export const ADMIN_ENABLED = process.env.NODE_ENV !== 'production';

const envPassword = (process.env.REACT_APP_ADMIN_PASSWORD || '').trim();
const DEFAULT_PASSWORD = envPassword || 'admin';

export const getAdminPassword = () => {
    return localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
};

export const setAdminPassword = (next) => {
    if (!next) return;
    localStorage.setItem(PASSWORD_KEY, next);
};

export const isAdminAuthed = () => {
    return localStorage.getItem(AUTH_KEY) === '1';
};

export const signInAdmin = (password) => {
    if (password === getAdminPassword()) {
        localStorage.setItem(AUTH_KEY, '1');
        return true;
    }
    return false;
};

export const signOutAdmin = () => {
    localStorage.removeItem(AUTH_KEY);
};

export const isPasswordFromEnv = () => {
    return !!envPassword && !localStorage.getItem(PASSWORD_KEY);
};
