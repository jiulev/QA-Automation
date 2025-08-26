Feature: Frontend - Student Practice Form

  @Frontend 
  Scenario: Registro exitoso con datos básicos
    Given el usuario abre el formulario de prácticas
    When completa nombre "Julieta" y apellido "Sofia"
    And ingresa el email "julieta@gmail.com"
    And selecciona el género "Female"
    And ingresa el celular "3534778460"
 And selecciona la fecha de nacimiento "04" "March" "1987"
    And agrega las materias "Maths, English"
    And selecciona los hobbies "Sports, Reading"
    And sube la foto "pedido.png"
    And ingresa la dirección "Córdoba, Argentina"
    And selecciona el estado "NCR" y la ciudad "Delhi"
    And envía el formulario
    Then se muestra el modal de confirmación
    And en el modal el campo "Student Email" muestra "julieta@gmail.com"
