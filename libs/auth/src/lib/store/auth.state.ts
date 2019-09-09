import { AuthError, LoggedUser } from '../auth.model';

export interface AuthState {
  error?: AuthError;
  loading: boolean;
  user: LoggedUser | null;
}

export const initialAuthState: AuthState = {
  loading: true,
  user: null
};

export const AUTH_STATE = 'auth';
