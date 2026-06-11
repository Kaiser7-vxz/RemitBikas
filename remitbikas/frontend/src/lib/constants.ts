// In dev, use the Vite proxy (`/api`) to avoid CORS and connection issues.
export const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? '/api' : 'http://localhost:5000/api');

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'RemitBikas';

export const ROLES = {
  CITIZEN: 'CITIZEN',
  CONTRACTOR: 'CONTRACTOR',
  MUNICIPAL_OFFICER: 'MUNICIPAL_OFFICER',
  ADMIN: 'ADMIN',
};

export const PROJECT_STATUS = {
  PLANNING: 'PLANNING',
  TENDER: 'TENDER',
  ONGOING: 'ONGOING',
  COMPLETED: 'COMPLETED',
  ON_HOLD: 'ON_HOLD',
};
