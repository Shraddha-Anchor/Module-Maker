describe("Create Risk", () => {
  beforeEach(() => {
    cy.visit("https://modulemakerdev.pro-qcp.com/user/login");
    cy.login("shraddha.regmi", "Shraddha@123");
    cy.location("pathname").should("eq", "/admin/commerce/products");
  });
  it("TC_01 - Create Risk", () => {
    cy.get("#toolbar-item-administration").click().click();
    cy.get(".toolbar-icon-commerce-admin-commerce").click();
    cy.get(".management-link--cp-risk-cp-risk-list > .card").click();
    cy.contains("a", "Create New Risk").click();
    cy.get("#edit-add-to-risk-table").select("Yes");
    cy.get("#edit-category").select("E");
    cy.get("#edit-hazard-risk-statement-0-value").type("Test Risk Statement");
    cy.get("#edit-risk-abbreviated-terms-0-value").type(
      "Test Abbreviated Terms"
    );
    cy.get("#edit-type-of-risk").select("Instrument Risk");
    cy.get("#edit-submit").click();
  });
  it("TC_02 - Edit Risk", () => {
    cy.get("#toolbar-item-administration").click().click();
    cy.get(".toolbar-icon-commerce-admin-commerce").click();
      cy.get(".management-link--cp-risk-cp-risk-list > .card").click();
      
  });
});
