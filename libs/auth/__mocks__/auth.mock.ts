import { FirebaseError } from 'firebase';

import { AuthErrorsEnum } from '../src/lib/auth.enum';
import { AuthError, AuthLoginMail, LoggedUser } from '../src/lib/auth.model';
import { parseLoginError } from '../src/lib/utils';

export const mockFirebaseUser: any = {
  displayName: 'Braulio',
  email: 'barahona.braulio@gmail.com',
  emailVerified: true,
  phoneNumber: '+3912345678',
  photoURL: ''
};

export const testUserCredentials: AuthLoginMail = {
  email: 'barahona.braulio@gmail.com',
  password: '123pass'
};

export const loggedTestUser: LoggedUser = {
  email: 'barahona.braulio@gmail.com',
  emailVerified: false
};

export const wrongCredentialsTestError: AuthError = parseLoginError({
  code: AuthErrorsEnum.WRONG_PASSWORD
} as FirebaseError);

export const genericTestError: AuthError = parseLoginError({
  code: 'generic'
} as FirebaseError);

export const mockFirebaseWrongPasswordError: FirebaseError = {
  code: AuthErrorsEnum.WRONG_PASSWORD,
  message: '',
  name: ''
};

export const mockFirebaseGenericError: FirebaseError = {
  code: 'generic',
  message: '',
  name: ''
};
