import { async, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, ReplaySubject } from 'rxjs';

import {
  loggedTestUser,
  testUserCredentials,
  wrongCredentialsTestError
} from '../../../../__mocks__';

import { angularFireMock } from '@bab/test-utils';

import { AuthErrorsEnum } from '../../auth.enum';
import {
  AuthActionTypes,
  AuthInitCheck,
  AuthLoginRequest,
  AuthLogoutFail,
  AuthLogoutRequest
} from '../auth.actions';
import { AuthEffects } from '../auth.effects';

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let actions: ReplaySubject<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions),
        {
          provide: AngularFireAuth,
          useValue: angularFireMock
        }
      ]
    });

    effects = TestBed.get(AuthEffects);
  });

  it('should be created', async () => {
    expect(effects).toBeTruthy();
  });

  describe('#initAuth$', () => {
    it('should dispatch AuthLoadedAction with null if no data is present', async(async () => {
      actions = new ReplaySubject(1);

      angularFireMock.user.setSource(of(null));

      actions.next(new AuthInitCheck());
      effects.initAuth$.subscribe(result => {
        expect(result.payload).toEqual(null);
        expect(result.type).toEqual(AuthActionTypes.LOADED);
      });
    }));

    it('should dispatch AuthLoadedAction with data if present', async(async () => {
      actions = new ReplaySubject(1);

      angularFireMock.user.setSource(of(loggedTestUser));
      actions.next(new AuthInitCheck());
      effects.initAuth$.subscribe(result => {
        expect(result.payload).toEqual(loggedTestUser);
        expect(result.type).toEqual(AuthActionTypes.LOADED);
      });
    }));
  });

  describe('#loginRequest$', () => {
    // tslint:disable:max-line-length
    it('#loginRequest$ should dispatch AuthLoadedAction if credentials are correct', async(async () => {
      // tslint:enable:max-line-length
      actions = new ReplaySubject(1);

      jest
        .spyOn(angularFireMock.auth, 'signInWithEmailAndPassword')
        .mockReturnValue(
          new Promise(resolve => {
            resolve({ user: loggedTestUser });
          })
        );
      actions.next(new AuthLoginRequest(testUserCredentials));
      effects.loginRequest$.subscribe(result => {
        expect(result.payload).toEqual(loggedTestUser);
        expect(result.type).toEqual(AuthActionTypes.LOGIN_SUCCESS);
      });
    }));

    it('#loginRequest$ should dispatch AuthLoginFail if credentials are wrong', async(async () => {
      actions = new ReplaySubject(1);

      jest
        .spyOn(angularFireMock.auth, 'signInWithEmailAndPassword')
        .mockReturnValue(
          new Promise((__, reject) => {
            reject({ code: AuthErrorsEnum.WRONG_PASSWORD });
          })
        );
      actions.next(new AuthLoginRequest(testUserCredentials));
      effects.loginRequest$.subscribe(result => {
        expect(result.payload).toEqual(wrongCredentialsTestError);
        expect(result.type).toEqual(AuthActionTypes.LOGIN_ERROR);
      });
    }));
  });

  describe('#logoutRequest$', () => {
    it('should dispatch AuthLogoutSuccess', async(async () => {
      actions = new ReplaySubject(1);

      jest.spyOn(angularFireMock.auth, 'signOut').mockReturnValue(
        new Promise(resolve => {
          resolve();
        })
      );

      actions.next(new AuthLogoutRequest());
      effects.logoutRequest$.subscribe(result => {
        expect(result.type).toEqual(AuthActionTypes.LOGOUT_SUCCESS);
      });
    }));

    it('should dispatch AuthLogoutFail on http error', async(async () => {
      actions = new ReplaySubject(1);

      const error: string = 'Http error 500';

      jest.spyOn(angularFireMock.auth, 'signOut').mockReturnValue(
        new Promise((_, reject) => {
          reject({ error });
        })
      );

      actions.next(new AuthLogoutRequest());
      effects.logoutRequest$.subscribe(result => {
        expect(result.type).toEqual(AuthActionTypes.LOGOUT_ERROR);
        expect<AuthLogoutFail>(result.payload);
      });
    }));
  });
});
