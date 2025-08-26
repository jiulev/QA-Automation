import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../../pages/LoginPage';

const login = new LoginPage();

const envName = Cypress.env('ENV') || 'DEV';
const envData = Cypress.env(envName) || {};
const loginUrl =
  envData.login_url                                 
  || envData.url                                     
  || 'https://practicetestautomation.com/practice-test-login/'; 

Given('el usuario abre la web de Practicas', () => {
  cy.visit(loginUrl);
});

When('ingresa el usuario {string}', (username) => {
  login.typeUsername(username);
});

When('ingresa la contraseña {string}', (password) => {
  login.typePassword(password);
});

When('el usuario hace clic en el botón ingresar', () => {
  login.clickLogin();
});

Then('el sistema muestra el mensaje de error {string}', (expectedError) => {
  login.getErrorMessage().should('have.text', expectedError);
});
