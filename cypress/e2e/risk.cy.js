describe("Risk Management", () => {
  const randomNum = Cypress._.random(100, 999);
  const riskStatement = `Test Risk Statement ${randomNum}`;
  const riskTerms = `Test Abbreviated Terms ${randomNum}`;

  beforeEach(() => {
    cy.loginSession();
    cy.visit("/admin/commerce/products");
     cy.wait(1000);
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
        cy.wait(2000);
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
        cy.wait(2000);
  });
  it("TC_03 - View Recently Edited Risk", () => {
    goToRiskList();
    cy.get("#edit-hazard-risk-statement").type(`${riskStatement} - Edited`);
    cy.get("#edit-risk-abbreviated-terms").type(`${riskTerms} - Edited`);
    cy.get("#edit-type-of-risk").select("Instrument Risk");
    cy.get("#edit-submit-cp-risk-admin").click();
    cy.get(".edit > a").click();
    cy.get('[data-original-order="0"] > .tabs__link').click();
        cy.wait(2000);
  });
  it("TC_04 - Delete Recently Edited Risk", () => {
    goToRiskList();
    cy.get("#edit-hazard-risk-statement").type(riskStatement);
    cy.get("#edit-risk-abbreviated-terms").type(riskTerms);
    cy.get("#edit-type-of-risk").select("Instrument Risk");
    cy.get("#edit-submit-cp-risk-admin").click();
    cy.get(".edit > a").click();
    cy.get("#edit-delete").click();
    cy.contains("button", "Delete").click();
        cy.wait(2000);
  });
  it("TC_05 - Create Risk with All Fields", () => {
    goToRiskList();
    cy.contains("a", "Create New Risk").click();
    cy.get("#edit-add-to-risk-table").select("Yes");
    cy.get("#edit-category").select("E");
    cy.get("#edit-hazard-risk-statement-0-value").type(riskStatement + " All");
    cy.get("#edit-risk-abbreviated-terms-0-value").type(riskTerms + " All");
    cy.get("#edit-type-of-risk").select("Instrument Risk");
    cy.get('[name="activity"]').select("collection");
    cy.get('input[data-drupal-selector="edit-qcp-ids-0-target-id"]')
      .should("be.visible")
      .clear()
      .type("QCP", { delay: 100 })
      .wait(2000);
    cy.get(".ui-menu-item-wrapper").contains("QCP").click();
    cy.get('[name="op"]').click();
    cy.contains(riskStatement).should("be.visible");
        cy.wait(2000);
  });
});
