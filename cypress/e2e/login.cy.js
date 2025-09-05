const selectors = {
  email: "#edit-name",
  password: "#edit-pass",
  submit: "#edit-submit",
};
describe("ModuleMaker Login Tests", () => {
  beforeEach(() => {
    cy.visit("https://modulemakerdev.pro-qcp.com/user/login");
  });

  it("TC_01 - Valid Login", () => {
    cy.login("shraddha.regmi", "Shraddha@123");
    cy.location("pathname").should("eq", "/admin/commerce/products");
  });

  it("TC_02 - Invalid Login", () => {
    cy.login("Wrong", "Wrong");
    cy.contains("Unrecognized username or password").should("be.visible");
  });

  it("TC_03 - Blank Login", () => {
    cy.get(selectors.submit).click();
    cy.get(`${selectors.email}:invalid`).should("exist");
    cy.get(`${selectors.password}:invalid`).should("exist");
  });

  it("TC_04 - Valid Username and Blank Password", () => {
    cy.get(selectors.email).type("shraddha.regmi");
    cy.get(selectors.submit).click();
    cy.get(`${selectors.password}:invalid`).should("exist");
  });

  it("TC_05 - Blank Username and Valid Password", () => {
    cy.get(selectors.password).type("Shraddha@123");
    cy.get(selectors.submit).click();
    cy.get(`${selectors.email}:invalid`).should("exist");
  });

  it("TC_06 - Capital Username and Valid Password", () => {
    cy.login("Shraddha.regmi", "Shraddha@123");
    cy.get(`${selectors.email}:invalid`).should("exist");
  });

  it("TC_07 - Remember me", () => {
    cy.get(selectors.email).type("shraddha.regmi");
    cy.get(selectors.password).type("Shraddha@123");
    cy.get('[name="persistent_login"]').check().should("be.checked");
    cy.get(selectors.submit).click();
    cy.get("#toolbar-item-user").click();
    cy.get(".logout > a").click();
    cy.get(selectors.username).should("have.value", "shraddha.regmi");
  });
  it("TC_08 - Forgot Password", () => {
    cy.get(".reset_text > .switcher-text").click();
    cy.location("pathname").should("eq", "/user/password");
    cy.get("h1").should("have.text", "Module Maker Reset your password");
  });
});
