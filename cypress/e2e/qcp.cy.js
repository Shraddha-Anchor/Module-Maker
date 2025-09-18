describe("QCP Management", () => {
  const qcpName = `QCP-${Cypress._.random(100, 999)}`;

  beforeEach(() => {
    cy.loginSession();
    cy.visit("/admin/commerce/products");
     cy.wait(1000);
    cy.location("pathname").should("eq", "/admin/commerce/products");
  });
  const goToQCPList = () => {
    cy.get("#toolbar-item-administration").click().click();
    cy.get(".toolbar-icon-commerce-admin-commerce").click();
    cy.get(".management-link--cp-risk-cp-risk-list > .card").click();
    cy.get('[data-original-order="1"] > .tabs__link').click();
  };
  it("TC_01 - Create QCP (Mandatory Field)", () => {
    goToQCPList();
    cy.get(".local-actions__item > .button").click();
    cy.get("#edit-add-to-qcp-table").select("Yes");
    cy.get('[name="action[0][value]"]').type(qcpName);
    cy.get('[name="op"]').click();
    cy.contains("QCP created successfully.").should("be.visible");
    cy.contains(qcpName).should("be.visible");
        cy.wait(2000);
  });

  it("TC_02 - Edit QCP", () => {
    goToQCPList();
    cy.get(`a[aria-label*="${qcpName}"]`).should("be.visible").click();
    const updatedName = `${qcpName} - Edited`;
    cy.get("#edit-action-0-value").clear().type(updatedName);
    cy.get('[name="op"]').click();
    cy.contains(updatedName).should("be.visible");
        cy.wait(2000);
  });

  it("TC_03 - View QCP", () => {
    goToQCPList();
    cy.get(`a[aria-label*="${qcpName}"]`).should("be.visible").click();
    cy.get(".page-title").should("contain.text", qcpName);
    cy.get('[data-original-order="0"] > .tabs__link').click();
        cy.wait(2000);
  });

  it("TC_04 - Delete QCP", () => {
    goToQCPList();
    cy.get(`a[aria-label*="${qcpName}"]`).should("be.visible").click();
    cy.get("#edit-delete").click();
    cy.get('button[type="button"]').contains("Delete").click();
    cy.get(".messages__header").should("be.visible");
        cy.wait(2000);
  });
  it("TC_05 - Create QCP (All Field)", () => {
    goToQCPList();
    cy.get(".local-actions__item > .button").click();
    cy.get("#edit-add-to-qcp-table").select("Yes");
    cy.get('[name="action[0][value]"]').type(qcpName + " All");
    cy.get("#edit-frequency-0-value").type("10");
    cy.get("#edit-criteria-0-value").type("Test Criteria");
    cy.get(
      '[name="citation_text[0][inline_container][field_wrapper_1][agg_id]"]'
    ).select("CAP");
    cy.get('[name="citation_text_add_more"]').click();
    cy.get(
      'select[name="citation_text[1][inline_container][field_wrapper_1][agg_id]"]'
    ).select("ISO 15189");
    cy.get('[name="op"]').click();
    cy.contains("QCP created successfully.").should("be.visible");
    cy.contains(qcpName).should("be.visible");
        cy.wait(2000);
  });
});
