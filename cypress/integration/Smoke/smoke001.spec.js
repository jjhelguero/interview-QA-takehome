it('should load dog breed Images when user clicks dog breed button', function () {
    cy.visit('/')
    cy.get('.breed-menu_buttons__3XY3j:not(.breed-menu_placeholder__2MJsU):first')
        .click()
    cy.get('.breed-gallery_loadMoreContainer__1D5v0')
        .should('be.visible')
}); 