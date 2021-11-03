it('should allow user to search for dog breed', function () {
    cy.visit('/')
    cy.get('input[placeholder]')
        .type('bull')
    cy.get('.breed-menu_buttons__3XY3j:not(.breed-menu_placeholder__2MJsU):first')
        .should('have.length.gt', 0)
}); 