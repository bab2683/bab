import { provide } from '@bab/test-utils';
import { loggedTestUser } from '../../../../__mocks__';

import { AuthError } from '../../auth.model';
import {
  AuthLoadedAction,
  AuthLoginFail,
  AuthLoginSuccess,
  AuthLogoutSuccess
} from '../auth.actions';
import { authReducer } from '../auth.reducer';
import { initialAuthState } from '../auth.state';

describe('authReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = provide({ type: 'NOOP' });
      const state = authReducer(undefined, action);

      expect(state).toBe(initialAuthState);
    });
  });

  describe('[Auth] loaded', () => {
    it('should change the loading status to false', () => {
      const action = new AuthLoadedAction(null);
      const state = authReducer(initialAuthState, action);

      expect(state).toEqual({
        ...initialAuthState,
        loading: false
      });
    });
  });

  describe('[Auth] login success', () => {
    it('should save the user data to the state', () => {
      const action = new AuthLoginSuccess({ ...loggedTestUser });
      const state = authReducer(initialAuthState, action);

      expect(state).toEqual({
        ...initialAuthState,
        user: loggedTestUser
      });
    });
  });

  describe('[Auth] login fail', () => {
    it('should save the error to the state', () => {
      const error: AuthError = { message: 'wrong credentials' };

      const action = new AuthLoginFail(error);
      const state = authReducer(initialAuthState, action);

      expect(state).toEqual({
        ...initialAuthState,
        error
      });
    });
  });

  describe('[Auth] logout success', () => {
    it('should clear the user data on logout', () => {
      const action = new AuthLogoutSuccess();
      const state = authReducer(initialAuthState, action);

      expect(state).toEqual(initialAuthState);
    });
  });
});
