import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// URL desde env plano, con fallback por si no está seteada
const BASE_URL = Cypress.env('url_automationexercise') || 'https://automationexercise.com/';

// Datos del usuario
const NOMBRE_COMPLETO = 'Julieta Sofia';
const FIRST_NAME = 'Julieta';
const LAST_NAME  = 'Sofia';
const EMAIL_UNICO = `julieta.sofia+${Date.now()}@mailinator.com`; // único por corrida

Given('el usuario abre la web de automation exercise', () => {
  cy.visit(BASE_URL);
});

When('el usuario hace clic en el boton signup-login', () => {
  cy.get('a[href="/login"]').click();
});

Then('el sistema muestra el titulo New User Signup!', () => {
  cy.get('.signup-form > h2').contains('New User Signup!').should('be.visible');
});

When('el usuario ingresa el nombre y el email', () => {
  cy.get('input[data-qa="signup-name"]').type(NOMBRE_COMPLETO);
  cy.get('input[data-qa="signup-email"]').type(EMAIL_UNICO);
  cy.wrap(NOMBRE_COMPLETO).as('userName');
  cy.wrap(EMAIL_UNICO).as('userEmail');
});

When('el usuario hace clic en el boton signup', () => {
  cy.get('button[data-qa="signup-button"]').click();
});

// ⚠️ A veces la página tarda y/o hay overlays de ads.
// Esperamos el título y luego chequeamos el radio de "Mrs." (mujer = id_gender2)
When('el usuario selecciona su genero', () => {
  cy.contains('h2', 'Enter Account Information', { timeout: 15000 }).should('be.visible');
  cy.get('#id_gender2', { timeout: 15000 }).should('exist').check({ force: true });
});

When('el usuario verifica que el nombre este precargado', () => {
  cy.get('@userName').then((nameUser) => {
    cy.get('input#name').should('have.value', nameUser);
  });
});

When('el usuario verifica que el email esta precargado', () => {
  cy.get('@userEmail').then((emailUser) => {
    cy.get('input#email').should('have.value', emailUser);
  });
});

When('el usuario ingresa la contraseña', () => {
  cy.get('[data-qa="password"]').type('12345');
});

// Fecha de nacimiento: 04 marzo 1987  → day=4, month=3, year=1987
When('el usuario selecciona la fecha de nacimiento', () => {
  cy.get('select#days').select('4').should('have.value', '4');
  cy.get('select#months').select('3').should('have.value', '3');   // 3 = March
  cy.get('select#years').select('1987').should('have.value', '1987');
});

When('el usuario ingresa el nombre y apellido', () => {
  cy.get('input#first_name').type(FIRST_NAME);
  cy.get('input#last_name').type(LAST_NAME);
});

When('el usuario ingresa la compania', () => {
  cy.get('input#company').type('Sofia');
});

When('el usuario ingresa la direccion principal y la direccion 2', () => {
  cy.get('input#address1').type('Marcos Juarez 331');
  cy.get('input#address2').type('Departamento 1A');
});

When('el usuario selecciona el pais', () => {
  cy.get('select#country').select('Canada').should('have.value', 'Canada');
});

When('el usuario ingresa el estado, la ciudad, el codigo postal y el movil', () => {
  cy.get('input#state').type('Cordoba');
  cy.get('input#city').type('Villa Maria');
  cy.get('input#zipcode').type('1900');
  cy.get('input#mobile_number').type('+549353639877');
});

When('el usuario hace clic en el boton create account', () => {
  cy.get('button[data-qa="create-account"]').click();
});

Then('el sistema muestra el mensaje ACCOUNT CREATED!', () => {
  cy.contains('b', 'Account Created!').should('be.visible');
});

When('el usuario hace clic en el boton continue', () => {
  // A veces hay un overlay; forzamos si es necesario
  cy.get('a[data-qa="continue-button"]').click({ force: true });
  cy.wait(1500);
});

When('el usuario hace clic en el boton delete account', () => {
  cy.get('a[href="/delete_account"]').click({ force: true });
});

Then('el sistema muestra el mensaje ACCOUNT DELETED!', () => {
  cy.contains('b', 'Account Deleted!').should('be.visible');
});
