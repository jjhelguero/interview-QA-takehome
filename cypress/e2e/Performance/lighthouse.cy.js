it("should pass lighthouse audit", function () {
    cy.visit('/')
    cy.lighthouse({
        performance: 50,
        accessibility: 75,
        "best-practices": 50,
        seo: 50,
        pwa: 25,
    });
});