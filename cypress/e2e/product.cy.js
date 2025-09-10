describe("Risk Management", () => {
  const productNum = Cypress._.random(100, 999);
  const productName = `Test Product ${productNum}`;
  const productManufacturer = `Test Manufacturer ${productNum}`;
  const DeviceType = `Test DeviceType ${productNum}`;
  const Test = `Test ${productNum}`;
  const Analystes = `Test Analystes ${productNum}`;

  beforeEach(() => {
    cy.visit("https://modulemakerdev.pro-qcp.com/user/login");
    cy.login("shraddha.regmi", "Shraddha@123");
    cy.location("pathname").should("eq", "/admin/commerce/products");
  });

  const goToRiskList = () => {
    cy.get("#toolbar-item-administration").click().click();
    cy.get(".toolbar-icon-commerce-admin-commerce").click();
    cy.get(
      ".management-link--entity-commerce-product-collection > .card"
    ).click();
  };

  it("TC_01 - Create Product", () => {
    goToRiskList();
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
  });

  it("TC_02 - Edit Product", () => {
    goToRiskList();
    cy.get("#edit-title").type(productName);
    cy.get("#edit-submit-commerce-products").click();
    cy.get(`a[aria-label*="Edit ${productName}"]`).click();
    cy.get("#edit-title-0-value").clear().type(`${productName} Edited`);
    cy.get("#edit-field-manufacturer-0-value")
      .clear()
      .type(`${productManufacturer} Edited`);
    cy.get("#edit-field-device-0-value").clear().type(`${DeviceType} Edited`);
    cy.get("#edit-field-test-0-value").clear().type(`${Test} Edited`);
    cy.get("#edit-field-analytes-0-value").clear().type(`${Analystes} Edited`);
    cy.get("#edit-actions-submit").click();
    cy.contains(`${productName} Edited`).should("be.visible");
  });
  it("TC_03 - Delete Product", () => {
    goToRiskList();
    cy.get("#edit-title").type(productName);
    cy.get("#edit-submit-commerce-products").click();
    cy.get(`a[aria-label*="Edit ${productName}"]`).click();
    cy.get("#edit-actions-delete").click();
    cy.get(".ui-dialog-buttonset > .button--primary").click();
    cy.contains(`The product ${productName} Edited has been deleted.`).should(
      "be.visible"
    );
  });
});
