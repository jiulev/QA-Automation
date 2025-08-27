import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';


function getEnvConfig() {
  const envName = Cypress.env("ENV") || "DEV";
  const envObj  = Cypress.env(envName) || {};
  return { envName, ...envObj };
}
const { envName, url_test } = getEnvConfig();
const BASE_URL = url_test || "https://demoqa.com/automation-practice-form";


Given('el usuario abre la web de demoqa', () => {
  cy.log(`ENV: ${envName}`);
  cy.visit(BASE_URL);

  cy.get('#fixedban', { timeout: 0 }).then($el => $el.remove && $el.remove());
  cy.get('footer', { timeout: 0 }).then($el => $el.remove && $el.remove());
});


When('el usuario ingresa el nombre', () => {
  cy.get('#firstName').clear().type('Julieta');
});

When('el usuario ingresa el apellido', () => {
  cy.get('#lastName').clear().type('Sofia');
});

When('el usuario ingresa el email', () => {
  const email = 'julieta.sofya@gmail.com';
  cy.wrap(email).as('email');

  cy.get('#userEmail')
    .clear()
    .type(email)
    .should('have.value', email);
});


When('el usuario selecciona el genero', () => {
  cy.contains('label', 'Female').click();
});

When('el usuario ingresa su fecha de nacimiento', () => {
  cy.get('#dateOfBirthInput').click();
  cy.get('.react-datepicker__month-select').select('March');
  cy.get('.react-datepicker__year-select').select('1987');
  cy.get('.react-datepicker__day--004:not(.react-datepicker__day--outside-month)').click();
});

When('el usuario ingresa su numero de telefono', () => {
  cy.get('#userNumber').clear().type('3534778460');
});

When('el usuario selecciona el hobbie sports', () => {
  cy.contains('.custom-control-label', 'Sports').click();
});


When('el usuario ingresa su direccion', () => {
  cy.get('#currentAddress').clear().type('Córdoba, Argentina');

  
  cy.get('#subjectsInput').type('Maths{enter}');

  
  cy.get('#uploadPicture')
    .selectFile('cypress/fixtures/pedido.png', { force: true })
    .then(($inp) => {
      
      const file = $inp[0].files && $inp[0].files[0];
      if (file) expect(file.name).to.eq('pedido.png');
    });


  cy.get('#state').scrollIntoView().click();
  cy.get('div[class$="-menu"]').should('be.visible')
    .contains('div[class$="-option"]', 'NCR').click({ force: true });

  cy.get('#city').click();
  cy.get('div[class$="-menu"]').should('be.visible')
    .contains('div[class$="-option"]', 'Delhi').click({ force: true });
});


When('el usuario hace clic en el boton submit', () => {
  cy.get('#submit').scrollIntoView().click({ force: true });
});


Then('el sistema muestra el mensaje de exito {string}', (mensaje) => {

  cy.get('.modal-content', { timeout: 10000 }).should('be.visible');
  cy.get('#example-modal-sizes-title-lg', { timeout: 10000 })
    .should('contain.text', mensaje);
});
