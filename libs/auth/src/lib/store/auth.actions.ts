import { Action } from '@ngrx/store';

import { AuthError, AuthLoginMail, LoggedUser } from '../auth.model';

export enum AuthActionTypes {
  INIT_CHECK = '[Auth] init check',
  INIT_COMPLETED = '[Auth] loaded',
  LOADED = '[Auth] loaded',
  LOGIN_REQUEST = '[Auth] login request',
  LOGIN_SUCCESS = '[Auth] login success',
  LOGIN_ERROR = '[Auth] login fail',
  LOGOUT_REQUEST = '[Auth] logout request',
  LOGOUT_SUCCESS = '[Auth] logout success',
  LOGOUT_ERROR = '[Auth] logout error'
}

export class AuthInitCheck implements Action {
  public readonly type = AuthActionTypes.INIT_CHECK;

  constructor(public payload?: any) {}
}

export class AuthLoadedAction implements Action {
  public readonly type: string = AuthActionTypes.INIT_COMPLETED;

  constructor(public payload: LoggedUser | null) {}
}

export class AuthLoginRequest implements Action {
  public readonly type = AuthActionTypes.LOGIN_REQUEST;

  constructor(public payload: AuthLoginMail) {}
}

export class AuthLoginSuccess implements Action {
  public readonly type = AuthActionTypes.LOGIN_SUCCESS;

  constructor(public payload: LoggedUser) {}
}

export class AuthLoginFail implements Action {
  public readonly type = AuthActionTypes.LOGIN_ERROR;

  constructor(public payload: AuthError) {}
}

export class AuthLogoutRequest implements Action {
  public readonly type = AuthActionTypes.LOGOUT_REQUEST;

  constructor(public payload?: any) {}
}

export class AuthLogoutSuccess implements Action {
  public readonly type = AuthActionTypes.LOGOUT_SUCCESS;

  constructor(public payload?: any) {}
}

export class AuthLogoutFail implements Action {
  public readonly type = AuthActionTypes.LOGOUT_ERROR;

  constructor(public payload: AuthError) {}
}

export type AuthActions =
  | AuthInitCheck
  | AuthLoginRequest
  | AuthLoadedAction
  | AuthLoginFail
  | AuthLoginSuccess
  | AuthLogoutRequest
  | AuthLogoutSuccess
  | AuthLogoutFail;
