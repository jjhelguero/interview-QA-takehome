it('app should display title and search bar', function () {
    cy.visit('/')
    cy.contains('div', 'Dogs!')
        .should('have.css', 'text-align', 'left')
        .and('have.css','color', 'rgb(106, 90, 205)')
        .within(() => {
            cy.get('input')
                .should('have.attr', 'placeholder', 'search')
                .should('have.css', 'border' ,'2px solid rgb(106, 90, 205)')
        })
});

it('app should display loading text while fetching request', function () {
    //spy and delay dog GET request upon app load
    cy.intercept('GET','https://dog.ceo/api/breeds/list/all', {
        statusCode: 200,
        delay: 100
    })
    cy.visit('/')
    cy.contains('div', 'Loading Breeds...')
        .should('be.visible')
});

it('app should not display loading text after fetching request', function () {
    //spy and delay dog GET request upon app load
    cy.intercept('GET','https://dog.ceo/api/breeds/list/all').as('getAllBreeds')
    cy.visit('/')
    cy.wait('@getAllBreeds')
    //test loading text does not display upon successful fetch request
    cy.get('.breed-menu_loading__S6jbn')
        .should('not.exist')
    //test breeds of dogs, not sure how to confirm 3 rows, by 4 columns with current DOM
    cy.get('.breed-menu_buttons__3XY3j:not(.breed-menu_placeholder__2MJsU)')
        .should('have.length', 12)
});