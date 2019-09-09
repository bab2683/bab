import {
  genericTestError,
  mockFirebaseGenericError,
  mockFirebaseUser,
  mockFirebaseWrongPasswordError,
  wrongCredentialsTestError
} from '../../../../__mocks__';

import { getRelevantUserData, parseLoginError } from '../auth.utils';

describe('auth utils', () => {
  describe('parseLoginError', () => {
    it('should return wrong credentials error', () => {
      expect(parseLoginError(mockFirebaseWrongPasswordError)).toEqual(
        wrongCredentialsTestError
      );
    });

    it('should return genereic error', () => {
      expect(parseLoginError(mockFirebaseGenericError)).toEqual(
        genericTestError
      );
    });
  });

  describe('getRelevantUserData', () => {
    it('should parse the data received', () => {
      expect(getRelevantUserData(mockFirebaseUser)).toEqual(mockFirebaseUser);
    });
  });
});
