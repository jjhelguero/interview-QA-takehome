describe('Breed button is clicked', function () {
    beforeEach(() => {
        cy.intercept('GET','https://dog.ceo/api/breeds/list/all').as('getAllBreeds')
        cy.visit('/')
        cy.wait('@getAllBreeds')
        //first breed button
        cy.get('.breed-menu_buttons__3XY3j:not(.breed-menu_placeholder__2MJsU):first')
            .as('firstBreedButton')

        //store first breed text
        cy.get('.breed-menu_buttons__3XY3j:not(.breed-menu_placeholder__2MJsU):first')
            .then(el => {
                return el[0].innerText
            })
            .as('firstBreedName')
    })

    it('breed button should visually be marked as active once clicked', function () {
        //Validate button css before click
        cy.get('@firstBreedButton')
            .then(el => {
                expect(el).have.css('background-color','rgb(242, 242, 242)')
                expect(el).have.css('background-image')
                expect(el).have.css('color','rgb(140, 140, 140)')
                expect(el).not.have.class('breed-menu_activeReady__15B7F')
            })

        //Validate fetch request is sent upon click
        cy.get('@firstBreedName')
            .then(firstBreed => {
                //spy first breed request and wait for completion
                cy.intercept('GET',`https://dog.ceo/api/breed/${firstBreed}/images`).as('firstBreedRequest')
                cy.get('@firstBreedButton')
                    .click()

                cy.wait('@firstBreedRequest')
            })

        //Validate button css after click
        cy.get('@firstBreedButton')
            .then(el => {
                expect(el.css('background')).to.match(/^rgb\(106, 90, 205\)/)
                expect(el).have.css('color','rgb(255, 255, 255)')

                expect(el).have.class('breed-menu_activeReady__15B7F')
            })

    });

    it('should display loading text while fetching request', function () {
        //TODO: figure out how to not have request error out with StaticResponse
        cy.get('@firstBreedName')
            .then(firstBreed => {
                cy.intercept('GET',`https://dog.ceo/api/breed/${firstBreed}/images`).as('firstBreedRequest')
                cy.get('@firstBreedButton')
                    .click()

                cy.contains('div', 'Loading...')
                    .should('be.visible')
                cy.wait('@firstBreedRequest')

                cy.get('div:contains("Loading")')
                    .should('not.exist')
                cy.get('.breed-gallery_gallery__1IxcM')
                    .should('be.visible')
            })
    });
});