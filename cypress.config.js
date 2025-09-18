const { defineConfig } = require("cypress");
const AdmZip = require("adm-zip");
const fs = require("fs");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://modulemakerdev.pro-qcp.com",
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/**/*.cy.js",

    setupNodeEvents(on, config) {
      // Define tasks
      on("task", {
        unzipping: ({ zipFilePath, outputPath }) => {
          try {
            const zip = new AdmZip(zipFilePath);
            zip.extractAllTo(outputPath, true);
            return fs.readdirSync(outputPath); // return list of files
          } catch (err) {
            throw new Error(`Failed to unzip: ${err.message}`);
          }
        },

        fileExists: (filePath) => {
          return fs.existsSync(filePath);
        },
      });
      return config; // always return config
    },
  },
  
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
    overwrite: false,
    html: false,
    json: true,
  },
});
