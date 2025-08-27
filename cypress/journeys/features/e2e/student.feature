Feature: Student Register

@Frontend @Example @TC-3
Scenario: Registrar un nuevo estudiante
   Given el usuario abre la web de demoqa
   When el usuario ingresa el nombre
   And el usuario ingresa el apellido
   And el usuario ingresa el email
   And el usuario selecciona el genero
   And el usuario ingresa su fecha de nacimiento
   And el usuario ingresa su numero de telefono
   And el usuario selecciona el hobbie sports
   And el usuario ingresa su direccion
   And el usuario hace clic en el boton submit
   Then el sistema muestra el mensaje de exito "Thanks for submitting the form"