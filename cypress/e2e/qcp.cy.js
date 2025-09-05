describe("ModuleMaker Login Tests", () => {
  beforeEach(() => {
    cy.visit("https://modulemakerdev.pro-qcp.com/user/login");
  });

  it("TC_01 - Create QCP", () => {
    cy.login("shraddha.regmi", "Shraddha@123");
    cy.location("pathname").should("eq", "/admin/commerce/products");
    cy.get("#toolbar-item-administration").click();
    // cy.get(".toolbar-icon-commerce-admin-commerce").should("be.visible");
    // cy.get(".toolbar-icon-commerce-admin-commerce")
    //   .should("be.visible")
    //   .click();
  });
});
