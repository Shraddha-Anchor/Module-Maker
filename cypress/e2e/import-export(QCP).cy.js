import "cypress-file-upload";

describe("Import Export", () => {
  beforeEach(() => {
    cy.loginSession();
    cy.visit("/admin/commerce/products");
    cy.wait(1000);
    cy.location("pathname").should("eq", "/admin/commerce/products");
  });
  //------------------------ QCP------------------------
  const goToQCPList = () => {
    cy.get("#toolbar-item-administration").click().click();
    cy.get(".toolbar-icon-commerce-admin-commerce").click();
    cy.get(".management-link--cp-risk-cp-risk-list > .card").click();
    cy.get('[data-original-order="1"] > .tabs__link').click();
  };

  it("TC_01 - Export QCP", () => {
    goToQCPList();
    cy.contains("a", "Export QCPs").click();
    cy.location("pathname").should("include", "/admin/commerce/assessment/qcp");
  });
  it("TC_02 - Import QCP", () => {
    goToQCPList();
    cy.contains("a", "Import QCPs").click();
    cy.get('.local-actions > [name="op"]').click();
    cy.get('input[data-drupal-selector="edit-csv-file"]').attachFile(
      "template_import_qcp.csv"
    );
    cy.get("#edit-submit").click();
    cy.contains("The CSV has been imported successfully.").should("be.visible");
  });
  it("TC_03 - Import Invalid File QCP", () => {
    goToQCPList();
    cy.contains("a", "Import QCPs").click();
    cy.get('input[data-drupal-selector="edit-csv-file"]').attachFile({
      filePath: "invalid_file.txt",
      encoding: "utf8", // ensures text is read correctly
      allowEmpty: false, // set to true only if file is empty intentionally
    });
    cy.get("#edit-submit").click();
    cy.contains("Error message").should("exist");
  });
  it("TC_04 - Import Missing Fields QCP", () => {
    goToQCPList();
    cy.contains("a", "Import QCPs").click();
    cy.get('input[data-drupal-selector="edit-csv-file"]').attachFile(
      "template_import_carepoint_proqcp.csv"
    );
    cy.get("#edit-submit").click();
    cy.contains("Error message").should("be.visible");
  });
  it("TC_05 - Import QCP with multiple files at once", () => {
    const qcpfiles = [
      "template_import_qcp.csv",
      "template_import_qcp1.csv",
      "template_import_qcp2.csv",
    ];
    goToQCPList();
    cy.contains("a", "Import QCPs").click();
    // attach multiple files in a single go
    cy.get('input[data-drupal-selector="edit-csv-file"]').attachFile(qcpfiles);
    cy.get("#edit-submit").click();
    cy.contains("The CSV has been imported successfully.").should("be.visible");
  });
  it("TC_06 - Import QCP with duplicate data", () => {
    goToQCPList();
    cy.contains("a", "Import QCPs").click();
    cy.get('input[data-drupal-selector="edit-csv-file"]').attachFile(
      "template_duplicate_qcp.csv"
    );
    cy.get("#edit-submit").click();
    cy.contains("Status message").should("be.visible");
  });
});
