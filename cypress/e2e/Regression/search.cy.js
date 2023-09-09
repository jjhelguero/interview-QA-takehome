describe('Search Functionality', function () {
    beforeEach(() => {
        cy.intercept('GET','https://dog.ceo/api/breeds/list/all').as('getAllBreeds')
        cy.visit('/')
        cy.wait('@getAllBreeds')
        cy.get('input[placeholder]')
            .clear()
    })

    it('should display first 12 results', function () {
        const searchTextMoreThan12Results = 'b'
        cy.get('input[placeholder]')
            .type(searchTextMoreThan12Results)

        cy.get('.breed-menu_buttons__3XY3j:not(.breed-menu_placeholder__2MJsU)')
            .should('have.length', 12)
            .each(dogResult => {
                expect(dogResult[0].innerText).to.include(searchTextMoreThan12Results)
            })
    });

    it('should display less than 12 results', function () {
        const searchTextMoreLess12Results = 'hound'
        cy.get('input[placeholder]')
            .type(searchTextMoreLess12Results)

        cy.get('.breed-menu_buttons__3XY3j:not(.breed-menu_placeholder__2MJsU)')
            .should('have.length.lessThan',12)
            .each(dogResult => {
                expect(dogResult[0].innerText).to.include(searchTextMoreLess12Results)
            })
    });

    it('should not display results', function () {
        const searchTextNoResults = 'golden doodle'
        cy.get('input[placeholder]')
            .type(searchTextNoResults)

        cy.get('.breed-menu_buttons__3XY3j:not(.breed-menu_placeholder__2MJsU)')
            .should('have.length',0)
        cy.contains('div', 'No breed matches found.')
    });
});