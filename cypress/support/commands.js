Cypress.Commands.add("login", (email, password) => {
  cy.get("#edit-name").clear().type(email);
  cy.get("#edit-pass").clear().type(password);
  cy.get("#edit-submit").click();
  cy.url().should(
    "not.include",
    "https://modulemakerdev.pro-qcp.com/user/login"
  );
});

Cypress.Commands.add(
  "loginSession",
  (email = "shraddha.regmi", password = "Shraddha@123") => {
    cy.session([email, password], () => {
      cy.visit("https://modulemakerdev.pro-qcp.com/user/login"); 
      cy.login(email, password); 
    });
  }
);


