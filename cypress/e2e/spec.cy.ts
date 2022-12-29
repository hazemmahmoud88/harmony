import { getTokenCookieValue } from '../../test/helpers/auth';
import '../helpers/env';

describe('Workflow UI', () => {
  it('Can visit the Jobs page', () => {
    const cookie = getTokenCookieValue(false, 'joe', process.env.COOKIE_SECRET);
    cy.setCookie('token', cookie, { secure: false })
    cy.visit('http://localhost:1234/workflow-ui');
  })
})