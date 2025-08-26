import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import SuccessPage  from '../../../pages/SuccessPage';

const successPage = new SuccessPage();

Then("el sistema muestra el mensaje {string}", function (expectedMessage) {
    // Verificamos que el mensaje mostrado sea el esperado
    successPage.getMessage().should('have.text', expectedMessage);
});

Then("el sistema muestra el titulo {string}", function (expectedTitle) {
    // Verificamos que el título mostrado sea el esperado
    successPage.getTitle().should('have.text', expectedTitle);
});