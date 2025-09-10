describe("QCP Management", () => {
  const qcpName = `QCP-${Cypress._.random(100, 999)}`;

  beforeEach(() => {
    cy.visit("https://modulemakerdev.pro-qcp.com/user/login");
    cy.login("shraddha.regmi", "Shraddha@123");
    cy.location("pathname").should("eq", "/admin/commerce/products");
  });

  const goToQCPList = () => {
    cy.get("#toolbar-item-administration").click().click();
    cy.get(".toolbar-icon-commerce-admin-commerce").click();
    cy.get(".management-link--cp-risk-cp-risk-list > .card").click();
    cy.get('[data-original-order="2"] > .tabs__link').click();
  };

  it("TC_01 - Create QCP", () => {
    goToQCPList();

    cy.get(".local-actions__item > .button").click();
    cy.get("#edit-add-to-qcp-table").select("Yes");
    cy.get('[name="action[0][value]"]').type(qcpName);
    cy.get('[name="op"]').click();
    cy.contains("QCP created successfully.").should("be.visible");
    cy.contains(qcpName).should("be.visible");
  });

  it("TC_02 - Edit QCP", () => {
    goToQCPList();
    cy.get(`a[aria-label*="${qcpName}"]`).should("be.visible").click();
    const updatedName = `${qcpName} - Edited`;
    cy.get("#edit-action-0-value").clear().type(updatedName);
    cy.get('[name="op"]').click();
    cy.contains(updatedName).should("be.visible");
  });
  
  it("TC_03 - Delete QCP", () => 
  {
    goToQCPList();
    cy.get(`a[aria-label*="${qcpName}"]`).should("be.visible").click();
    cy.get("#edit-delete").click();
    cy.get('button[type="button"]').contains("Delete").click();
    cy.get(".messages__header").should("be.visible");
  });
});
