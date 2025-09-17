describe("Accrediting Agency", () => {
  const acerName = `${Cypress._.random(100, 999)}`;
  beforeEach(() => {
    cy.loginSession();
    cy.visit("/admin/commerce/products");
     cy.wait(1000);
    cy.location("pathname").should("eq", "/admin/commerce/products");
  });
  const goToAccreditingAgency = () => {
    cy.get("#toolbar-item-administration").click().click();
    cy.get(".toolbar-icon-commerce-admin-commerce").click();
    cy.get(".management-link--cp-risk-cp-risk-list > .card").click();
    cy.get('[data-original-order="2"] > .tabs__link').click();
  };
  it("TC_01- Accrediting Agency Management", () => {
    goToAccreditingAgency();
    cy.get(".local-actions__item > .button").click();
    cy.get('[name="title[0][value]"]').type("Acer" + acerName);
    cy.get('[name="citation_text[0][citation]"]').type("XYZ Citation");
    cy.get('[name="citation_text[0][text]"]').type("Text Message");
    cy.get('[name="citation_text_add_more"]').click();
    cy.get('[name="citation_text[1][citation]"]').type("ABC Citation 123");
    cy.get('[name="op"]').click();
    cy.get(".messages-list__item").should("be.visible");
  });
  it("TC_02- Edit Accrediting Agency", () => {
    goToAccreditingAgency();
    cy.get('[name="title"]').type("Acer" + acerName);
    cy.get("#edit-actions").click();
    cy.get(
      ":nth-child(1) > .views-field-operations > .dropbutton-wrapper > .dropbutton-widget > .dropbutton > .edit > a"
    ).click();
    cy.get('[name="citation_text[0][citation]"]')
      .clear()
      .type("XYZ Citation Edited");
    cy.get('[name="citation_text_1_remove_button"]').click();
    cy.get('[name="op"]').click();
  });
  it("TC_03 - View Accrediting Agency", () => {
    goToAccreditingAgency();
    cy.get('[name="title"]').type("Acer" + acerName);
    cy.get("#edit-actions").click();
    cy.get(
      ":nth-child(1) > .views-field-operations > .dropbutton-wrapper > .dropbutton-widget > .dropbutton > .edit > a"
    ).click();
    cy.get('[data-original-order="0"] > .tabs__link').click();
  });

  it("TC_04 - Export Accrediting Agency", () => {
    goToAccreditingAgency();
    cy.get("#edit-export-actions").select("Acer" + acerName);
    cy.get("#edit-export-submit").click();
  });
  it("TC_05 - Import previously exported CSV", () => {
    goToAccreditingAgency();
    cy.get(":nth-child(2) > .button").click();
    const filePath = `cypress/downloads/Acer${acerName}.csv`;
    cy.get('[name="files[csv_file]"]').selectFile(filePath);
    cy.get("#edit-submit").click();
  });
  it("TC_06- Delete Accrediting Agency", () => {
    goToAccreditingAgency();
    cy.get('[name="title"]').type("Acer" + acerName);
    cy.get("#edit-actions").click();
    cy.get(".edit > a").click();
    cy.get("#edit-delete").click();
    cy.get(".ui-dialog-buttonset > .button--primary").click();
    cy.get(".messages-list__item").should("be.visible");
  });
  it("TC_07- Accrediting Agency Management - Duplicate", () => {
    goToAccreditingAgency();
    cy.get(".local-actions__item > .button").click();
    cy.get('[name="title[0][value]"]').type("Duplicate" + acerName);
    cy.get('[name="citation_text[0][citation]"]').type("XYZ Citation");
    cy.get('[name="citation_text[0][text]"]').type("Text Message");
    cy.get('[name="citation_text_add_more"]').click();
    cy.get('[name="citation_text[1][citation]"]').type("ABC Citation 123");
    cy.get('[name="op"]').click();
    cy.get(".messages-list__item").should("be.visible");

    cy.get(".local-actions__item > .button").click();
    cy.get('[name="title[0][value]"]').type("Duplicate" + acerName);
    cy.get('[name="citation_text[0][citation]"]').type("XYZ Citation");
    cy.get('[name="citation_text[0][text]"]').type("Text Message");
    cy.get('[name="citation_text_add_more"]').click();
    cy.get('[name="citation_text[1][citation]"]').type("ABC Citation 123");
    cy.get('[name="op"]').click();
    cy.get(".messages-list__item").should("be.visible");
  });
});
