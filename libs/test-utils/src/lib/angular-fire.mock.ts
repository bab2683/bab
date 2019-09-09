import { MockObservable } from './rxjs.mock';

export const angularFireMock: {
  auth: {
    signInWithEmailAndPassword: () => any;
    signOut: () => any;
  };
  user: MockObservable<any>;
} = {
  auth: {
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn()
  },
  user: new MockObservable()
};
