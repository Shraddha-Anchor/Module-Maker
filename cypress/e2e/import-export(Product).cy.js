import "cypress-file-upload";

describe("Import Export", () => {
  beforeEach(() => {
    cy.loginSession();
    cy.visit("/admin/commerce/products");
    cy.wait(1000);
    cy.location("pathname").should("eq", "/admin/commerce/products");
  });

  //------------------------PRODUCTS------------------------
  it.only("TC_01 Export, Unzip, and Validate CSV files In Product", () => {
    const downloadPath = "cypress/downloads/export_products.zip";
    const extractPath = "cypress/downloads/unzipped";
    const expectedFiles = [
      "export_assay_panel.csv",
      "export_carepoint_pro-qcp.csv",
      "export_instrument_system.csv",
    ];
    // Initiate the export
    cy.get(":nth-child(3) > .button").click();
    // Wait for the file to be downloaded
    cy.readFile(downloadPath, { timeout: 15000 }).should("exist");
    // Unzip and return list of files
    cy.task("unzipping", {
      zipFilePath: downloadPath,
      outputPath: extractPath,
    }).then((files) => {
      // Assert all expected files exist
      expectedFiles.forEach((file) => {
        expect(files).to.include(file);
      });
    });
  });

  it("TC_02 - Import Products", () => {
    cy.get(":nth-child(4) > .button").click();
    cy.get('.local-actions > [name="op"]').click();
    cy.get('input[data-drupal-selector="edit-csv-file"]').attachFile(
      "template_import_assay_pannel.csv"
    );
    cy.get("#edit-submit").click();
  });

  it("TC_03 - Import Products with invalid file", () => {
    cy.get(":nth-child(4) > .button").click();
    cy.get('[name="files[csv_file]"]').attachFile({
      filePath: "invalid_file.txt",
      encoding: "utf8", // ensures text is read correctly
      allowEmpty: false, // set to true only if file is empty intentionally
    });
    cy.get("#edit-submit").click();
    cy.contains("Error message").should("exist");
  });
  it("TC_04 - Import Products with multiple files", () => {
    const files = [
      "overload/template_import_assay_pannel.csv",
      "overload/template_import_carepoint_proqcp.csv",
      "overload/template_import_instrument_system.csv",
    ];
    files.forEach((file) => {
      cy.visit("/admin/commerce/csv-import/product"); // reload page each loop
      cy.get('input[data-drupal-selector="edit-csv-file"]').attachFile(files);
      cy.get("#edit-submit").click();
      cy.contains("The CSV has been imported successfully.").should(
        "be.visible"
      );
    });
  });
});
