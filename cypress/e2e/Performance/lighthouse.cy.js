it("should pass lighthouse audit", function () {
    cy.visit('/')
    cy.lighthouse();
});