import { env } from 'process';

export const JWT_CONSTANTS = {
  secret: env.JWT_TOKEN || '',
};
