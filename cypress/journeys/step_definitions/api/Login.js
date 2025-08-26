import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import Login from '../../../services/Login' ;
const loginService = new Login();

// Obtenemos el entorno actual de Cypress
// Esto nos permite usar diferentes configuraciones según el entorno (TST, STG, etc.)
const envi = Cypress.env('ENV');

let payload = {
  username: '', 
  password: ''
};

Given("el usuario tiene acceso a la API de login", function () {
  // Obtenemos la URL base de la aplicación según el entorno
});

When("el usuario envia la solicitud de login con credenciales validas", function () {
  // Obtenemos las credenciales del usuario desde las variables de entorno
  const username = Cypress.env(`${envi}`).username_api;
  const password = Cypress.env(`${envi}`).password_api;

  // Preparamos el payload con las credenciales del usuario
  payload = {
    username: username,
    password: password
  };

  // Enviamos la solicitud de login con el payload preparado
  loginService.postLogin(payload).then((response) => {
    // Guardamos la respuesta de la solicitud para su uso posterior
    cy.wrap(response).as("loginResponse");
  });
});

Then("el sistema responde con un código de estado 200", function () {
  // Verificamos que la respuesta tenga un código de estado 200
  cy.get("@loginResponse").then((data) => {
    expect(data.status).to.eq(200);
  });
});
