describe("Product Management", () => {
  const productNum = Cypress._.random(100, 999);
  const productName = `Test Product ${productNum}`;
  const productManufacturer = `Test Manufacturer ${productNum}`;
  const deviceType = `Test DeviceType ${productNum}`;
  const testType = `Test ${productNum}`;
  const analytes = `Test Analytes ${productNum}`;
  const editedProductName = `${productName} Edited`;

  // Reusable helper: Fill product form
  const fillProductForm = (name, manufacturer, device, test, analytes) => {
    cy.get('[name="title[0][value]"]').clear().type(name);
    cy.get('[name="field_manufacturer[0][value]"]').clear().type(manufacturer);
    cy.get('[name="field_device[0][value]"]').clear().type(device);
    cy.get('[name="field_test[0][value]"]').clear().type(test);
    cy.get('[name="field_analytes[0][value]"]').clear().type(analytes);
  };

  // Reusable helper: Add variation
  const addVariation = (title, sku, price = "199", plan = "Annual") => {
    cy.get(".button").click();
    cy.get('[name="title[0][value]"]').type(title);
    cy.get('[name="sku[0][value]"]').type(sku);
    cy.get('[name="price[0][number]"]').type(price);
    cy.get('[name="attribute_subscription_plan"]').select(plan);
    cy.get('[name="op"]').click();
  };

  // Reusable helper: Search and edit product
  const searchAndEdit = (name) => {
    cy.get('[name="title"]').clear().type(name);
    cy.get("#edit-submit-commerce-products").click();
    cy.get(".edit > a, a[aria-label*='Edit']").first().click();
  };

  beforeEach(() => {
    cy.loginSession();
    cy.visit("/admin/commerce/products");
     cy.wait(1000);
    cy.location("pathname").should("eq", "/admin/commerce/products");
  });

  // ---------------- Assay Panel ----------------
  it("TC_01 - Create Product Requried Field (Assay Panel)", () => {
    cy.get(":nth-child(1) > .button").click();
    cy.get(":nth-child(1) > .admin-item__title > .admin-item__link").click();

    fillProductForm(
      productName,
      productManufacturer,
      deviceType,
      testType,
      analytes
    );

    cy.get('[name="field_instrument[0][target_id]"]').type(
      "Prabal Instrument System Test"
    );
    cy.contains(".ui-menu-item", "Prabal Instrument System Test").click();

    cy.get("#edit-actions-submit").click();
    cy.location("pathname").should("eq", "/admin/commerce/products");
  });
  it("TC_02 - Edit Product", () => {
    cy.get("#edit-title").clear().type(productName);
    cy.get("#edit-submit-commerce-products").click();

    cy.get(`a[aria-label*="Edit ${productName}"]`).click();
    fillProductForm(
      editedProductName,
      `${productManufacturer} Edited`,
      `${deviceType} Edited`,
      `${testType} Edited`,
      `${analytes} Edited`
    );
    cy.get("#edit-actions-submit").click();

    cy.contains(editedProductName).should("be.visible");
  });

  it("TC_03 - Delete Product", () => {
    cy.get("#edit-title").clear().type(editedProductName);
    cy.get("#edit-submit-commerce-products").click();
    cy.get(`a[aria-label*="Edit ${editedProductName}"]`).click();
    cy.get("#edit-actions-delete").click();
    cy.get(".ui-dialog-buttonset > .button--primary").click();
    cy.contains(`The product ${editedProductName} has been deleted.`).should(
      "be.visible"
    );
  });

  it("TC_04 - Add Variation", () => {
    cy.get(":nth-child(1) > .button").click();
    cy.get(":nth-child(1) > .admin-item__title > .admin-item__link").click();

    fillProductForm(
      productName,
      productManufacturer,
      deviceType,
      testType,
      analytes
    );

    cy.get('[name="field_instrument[0][target_id]"]').type(
      "Prabal Instrument System Test"
    );
    cy.contains(".ui-menu-item", "Prabal Instrument System Test").click();
    cy.get('[name="field_assays[0][target_id]"]').type("ABC");

    cy.get("#edit-actions-submit-continue").click();
    addVariation(`Variation ${productNum}`, `SKU-${productNum}`);
  });
  it("TC_05 - Create Product ALL Field (Assay Panel)", () => {
    cy.get(":nth-child(1) > .button").click();
    cy.get(":nth-child(1) > .admin-item__title > .admin-item__link").click();

    fillProductForm(
      productName + " All",
      productManufacturer + "All",
      deviceType,
      testType,
      analytes
    );
    cy.get("#edit-field-is-demo-0-value").type("Yes");
    cy.get("#edit-field-part-0-value").type("12345");
    cy.get("#edit-field-version-0-value").type("1.0");
    cy.get("#edit-field-sort-0-value").type("10");
    cy.get("#edit-field-matrix-id-0-value").type("Matrix ID");
    cy.get('[name="field_reagent[0][value]"]').type("Reagent");
    cy.get('[name="field_cartidge[0][value]"]').type("Cartidge");
    cy.get('[name="field_cartidge[0][value]"]').type("Cartidge");
    cy.get('[name="field_instrument_large[0][value]"]').type(
      "Instrument Large"
    );
    cy.get('[name="field_instrument_small[0][value]"]').type(
      "Instrument Small"
    );
    cy.get('[name="field_consumable_large[0][value]"]').type(
      "Consumable Large"
    );
    cy.get('[name="field_consumable_port_l[0][value]"]').type(
      "Consumable Port L"
    );
    cy.get('[name="field_sample_probe[0][value]"]').type("Sample Probe");
    cy.get('[name="field_lqc[0][value]"]').type("LQC");
    cy.get('[name="field_lqc[0][value]"]').type("LQC1");
    cy.get('[name="field_lqc[0][value]"]').type("LQC2");
    cy.get('[name="field_lqc[0][value]"]').type("LQC3");
    cy.get('[name="field_lqc[0][value]"]').type("LQC4");
    cy.get('[name="field_lqc[0][value]"]').type("LQC5");
    cy.get('[name="field_lqc[0][value]"]').type("LQC6");

    cy.get('[name="field_instrument[0][target_id]"]').type(
      "Prabal Instrument System Test"
    );
    cy.contains(".ui-menu-item", "Prabal Instrument System Test").click();

    cy.get("#edit-actions-submit").click();
    cy.location("pathname").should("eq", "/admin/commerce/products");
  });

  // // ---------------- Instrument ----------------
  it("TC_06 - Create Product Requried Field (Instrument)", () => {
    cy.get(":nth-child(1) > .button").click();
    cy.get(":nth-child(4) > .admin-item__title > .admin-item__link").click();

    fillProductForm(
      productName + " Ins",
      productManufacturer + " Ins",
      deviceType,
      testType,
      analytes
    );

    cy.get("#edit-actions-submit").click();
    cy.location("pathname").should("eq", "/admin/commerce/products");
  });

  it("TC_07 - Add Variation to Existing Product (Instrument)", () => {
    searchAndEdit(productName + " Ins");

    cy.get(".js-active-tab > .tabs__link").click();
    cy.get('[data-original-order="2"] > .tabs__link').click();

    addVariation(`Instrument VAR ${productNum}`, `SKU-INS${productNum}`);
  });

  it("TC_08 - Delete Product (Instrument)", () => {
    searchAndEdit(productName + " Ins");
    cy.get("#edit-actions-delete").click();
    cy.get(".ui-dialog-buttonset > .button--primary").click();
  });
  it("TC_09 - Create Product (Instrument Variation)", () => {
    cy.get(":nth-child(1) > .button").click();
    cy.get(":nth-child(4) > .admin-item__title > .admin-item__link").click();

    fillProductForm(
      productName + "VAR-Ins",
      productManufacturer + " Ins",
      deviceType,
      testType,
      analytes
    );

    cy.get("#edit-actions-submit-continue").click();
    addVariation(`Instrument ${productNum}`, `SKU-INS-${productNum}`);
    cy.location("pathname").should("contain", "/product/");
  });
  it("TC_10 - Create Product All Field (Instrument)", () => {
    cy.get(":nth-child(1) > .button").click();
    cy.get(":nth-child(4) > .admin-item__title > .admin-item__link").click();

    fillProductForm(
      productName + " Ins All",
      productManufacturer + " Ins All",
      deviceType,
      testType,
      analytes
    );

    cy.get("#edit-field-is-demo-0-value").type("Yes");
    cy.get("#edit-field-part-0-value").type("12345");
    cy.get("#edit-field-version-0-value").type("1.0");
    cy.get("#edit-field-sort-0-value").type("10");
    cy.get("#edit-field-matrix-id-0-value").type("Matrix ID");
    cy.get('[name="field_reagent[0][value]"]').type("Reagent");
    cy.get('[name="field_cartidge[0][value]"]').type("Cartidge");
    cy.get('[name="field_cartidge[0][value]"]').type("Cartidge");
    cy.get('[name="field_instrument_large[0][value]"]').type(
      "Instrument Large"
    );
    cy.get('[name="field_instrument_small[0][value]"]').type(
      "Instrument Small"
    );
    cy.get('[name="field_consumable_large[0][value]"]').type(
      "Consumable Large"
    );
    cy.get('[name="field_consumable_port_l[0][value]"]').type(
      "Consumable Port L"
    );
    cy.get('[name="field_sample_probe[0][value]"]').type("Sample Probe");
    cy.get('[name="field_lqc[0][value]"]').type("LQC");

    cy.get("#edit-actions-submit").click();
    cy.location("pathname").should("eq", "/admin/commerce/products");
  });

  // ---------------- PRO-QCP ----------------
  it("TC_11 - Create Product (PRO-QCP)", () => {
    cy.get(":nth-child(1) > .button").click();
    cy.get(":nth-child(2) > .admin-item__title > .admin-item__link").click();

    fillProductForm(
      productName + " QCP",
      productManufacturer + " QCP",
      deviceType,
      testType,
      analytes
    );

    cy.get("#edit-actions-submit").click();
    cy.location("pathname").should("eq", "/admin/commerce/products");
  });

  it("TC_12 - Add Variation to Existing Product (PRO-QCP)", () => {
    searchAndEdit(productName + " QCP");

    cy.get(".js-active-tab > .tabs__link").click();
    cy.get('[data-original-order="2"] > .tabs__link').click();

    addVariation(`QCP VAR ${productNum}`, `SKU-QCP${productNum}`);
  });

  it("TC_13 - Delete Product (QCP)", () => {
    searchAndEdit(productName + " QCP");
    cy.get("#edit-actions-delete").click();
    cy.get(".ui-dialog-buttonset > .button--primary").click();
  });

  it("TC_14 - Create Product (QCP Variation)", () => {
    cy.get(":nth-child(1) > .button").click();
    cy.get(":nth-child(2) > .admin-item__title > .admin-item__link").click();

    fillProductForm(
      productName + " QCP VAR",
      productManufacturer + " QCP VAR",
      deviceType,
      testType,
      analytes
    );

    cy.get("#edit-actions-submit-continue").click();
    addVariation(`QCP ${productNum}`, `SKU-QCP-${productNum}`);
  });
  it("TC_15 - Create Product All Field (PRO-QCP)", () => {
    cy.get(":nth-child(1) > .button").click();
    cy.get(":nth-child(2) > .admin-item__title > .admin-item__link").click();
    fillProductForm(
      productName + " QCP All",
      productManufacturer + " QCP All",
      deviceType,
      testType,
      analytes
    );
    cy.get("#edit-field-is-demo-0-value").type("Yes");
    cy.get("#edit-field-part-0-value").type("12345");
    cy.get("#edit-field-version-0-value").type("1.0");
    cy.get("#edit-field-sort-0-value").type("10");
    cy.get("#edit-field-matrix-id-0-value").type("Matrix ID");
    cy.get('[name="field_reagent[0][value]"]').type("Reagent");
    cy.get('[name="field_cartidge[0][value]"]').type("Cartidge");
    cy.get('[name="field_instrument_large[0][value]"]').type(
      "Instrument Large"
    );
    cy.get('[name="field_instrument_small[0][value]"]').type(
      "Instrument Small"
    );
    cy.get('[name="field_consumable_large[0][value]"]').type(
      "Consumable Large"
    );
    cy.get('[name="field_consumable_port_l[0][value]"]').type(
      "Consumable Port L"
    );
    cy.get('[name="field_sample_probe[0][value]"]').type("Sample Probe");
    cy.get('[name="field_lqc[0][value]"]').type("LQC");
    cy.get("#edit-actions-submit").click();
    cy.location("pathname").should("eq", "/admin/commerce/products");
  });
});
