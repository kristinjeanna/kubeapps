describe("My First Test", () => {
  it("Does not do much!", () => {

    const hostname = Cypress.env('INTEGRATION_ENTRYPOINT');
    console.log("Hostname: " + hostname);

    cy.loginOIDC("kubeapps-user@example.com", "password")
    .then((resp) => {
        cy.log("RESPONSE: " + resp.body);
      return resp.body;
    });


    cy.visit(hostname);

    cy.get('cds-button').contains("Login via OIDC Provider").click();

    cy.get('.dex-container button').contains("Log in with Email").click();
    
    cy.get('input[id="login"]').type("kubeapps-user@example.com").should('have.value', "kubeapps-user@example.com");
    cy.get('input[id="password"]').type("password").should('have.value', "password");
    
    cy.get('#submit-login').contains("Login").click();

    cy.get('.dex-container button[type="submit"]').contains("Grant Access").click();
  });
});

beforeEach(() => {
    Cypress.Cookies.preserveOnce('csrftoken');
});