describe('passagem Creation', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200/passagem/criarPassagem');
    });


    it('should create a passagem successfully', () => {

        cy.get('.passagem-input').eq(0).type('teste1');
        cy.get('.passagem-input').eq(1).type('Piso1');
        cy.get('.passagem-input').eq(2).type('Piso2');
       
        // Click the "Create passagem" button
        cy.get('.list-button').click();

        // Assertions after creating the passagem
        cy.on('window:alert', (str) => {
            expect(str).to.equal('succeded');
        });

    });

    it('should display an error message if mandatory information is missing', () => {

        // Click the "Create passagem" button
        cy.get('.list-button').click();

        // Assertions for error message
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Fill all the mandatory information!');
        });

    });



    it('should display an error message if an external error occurs', () => {
        // ... your existing test code ...

        // Stub the API request to fail with a 500 status code
        cy.intercept('POST', '/api/passagem/criarPassagem', (req) => {
            req.reply({
                forceNetworkError: true,
            });
        }).as('criarPassagem');

        // Click the "Create passagem" button
        cy.get('.list-button').click();

        // Assertions for error message
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Oops! Something went wrong on our end.\nPlease try again later.');
        });

        // ... additional assertions ...

        // Optionally, you can wait for the UI to update or display an error message in the UI.
    });
});