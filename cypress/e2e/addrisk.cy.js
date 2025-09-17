describe("Add Risk Management", () => {
  const randomNum = Cypress._.random(100, 999);
  const qcpName = `QCP-${randomNum}`;
  const riskStatement = `Test Risk Statement ${randomNum}`;
  const riskTerms = `Test Abbreviated Terms ${randomNum}`;
  const productName = `Test Product ${randomNum}`;
  const productManufacturer = `Test Manufacturer ${randomNum}`;
  const DeviceType = `Test DeviceType ${randomNum}`;
  const Test = `Test ${randomNum}`;
  const Analystes = `Test Analystes ${randomNum}`;

  beforeEach(() => {
    cy.loginSession();
    cy.visit("/admin/commerce/products");
    cy.wait(1000);
    cy.location("pathname").should("eq", "/admin/commerce/products");
  });
  it("TC_01- QCP Management", () => {
    cy.get("#toolbar-item-administration").click().click();
    cy.get(".toolbar-icon-commerce-admin-commerce").click();
    cy.get(".management-link--cp-risk-cp-risk-list > .card").click();
    cy.get('[data-original-order="2"] > .tabs__link').click();
    cy.get(".local-actions__item > .button").click();
    cy.get("#edit-add-to-qcp-table").select("Yes");
    cy.get('[name="action[0][value]"]').type(qcpName);
    cy.get('[name="op"]').click();
    cy.contains("QCP created successfully.").should("be.visible");
    cy.contains(qcpName).should("be.visible");
  });

  it("TC_02 - Add QCP into Risk", () => {
    cy.get("#toolbar-item-administration").click().click();
    cy.get(".toolbar-icon-commerce-admin-commerce").click();
    cy.get(".management-link--cp-risk-cp-risk-list > .card").click();
    cy.contains("a", "Create New Risk").click();
    cy.get("#edit-add-to-risk-table").select("Yes");
    cy.get("#edit-category").select("E");
    cy.get("#edit-hazard-risk-statement-0-value").type(riskStatement);
    cy.get("#edit-risk-abbreviated-terms-0-value").type(riskTerms);
    cy.get("#edit-type-of-risk").select("Instrument Risk");
    cy.get("#edit-qcp-ids-0-target-id").type(qcpName);
    cy.get("#edit-submit").click();
    cy.contains(riskStatement).should("be.visible");
  });

  it("TC_03 -Add QCP And Risk Into Product", () => {
    cy.get(":nth-child(1) > .button").click();
    cy.get(":nth-child(1) > .admin-item__title > .admin-item__link").click();
    cy.get("#edit-title-0-value").type(productName);
    cy.get("#edit-field-manufacturer-0-value").type(productManufacturer);
    cy.get("#edit-field-device-0-value").type(DeviceType);
    cy.get("#edit-field-test-0-value").type(Test);
    cy.get("#edit-field-analytes-0-value").type(Analystes);
    cy.get('[name="field_instrument[0][target_id]"]').type(
      "Prabal Instrument System Test"
    );
    cy.contains(".ui-menu-item", "Prabal Instrument System Test").click();
    cy.get("#edit-stores-target-id-value-2").check();
    cy.get("#edit-actions-submit").click();
    cy.contains(productName).should("be.visible");
    cy.get("#edit-title").type(productName);
    cy.get("#edit-submit-commerce-products").click();
    cy.contains("a", "View Risks").click();
    cy.get("#add-risk-button").click();
    cy.get('[name="search_risk"]').type(riskStatement);
    cy.get('[name="search_risks_button"]').click();
    cy.get('input[id^="edit-risk-results-"]').check();
    cy.get('[name="next_step_button"]').click();
    cy.get('[name="submit_all_steps_button"]').click();
    cy.get(".messages__header").should("be.visible");
    cy.get(".views-field-nothing > .button").click();
    // cy.get("#add-qcp-button").click();
    cy.get("#add-qcp-button").click({ force: true });
    // cy.contains("a", "Add QCP").click();
    cy.get('[name="search_qcp"]').type(qcpName);
    cy.get('[name="search_qcp"]').first().click();
    cy.get("#edit-search--8tXGMyTKVrk").click();
    cy.get("#edit-qcp-results-459--9obciBeKwfo").check();
    cy.get("#edit-add-selected--i_NInTG8IwM").click();
  });
});
