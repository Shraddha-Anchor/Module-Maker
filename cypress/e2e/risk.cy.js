describe("Risk Management", () => {
  const randomNum = Cypress._.random(100, 999);
  const riskStatement = `Test Risk Statement ${randomNum}`;
  const riskTerms = `Test Abbreviated Terms ${randomNum}`;

  beforeEach(() => {
    cy.visit("https://modulemakerdev.pro-qcp.com/user/login");
    cy.login("shraddha.regmi", "Shraddha@123");
    cy.location("pathname").should("eq", "/admin/commerce/products");
  });

  const goToRiskList = () => {
    cy.get("#toolbar-item-administration").click().click();
    cy.get(".toolbar-icon-commerce-admin-commerce").click();
    cy.get(".management-link--cp-risk-cp-risk-list > .card").click();
  };

  it("TC_01 - Create Risk", () => {
    goToRiskList();
    cy.contains("a", "Create New Risk").click();
    cy.get("#edit-add-to-risk-table").select("Yes");
    cy.get("#edit-category").select("E");
    cy.get("#edit-hazard-risk-statement-0-value").type(riskStatement);
    cy.get("#edit-risk-abbreviated-terms-0-value").type(riskTerms);
    cy.get("#edit-type-of-risk").select("Instrument Risk");
    cy.get("#edit-submit").click();
    cy.contains(riskStatement).should("be.visible");
  });
  it("TC_02 - Edit Recently Created Risk", () => {
    goToRiskList();
    cy.get("#edit-hazard-risk-statement").type(riskStatement);
    cy.get("#edit-risk-abbreviated-terms").type(riskTerms);
    cy.get("#edit-type-of-risk").select("Instrument Risk");
    cy.get("#edit-submit-cp-risk-admin").click();
    cy.get(".edit > a").click();

    cy.get("#edit-hazard-risk-statement-0-value")
      .clear()
      .type(`${riskStatement} - Edited`);
    cy.get("#edit-risk-abbreviated-terms-0-value")
      .clear()
      .type(`${riskTerms} - Edited`);
    cy.get("#edit-submit").click();
    cy.contains(`${riskStatement} - Edited`).should("be.visible");
  });
  it("TC_03 - Delete Recently Edited Risk", () => {
    goToRiskList();
    cy.get("#edit-hazard-risk-statement").type(riskStatement);
    cy.get("#edit-risk-abbreviated-terms").type(riskTerms);
    cy.get("#edit-type-of-risk").select("Instrument Risk");
    cy.get("#edit-submit-cp-risk-admin").click();
    cy.get(".edit > a").click();
    cy.get("#edit-delete").click();
    cy.contains("button", "Delete").click();
  });
});
