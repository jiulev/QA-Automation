// cypress/pages/StudentFormPage.js
// Page Object del "Student Registration Form" (DemoQA)

class StudentFormPage {
  // ===== Inputs básicos =====
  typeFirstName(v) { cy.get('#firstName').clear().type(v); }
  typeLastName(v)  { cy.get('#lastName').clear().type(v); }
  typeEmail(v)     { cy.get('#userEmail').clear().type(v); }
  typeMobile(v)    { cy.get('#userNumber').clear().type(v); }
  typeAddress(v)   { cy.get('#currentAddress').clear().type(v); }

  // ===== Género =====
  selectGender(v)  { cy.contains('label', v).click(); } // "Male" | "Female" | "Other"

  // ===== Fecha de nacimiento (datepicker) =====

// Usa los <select> del calendario y luego clic al día (sin parseos).
setDateOfBirth(day, month, year) {
  cy.get('#dateOfBirthInput').click(); // abre el calendario

  // Mes: podés pasar "March" (texto del <option>) o "2" (value, 0=Jan..11=Dec)
  cy.get('.react-datepicker__month-select')
    .should('be.visible')
    .select(String(month));

  // Año: Cypress recomienda .select('1987'); si querés “mostrar tipeo”, podés agregar .focus().type()
  cy.get('.react-datepicker__year-select')
    .should('be.visible')
    .select(String(year));
  // .focus().type(String(year));  // <- opcional si querés simular teclado

  // Día: usá la clase del día y evitá nth-child (es frágil)
  const dd = String(day).padStart(2, '0'); // "4" -> "04" => --004
  cy.get(`.react-datepicker__day--0${dd}`)
    .not('.react-datepicker__day--outside-month')
    .click();
}



  // ===== Materias =====
  addSubjects(csv) {
    csv.split(',').map(s => s.trim()).forEach(s => {
      cy.get('#subjectsInput').type(`${s}{enter}`);
    });
  }

  // ===== Hobbies =====
  checkHobbies(csv) {
    csv.split(',').map(s => s.trim()).forEach(s => {
      cy.contains('.custom-control-label', s).click();
    });
  }

  // ===== Subir imagen =====
  uploadPicture(fixturePath) {
    cy.get('#uploadPicture').selectFile(`cypress/fixtures/${fixturePath}`);
  }

  // ===== Estado / Ciudad (react-select) =====
 selectState(v) {
  cy.get('#state').click();
  cy.get('div[class$="-menu"]').should('be.visible')
    .contains('div[class$="-option"]', v).click({ force: true });
}

selectCity(v) {
  cy.get('#city').click();
  cy.get('div[class$="-menu"]').should('be.visible')
    .contains('div[class$="-option"]', v).click({ force: true });
}


  // ===== Enviar =====
  submit() { cy.get('#submit').click({ force: true }); }

  // ===== Modal =====
  modalShouldBeVisible() {
    cy.get('.modal-content').should('be.visible');
    cy.get('#example-modal-sizes-title-lg')
      .should('contain.text', 'Thanks for submitting the form');
  }

  modalFieldShouldEqual(label, value) {
    cy.get('.modal-body table')
      .contains('td', label)
      .next('td')
      .should('contain.text', value);
  }
}

export default StudentFormPage;
