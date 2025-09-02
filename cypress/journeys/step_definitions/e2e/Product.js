import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';


const BASE_URL = Cypress.env('url_automationexercise') || 'https://automationexercise.com/';

// Datos del usuario


Given('el usuario abre la web', () => {
  cy.visit(BASE_URL);
});

When('el usuario hace clic en el boton products', () => {
 cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
});

Then('el usuario realiza la busqueda del producto "Blue Top"', () => {
  cy.contains('.single-products .productinfo p', 'Blue Top')
    .should('be.visible')
    .parents('.product-image-wrapper')   // subo al contenedor de la tarjeta
    .find('.productinfo h2')             // busco el <h2> del precio
    .invoke('text')                      // obtengo el texto Rs. 500
    .then((priceText) => {
      cy.wrap(priceText.trim()).as('priceFromList'); // guardo como alias
    });
});
When('el usuario obtiene el precio del producto', () => {
  cy.get('@priceFromList')                      // alias que guarde en el step anterior
    .should('match', /^Rs\.\s*\d+/);            // chequeo que no quedevacio
});
When('el usuario hace clic en en el boton view product', () => {
  cy.contains('.productinfo p', 'Blue Top')     // ecuentrola tarjeta con ese nombre
    .parents('.product-image-wrapper')          // la subo alontenedor de la tarjeta
    .find('.choose a')                          // dentro de ese contenedor, buscar el link
    .contains('View Product')                 
    .click();
});



Then('el sistema muestra la informacion del producto "Blue Top"', () => {
 cy.get('.product-information h2').should('contain.text', 'Blue Top');

});


Then('el sistema muestra el mismo precio del producto que se obtuvo en la busqueda', () => {
  cy.get('@priceFromList').then((priceFromList) => {
    cy.get('.product-information span span')
      .first()
      .invoke('text')
      .then((priceFromDetail) => {
        expect(priceFromDetail.trim()).to.eq(priceFromList);
      });
  });
});