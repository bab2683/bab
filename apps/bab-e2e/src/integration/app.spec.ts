import { getGreeting } from '../support/app.po';

describe('bab', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to bab!');
  });
});
