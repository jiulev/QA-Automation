class SuccessPage {
    elements = {
      titleText: () => cy.get('.post-title'),
      messageText: () => cy.get('strong'),
    };
  

    getMessage() {
      return this.elements.messageText();
    }

    getTitle() {
      return this.elements.titleText();
    }
  }

export default SuccessPage;