import { getTokenCookieValue } from '../../test/helpers/auth';


describe('Workflow UI', () => {
  it('Can visit the Jobs page', () => {
    const cookie = getTokenCookieValue(false, 'joe', Cypress.env('COOKIE_SECRET'));
    cy.setCookie('token', cookie, { secure: false })
    cy.visit('/workflow-ui');
  })
})