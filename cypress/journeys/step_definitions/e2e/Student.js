import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import StudentFormPage from '../../../pages/StudentFormPage';
const form = new StudentFormPage();

// === ENV 
const envName = Cypress.env('ENV') || 'DEV';
const allEnv  = Cypress.env() || {};
const url     = (allEnv[envName] && allEnv[envName].toolsqa_url) 
             || 'https://demoqa.com/automation-practice-form';

Given("el usuario abre el formulario de prácticas", function () {
  cy.visit(url);
 
  cy.get('#fixedban', { timeout: 0 }).then($el => $el.remove && $el.remove());
});

When("completa nombre {string} y apellido {string}", function (first, last) {
  form.typeFirstName(first);
  form.typeLastName(last);
  //cy.wait(2000); //
});

When("ingresa el email {string}", function (email) {
  form.typeEmail(email);
});

When("selecciona el género {string}", function (gender) {
  form.selectGender(gender);
});

When("ingresa el celular {string}", function (mobile) {
  form.typeMobile(mobile);
});

When('selecciona la fecha de nacimiento {string} {string} {string}', (dd, mm, yyyy) => {
  form.setDateOfBirth(dd, mm, yyyy); // ej: "04" "March" "1987"  ó  "04" "2" "1987"
});


When("agrega las materias {string}", function (subjectsCsv) {
  form.addSubjects(subjectsCsv);
});

When("selecciona los hobbies {string}", function (hobbiesCsv) {
  form.checkHobbies(hobbiesCsv);
});

When("sube la foto {string}", function (fixtureName) {
  form.uploadPicture(fixtureName);
});

When("ingresa la dirección {string}", function (addr) {
  form.typeAddress(addr);
});

When("selecciona el estado {string} y la ciudad {string}", function (state, city) {
  form.selectState(state);
  form.selectCity(city);
});

When("envía el formulario", function () {
  form.submit();
});

Then("se muestra el modal de confirmación", function () {
  form.modalShouldBeVisible();
});

Then("en el modal el campo {string} muestra {string}", function (label, value) {
  form.modalFieldShouldEqual(label, value);
});
