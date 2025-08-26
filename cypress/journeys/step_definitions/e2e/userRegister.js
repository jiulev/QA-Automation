import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const envi = Cypress.env("ENV"); // DEV o TST
const url = Cypress.env(envi).url_automationexercise; // https://automationexercise.com/

Given("el usuario abre la web de automation exercise", () => {
  cy.visit(`${url}`);
});

When("el usuario hace clic en el boton signup-login", () => {
  cy.contains("a", "Signup / Login").click();
  cy.url().should("include", "/login");
});

Then("el sistema muestra el titulo New User Signup!", () => {
  cy.get("h2").contains("New User Signup!").should("be.visible");
});

When("el usuario ingresa el nombre y el email", () => {
  cy.get('[data-qa="signup-name"]').type("Julieta");
  cy.get('[data-qa="signup-email"]').type(`julieta_${Date.now()}@gmail.com`);
});

// (And ...) -> usar When porque es una acción
When("el usuario hace clic en el boton signup", () => {
  cy.get('[data-qa="signup-button"]').should("be.visible").click();
});

// (And ...) -> usar When porque es una acción
When("el usuario selecciona su genero", () => {
  cy.get("#id_gender2").check({ force: true });
});
