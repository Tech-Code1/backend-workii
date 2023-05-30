import { options } from './orm.config';

export const configs = () => ({
  api: {
    port: parseInt(String(process.env.PORT), 10) || 3000,
  },
  database: { ...options },
});