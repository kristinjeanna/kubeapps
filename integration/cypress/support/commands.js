// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("loginOIDC", (email, pw) => {
  cy.log("Login via OIDC: " + Cypress.env("AUTH_URL"));

  let body = {
      grant_type: "password",
      username: email,
      password: pw,
      //audience: Cypress.env("AUTH_AUDIENCE"),
      scope: "openid email groups",
      client_id: Cypress.env("AUTH_CLIENT_ID"),
      client_secret: Cypress.env("AUTH_CLIENT_SECRET"),
  };
  return cy.request("POST", Cypress.env("AUTH_URL"), body);
});
