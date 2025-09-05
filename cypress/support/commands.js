Cypress.Commands.add("login", (email, password) => {
  cy.get("#edit-name").clear().type(email);
  cy.get("#edit-pass").clear().type(password);
  cy.get("#edit-submit").click();
});
