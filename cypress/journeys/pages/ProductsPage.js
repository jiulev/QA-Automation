// Esta clase representa TODO lo que necesito de la página de productos
// y también lo mínimo del detalle del producto para comparar precios.
// Ventaja: si cambia un selector, lo actualizo en UN solo archivo.

class ProductsPage {
  // ============ Selectores que voy a reutilizar ============
  // Los guardo como propiedades para no repetir strings en cada test.
  menuProductsLink   = '.shop-menu > .nav > :nth-child(2) > a'; // link del menú "Products" en el header
  productNameSelector= '.single-products .productinfo p';       // <p> con el nombre del producto dentro de cada tarjeta
  productCard        = '.product-image-wrapper';                 // contenedor "card" del producto (padre)
  priceInCard        = '.productinfo h2';                        // <h2> con el precio dentro de la card (ej: "Rs. 500")
  viewProductLink    = '.choose a';                              // link/botón "View Product" dentro de la card
  detailTitle        = '.product-information h2';                // <h2> del detalle con el nombre del producto
  detailPrice        = '.product-information span span';         // primer <span> de precio en el detalle

  // ============ Acciones / Métodos ============

  // 1) Abro el sitio. Paso baseUrl para que funcione con env configurables (igual que antes).
  visit(baseUrl) {
    cy.visit(baseUrl);
  }

  // 2) Desde el header/navbar, voy a la sección "Products".
  //    Si cambia dónde está el link o el selector, lo toco una sola vez acá.
  goToProducts() {
    cy.get(this.menuProductsLink).click();
  }

  // 3) En la grilla de productos (listado), encuentro la tarjeta correspondiente al "name"
  //    y capturo el precio de esa tarjeta. Lo guardo en un alias "@priceFromList"
  //    para poder usarlo después en otros steps sin tener que re-buscarlo.
  captureListPrice(name) {
    cy.contains(this.productNameSelector, name) // localizo la card por el nombre visible ("Blue Top")
      .should('be.visible')                      // me aseguro de que está visible (evita falsos positivos)
      .parents(this.productCard)                 // subo al contenedor de la tarjeta
      .find(this.priceInCard)                    // dentro de la card busco el <h2> del precio
      .invoke('text')                            // obtengo el texto, ej: "Rs. 500"
      .then((priceText) => {
        cy.wrap(priceText.trim()).as('priceFromList'); // lo limpio y guardo en @priceFromList
      });
  }

  // 4) Valido que el alias de precio que capturé NO esté vacío y tenga formato "Rs. <número>"
  //    Esto me da confianza de que efectivamente agarré "algo" válido.
  validatePriceNotEmpty() {
    cy.get('@priceFromList').should('match', /^Rs\.\s*\d+/);
  }

  // 5) Abro el detalle del producto : desde la MISMA card identificada por su nombre,
  //    encuentro el link "View Product" y hago click.
  openProductDetails(name) {
    cy.contains(this.productNameSelector, name) // ubico de nuevo la card por nombre
      .parents(this.productCard)                // subo a la card
      .find(this.viewProductLink)               // busco el link "View Product"
      .contains('View Product')                 
      .click();                                 // y clic
  }

  // 6) En el detalle, verifico que el título contiene el nombre esperado.
  //    Si el detalle no corresponde al mismo producto, este assert me avisa.
  assertTitleIs(name) {
    cy.get(this.detailTitle).should('contain.text', name);
  }

  // 7) Comparo el precio del detalle con el capturado en la lista (@priceFromList).
  //    - Primero leo el alias.
  //    - Luego saco el precio del detalle y comparo exacto (trim a ambos lados).
  comparePriceWithDetail() {
    cy.get('@priceFromList').then((priceFromList) => {
      cy.get(this.detailPrice)
        .first()                  // uso el primero por si hay más spans
        .invoke('text')           // obtengo el texto del precio en detalle
        .then((priceFromDetail) => {
          expect(priceFromDetail.trim()).to.eq(priceFromList); // comparación estricta
        });
    });
  }
}

module.exports = new ProductsPage();
