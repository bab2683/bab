import { AuthActions, AuthActionTypes } from './auth.actions';
import { AuthState, initialAuthState } from './auth.state';

export function authReducer(
  state: AuthState = initialAuthState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOADED: {
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    }

    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload
      };
    }

    case AuthActionTypes.LOGIN_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case AuthActionTypes.LOGOUT_SUCCESS: {
      return {
        ...state,
        user: null
      };
    }

    default:
      return state;
  }
}
