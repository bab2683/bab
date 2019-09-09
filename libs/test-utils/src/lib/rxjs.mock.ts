import { EMPTY, Observable, Operator } from 'rxjs';

export class MockObservable<T> extends Observable<T> {
  public source: Observable<any> = EMPTY;

  /**
   * Overriding lift function mocks .pipe() function
   */
  public lift<R>(operator: Operator<T, R>): Observable<R> {
    const observable = new MockObservable<R>();
    observable.source = this;
    observable.operator = operator;
    return observable;
  }

  /**
   * Set's source for mock observable
   */
  public setSource(source: Observable<T>): void {
    this.source = source;
  }
}
