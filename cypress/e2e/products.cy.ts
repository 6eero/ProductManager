describe("Gestione prodotti", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");

    // ADD
    cy.get("[data-testid='add-product-btn']").click();

    cy.get("input[name='name']").type("Cypress Test Prodotto");
    cy.get("input[name='quantity']").clear().type("10");
    cy.get("input[name='price']").clear().type("50");
    cy.get("[data-testid='category']").click();
    cy.get("[role='option']").first().click();

    cy.get("[data-testid='submit-modal-ok']").click();

    cy.contains("td", "Cypress Test Prodotto", { timeout: 10000 }).should(
      "exist"
    );
  });

  it("mostra la tabella prodotti", () => {
    cy.get("table").should("exist");
  });

  // UPDATE
  it("modifica un prodotto", () => {
    cy.contains("td", "Cypress Test Prodotto")
      .parent("tr")
      .within(() => {
        cy.get("[data-testid='edit-product-btn']").click();
      });

    cy.get("input[name='quantity']").clear().type("20");
    cy.get("[data-testid='submit-modal-ok']").click();

    cy.contains("td", "20").should("exist");
  });

  // DELETE
  it("rimuove un prodotto", () => {
    cy.contains("td", "Cypress Test Prodotto")
      .parent("tr")
      .within(() => {
        cy.get("[data-testid='delete-product-btn']").click();
      });

    cy.get("[data-testid='danger-ok-btn']").click();

    cy.contains("td", "Cypress Test Prodotto").should("not.exist");
  });
});
