Feature: Registro de usuario en Automation Exercise
  Como usuario nuevo
  Quiero registrarme en el sitio
  Para poder iniciar sesión y gestionar mi cuenta

 
  @registro @focus
  Scenario: Registrar un usuario nuevo y eliminar la cuenta
    Given el usuario abre la web de automation exercise
    When el usuario hace clic en el boton signup-login
    Then el sistema muestra el titulo New User Signup!
    When el usuario ingresa el nombre y el email
    And el usuario hace clic en el boton signup
    When el usuario selecciona su genero
    And el usuario verifica que el nombre este precargado
    And el usuario verifica que el email esta precargado
    And el usuario ingresa la contraseña
    And el usuario selecciona la fecha de nacimiento
    And el usuario ingresa el nombre y apellido
    And el usuario ingresa la compania
    And el usuario ingresa la direccion principal y la direccion 2
    And el usuario selecciona el pais
    And el usuario ingresa el estado, la ciudad, el codigo postal y el movil
    And el usuario hace clic en el boton create account
    Then el sistema muestra el mensaje ACCOUNT CREATED!
    When el usuario hace clic en el boton continue
    When el usuario hace clic en el boton delete account
    Then el sistema muestra el mensaje ACCOUNT DELETED!
    
