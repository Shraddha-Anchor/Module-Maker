import "cypress-file-upload";

describe("Import Export", () => {
  beforeEach(() => {
    cy.loginSession();
    cy.visit("/admin/commerce/products");
    cy.wait(1000);
    cy.location("pathname").should("eq", "/admin/commerce/products");
  });
  //  ------------------------RISK------------------------
  const goToRiskList = () => {
    cy.get("#toolbar-item-administration").click().click();
    cy.get(".toolbar-icon-commerce-admin-commerce").click();
    cy.get(".management-link--cp-risk-cp-risk-list > .card").click();
  };
  it("TC_01 - Export Risk", () => {
    goToRiskList();
    cy.contains("a", "Export Risks").click();
    cy.location("pathname").should(
      "include",
      "/admin/commerce/assessment/risk"
    );
  });
  it("TC_02 - Import Risk", () => {
    goToRiskList();
    cy.contains("a", "Import Risks").click();
    cy.get("#edit-download-template").click();
    cy.get('input[data-drupal-selector="edit-csv-file"]').attachFile(
      "template_import_risk.csv"
    );
    cy.get("#edit-submit").click();
    cy.contains("The CSV has been imported successfully.").should("be.visible");
  });
  it("TC_03 - Import Risk with invalid file", () => {
    goToRiskList();
    cy.contains("a", "Import Risks").click();
    cy.get('input[data-drupal-selector="edit-csv-file"]').attachFile({
      filePath: "invalid_file.txt",
      encoding: "utf8", // ensures text is read correctly
      allowEmpty: false, // set to true only if file is empty intentionally
    });
    cy.get("#edit-submit").click();
    cy.contains("Error message").should("exist");
  });
  it("TC_04 - Import Risk with multiple files at once", () => {
    const riskfiles = [
      "template_import_risk1.csv",
      "template_import_risk2.csv",
    ];
    goToRiskList();
    cy.contains("a", "Import Risks").click();
    // attach multiple files in a single go
    cy.get('input[data-drupal-selector="edit-csv-file"]').attachFile(riskfiles);
    cy.get("#edit-submit").click();
  });
  it("TC_05 - Import Risk with large file", () => {
    goToRiskList();
    cy.contains("a", "Import Risks").click();
    cy.get('input[data-drupal-selector="edit-csv-file"]').attachFile(
      "export_risk.csv"
    );
    cy.get("#edit-submit").click();
    cy.contains("Status message").should("be.visible");
  });
  it("TC_06 - Import Risk with duplicate data", () => {
    goToRiskList();
    cy.contains("a", "Import Risks").click();
    cy.get('input[data-drupal-selector="edit-csv-file"]').attachFile(
      "template_duplicate_risk.csv"
    );
    cy.get("#edit-submit").click();
    cy.contains("Status message").should("be.visible");
  });
});
