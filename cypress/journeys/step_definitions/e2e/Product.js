// Estos son tus steps originales, pero ahora "delegan" toda la interacción
// a la clase ProductsPage. Mis steps quedan como un "guión" de negocio
// y los selectores quedan preservados dentro de la Page (POM).

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Mantengo tu lógica de URL configurable (env o default)
const BASE_URL = Cypress.env('url_automationexercise') || 'https://automationexercise.com/';

// Importo la Page con las acciones encapsuladas
const productsPage = require('../../pages/ProductsPage');

// 1) Abro la web (igual que antes, pero ahora a través de la Page)
Given('el usuario abre la web', () => {
  productsPage.visit(BASE_URL);
});

// 2) Hago clic en el botón "Products" del menú superior.
//    Si cambia el selector o la posición del menú, lo arreglo en la Page.
When('el usuario hace clic en el boton products', () => {
  productsPage.goToProducts();
});

// 3) Busco el producto "Blue Top" en la grilla y capturo su precio desde la card.
//    Guardo el precio en @priceFromList para reusarlo.
Then('el usuario realiza la busqueda del producto "Blue Top"', () => {
  productsPage.captureListPrice('Blue Top');
});

// 4) Confirmo que el precio capturado no está vacío y tiene formato "Rs. NNN".
When('el usuario obtiene el precio del producto', () => {
  productsPage.validatePriceNotEmpty();
});

// 5) Entro al detalle del mismo producto haciendo click en "View Product".
When('el usuario hace clic en en el boton view product', () => {
  productsPage.openProductDetails('Blue Top');
});

// 6) Verifico que el detalle corresponde a "Blue Top".
Then('el sistema muestra la informacion del producto "Blue Top"', () => {
  productsPage.assertTitleIs('Blue Top');
});

// 7) Comparo el precio del detalle vs. el precio capturado en el listado.
//    Si difieren, fallo el test con un assert claro.
Then('el sistema muestra el mismo precio del producto que se obtuvo en la busqueda', () => {
  productsPage.comparePriceWithDetail();
});
