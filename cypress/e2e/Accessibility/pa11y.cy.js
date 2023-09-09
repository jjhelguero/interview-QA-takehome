it.skip("should pass pa11y audit", function () {
    cy.visit('/')
    cy.pa11y();
});