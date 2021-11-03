it('should allow more than 16 characters', function () {
    cy.visit('/')
    cy.get('input[placeholder]')
        .type('1234567890123456')

    cy.get('.breed-menu_buttons__3XY3j:not(.breed-menu_placeholder__2MJsU)')
        .should('not.exist')
});

it('should return no results for special characters', function () {
    const specicalCharacters = ['?','!','<','>']
    cy.visit('/')
    specicalCharacters.forEach((value => {
        cy.get('input[placeholder]')
            .type(value)

        cy.get('.breed-menu_buttons__3XY3j:not(.breed-menu_placeholder__2MJsU)')
            .should('not.exist')
    }))
});

it('should return no results for xss', function () {
    const xss = '<SCRIPT SRC=http://xss.rocks/xss.js></SCRIPT>'
    cy.visit('/')
    cy.get('input[placeholder]')
        .type(xss)

    cy.get('.breed-menu_buttons__3XY3j:not(.breed-menu_placeholder__2MJsU)')
        .should('not.exist')
});