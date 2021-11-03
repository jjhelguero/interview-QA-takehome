it('should return 200 status code', function () {
    cy.api({
        method: 'GET',
        url: 'https://dog.ceo/api/breed/african/images'
    }).then(body => {
        expect(body.status).to.eq(200)
    })
});