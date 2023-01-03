import { getTokenCookieValue } from '../../test/helpers/auth';

before(() => {
  cy.task('db:truncate');
  cy.task('db:seed');
})

describe('Workflow UI date filtering', () => {
  it('Can filter certain way', () => {
    
    const cookie = getTokenCookieValue(false, 'joe', Cypress.env('COOKIE_SECRET'));
    cy.setCookie('token', cookie, { secure: false })
    
    cy.visit('/workflow-ui');

    cy.contains('apply');
  })
  it('Can filter another way', () => {
    
    const cookie = getTokenCookieValue(false, 'joe', Cypress.env('COOKIE_SECRET'));
    cy.setCookie('token', cookie, { secure: false })
    
    cy.visit('/workflow-ui');

    cy.contains('apply');
  })
})