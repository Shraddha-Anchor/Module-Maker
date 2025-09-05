describe("Add QCP", () => {
  const qcpName = `QCP - ${Date.now()}`;
  
  beforeEach(() => {
    cy.visit("https://modulemakerdev.pro-qcp.com/user/login");
    cy.login("shraddha.regmi", "Shraddha@123");
    cy.location("pathname").should("eq", "/admin/commerce/products");
  });
  // it("not this one", () => {
  it("TC_01 - Create QCP", () => {
    cy.get("#toolbar-item-administration").click().click();
    cy.get(".toolbar-icon-commerce-admin-commerce").click();
    cy.get(".management-link--cp-risk-cp-risk-list > .card").click();
    cy.get('[data-original-order="2"] > .tabs__link').click();
    cy.get(".local-actions__item > .button").click();
    cy.get("#edit-add-to-qcp-table").select("Yes");
    cy.get('[name="action[0][value]"]').type(qcpName);
    cy.get('[name="op"]').click();
    cy.contains("QCP created successfully.").should("be.visible");
  });
  // it("not this one", () => {
  it("TC_02 - Edit QCP", () => {
    cy.get("#toolbar-item-administration").click().click();
    cy.get(".toolbar-icon-commerce-admin-commerce").click();
    cy.get(".management-link--cp-risk-cp-risk-list > .card").click();
    cy.get('[data-original-order="2"] > .tabs__link').click();

    // Click the QCP created in TC_01
    cy.get(`a[aria-label*="${qcpName}"]`).should("be.visible").click();
    cy.get("#edit-action-0-value").clear().type(`${qcpName} - Edited`);
    cy.get('[name="op"]').click();
    cy.contains(`${qcpName} - Edited`).should("be.visible");
  });
  // it.only("only run this one", () => {
  it("TC_03 - Delete QCP", () => {
    cy.get("#toolbar-item-administration").click().click();
    cy.get(".toolbar-icon-commerce-admin-commerce").click();
    cy.get(".management-link--cp-risk-cp-risk-list > .card").click();
    cy.get('[data-original-order="2"] > .tabs__link').click();
    cy.get(`a[aria-label*="${qcpName}"]`).should("be.visible").click();
    // Delete it
    cy.get("#edit-delete").click();
    cy.get('button[type="button"]').contains("Delete").click();
    // cy.get("h1").should("contain", " QCP Management");
  });
});
