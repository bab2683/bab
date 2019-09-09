export interface AuthLoginMail {
  email: string;
  password: string;
}

export interface LoggedUser {
  displayName?: string;
  email: string;
  emailVerified: boolean;
  phoneNumber?: string;
  photoURL?: string;
}

export interface AuthError {
  message: string;
}
