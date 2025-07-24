import { User } from './user';

export interface AuthResponse {
  user: User;
  token: {
    type: string;
    token: string;
    expiresAt?: string;
  };
}