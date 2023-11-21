describe('Edificio', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/edificios').as('createEdificio');
  });

  it('Criar edificio com sucesso', () => {
    cy.visit('/criar-edificio');
    cy.get('[name="codigoEdificio"]').type('test1');
    cy.get('[name="descricaoEdificio"]').type('descricao');
    cy.get('[name="nomeEdificio"]').type('nome');
    cy.get('[name="comprimento"]').type('1');
    cy.get('[name="largura"]').type('2');
    cy.contains('button', 'Criar')
      .should('not.be.disabled')
      .click();
    cy.wait('@createEdificio').then(interception => {
      expect(interception?.response?.statusCode).to.eq(201);
    });
  });

  afterEach(() => {
    cy.visit('/delete-edificio');
    cy.get('#codigoEdificio').type('test1');
    cy.get('button').click();
  });
});
