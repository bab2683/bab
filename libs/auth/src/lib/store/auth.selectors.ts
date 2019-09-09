import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AUTH_STATE, AuthState } from './auth.state';

export const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE);

export const getAuthLoadingState = createSelector(
  getAuthState,
  ({ loading }: AuthState) => loading
);

export const getLoggedUser = createSelector(
  getAuthState,
  ({ user }: AuthState) => user
);
