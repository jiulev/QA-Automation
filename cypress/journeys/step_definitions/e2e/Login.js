import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Obtenemos el entorno actual de Cypress
// Esto nos permite usar diferentes configuraciones según el entorno (TST, STG, etc.)
const envi = Cypress.env('ENV');
// Obtenemos la URL base de la aplicación según el entorno
const url = Cypress.env(`${envi}`).url;


Given("el usuario abre la web de Practicas", function () {
    cy.visit(`${url}`)
});

When("ingresa el usuario {string}", function (username) {
    cy.get("#username").type(username);
});

When("ingresa la contraseña {string}", function (password) {
    cy.get("#password").type(password);
});

When("el usuario hace clic en el botón ingresar", function () {
    cy.get('#submit').click();
});

Then("el sistema muestra el mensaje de error {string}", function (expectedError) {
    const error = cy.get('#error');
    error.should('have.text', expectedError);
});


Then("el sistema muestra el titulo {string}", function (expectedTitle) {
    const title = cy.get('.post-title');
    title.should('have.text', expectedTitle);
});

Then("el sistema muestra el mensaje {string}", function (expectedMessage) {
    const message = cy.get('strong');
    message.should('have.text', expectedMessage);
});