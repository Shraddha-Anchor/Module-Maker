import "./commands";
import "cypress-file-upload";


Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("MutationObserver")) {
    return false;
  }
});
