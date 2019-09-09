import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { FirebaseError } from 'firebase';
import { from, Observable, of } from 'rxjs';
import { catchError, first, map, switchMap } from 'rxjs/operators';

import { getRelevantUserData, parseLoginError } from '../utils';
import {
  AuthActionTypes,
  AuthInitCheck,
  AuthLoadedAction,
  AuthLoginFail,
  AuthLoginRequest,
  AuthLoginSuccess,
  AuthLogoutFail,
  AuthLogoutRequest,
  AuthLogoutSuccess
} from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  public initAuth$: Observable<AuthLoadedAction> = this.actions$.pipe(
    ofType<AuthInitCheck>(AuthActionTypes.INIT_CHECK),
    switchMap(() => {
      return this.afAuth.user.pipe(
        first(),
        switchMap(user => {
          return of(
            new AuthLoadedAction(user ? getRelevantUserData(user) : null)
          );
        })
      );
    })
  );

  @Effect()
  public loginRequest$: Observable<
    AuthLoginFail | AuthLoginSuccess
  > = this.actions$.pipe(
    ofType<AuthLoginRequest>(AuthActionTypes.LOGIN_REQUEST),
    switchMap(({ payload: { email, password } }) =>
      from(this.afAuth.auth.signInWithEmailAndPassword(email, password)).pipe(
        switchMap(({ user }) => {
          return of(new AuthLoginSuccess(getRelevantUserData(user)));
        }),
        catchError((err: FirebaseError) => {
          return of(new AuthLoginFail(parseLoginError(err)));
        })
      )
    )
  );

  @Effect()
  public logoutRequest$: Observable<
    AuthLogoutSuccess | AuthLogoutFail
  > = this.actions$.pipe(
    ofType<AuthLogoutRequest>(AuthActionTypes.LOGOUT_REQUEST),
    switchMap(() =>
      from(this.afAuth.auth.signOut()).pipe(
        map(() => new AuthLogoutSuccess()),
        catchError((err: any) => of(new AuthLogoutFail({ message: err.err })))
      )
    )
  );

  constructor(private actions$: Actions, private afAuth: AngularFireAuth) {}
}
