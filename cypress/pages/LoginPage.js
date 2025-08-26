class LoginPage {
    elements = {
      usernameInput: () => cy.get("#username"),
      passwordInput: () => cy.get("#password"),
      loginBtn: () => cy.get('#submit'),
      errorText: () => cy.get('#error'),
    };
  
    typeUsername(username) {
      this.elements.usernameInput().type(username);
    }
  
    typePassword(password) {
      this.elements.passwordInput().type(password);
    }
  
    clickLogin() {
      this.elements.loginBtn().click();
    }

    getErrorMessage() {
      return this.elements.errorText();
    }
}
  
export default LoginPage;