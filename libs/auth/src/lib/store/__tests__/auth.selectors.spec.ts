import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { loggedTestUser } from '../../../../__mocks__';

import { AuthLoadedAction } from '../auth.actions';
import { authReducer } from '../auth.reducer';
import {
  getAuthLoadingState,
  getAuthState,
  getLoggedUser
} from '../auth.selectors';
import { AuthState, initialAuthState } from '../auth.state';

describe('AuthState Selectors', () => {
  let store: Store<AuthState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ auth: authReducer })]
    });
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getAuthLoadingState', () => {
    it('should return the state current status', () => {
      let result;

      store.select(getAuthLoadingState).subscribe(value => (result = value));
      expect(result).toEqual(true);

      store.dispatch(new AuthLoadedAction(null));

      expect(result).toEqual(false);
    });
  });

  describe('getAuthState', () => {
    it('should return the state current status', () => {
      let result;

      store.select(getAuthState).subscribe(value => (result = value));

      expect(result).toEqual(initialAuthState);
    });
  });

  describe('getLoggedUser', () => {
    it('should return the state current status', () => {
      let result;

      store.select(getLoggedUser).subscribe(value => (result = value));

      expect(result).toEqual(null);

      store.dispatch(new AuthLoadedAction({ ...loggedTestUser }));

      expect(result).toEqual(loggedTestUser);
    });
  });
});
