import {Joi} from "celebrate";

describe('Edificio', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/robots').as('createEdificio');
  });

  it('Criar Robot com sucesso', () => {
    cy.visit('/criarRobot');
    cy.get('[name="codigoRobot"]').type('TESTE1');
    cy.get('[name="nicknameRobot"]').type('Starfire');
    cy.get('[name="tipoRobot"]').type('tipo1');
    cy.get('[name="numeroSerieRobot"]').type('12345');
    cy.get('[name="descricaoRobot"]').type('Robot de Vigilancia de Corredores');

    cy.contains('button', 'Criar')
      .should('not.be.disabled')
      .click();
    cy.wait('@createRobot').then(interception => {
      expect(interception?.response?.statusCode).to.eq(201);
    });
  });

  afterEach(() => {
    //DELETE ROBOT
    cy.visit('/:codigoRobot');
    cy.get('#codigoRobot').type('test1');
    cy.get('button').click();
  });
});
