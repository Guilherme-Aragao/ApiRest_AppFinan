/// <reference types="cypress" />

describe('work with basic elements', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    });

    beforeEach(() => {
       cy.reload()
    });
    it('Text', () => {
       

        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    });

    it('Links', () => {
        
        
         cy.contains('Voltar').click()
         cy.get('#resultado').should('have.text', 'Voltou!')

    });

    it('TetFields', () => {
        
        cy.get('#formNome').type('Cypress Test')
        cy.get('#formNome').should('have.value', 'Cypress Test')
        

        cy.get('#elementosForm\\:sugestoes')
            .type('Cypress Test')
            .should('have.value', 'Cypress Test')

            cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
                .type('????')

                cy.get('[data-cy="dataSobrenome"]')
                .type('Teste12345{backspace}{backspace}')
                .should('have.value', 'Teste123')

                cy.get('#elementosForm\\:sugestoes')
                .clear()
                .type('Error{selectall}acerto', )
                .should('have.value', 'acerto')
                
            });

        it('RadioButton', () => {
            cy.get('#formSexoFem')
            .click()
            .should('be.checked')

            cy.get('#formSexoMasc').should('not.be.checked')

            cy.get("[name=formSexo]").should('have.length', 2)
        });

        it('ChackBox', () => {
            cy.get('#formComidaPizza')
            .click()
            .should('be.checked')

            cy.get('[name=formComidaFavorita]')
            .click({multiple: true})
            
            cy.get('#formComidaPizza')
            .should('not.be.checked')
            
        });

        it('Combo', () => {
            cy.get('[data-test="dataEscolaridade"]')
            .select('2o grau completo')
            .should('have.value', '2graucomp')

            cy.get('[data-test=dataEscolaridade]')
                .select('1graucomp')
                .should('have.value', '1graucomp')

                cy.get('[data-test=dataEscolaridade] option')
                .should('have. lenght', 8)
                cy.get('[data-test=dataEscolaridade] option').then($arr => {
                    const values = []
                    $arr.each(function() {
                        values.push(this.innerHTML)

                    })
                    expect(values).to.include.members(["Superior", "Mestrado"])
                })
 });

       

        it.only('Combo Multiplo', () => {
            cy.get('[data-testid=dataEsportes]')
                .select(['natacao', 'Corrida', 'nada'])

           // cy.get('[data-testid=dataEsportes]').should('have.value', ['natacao', 'Corrida', 'nada'])
           cy.get('[data-testid=dataEsportes]').then($el => {
            expect($el.val()).to.be.deep.equal(['natacao', 'Corrida', 'nada'])
            expect($el.val()).to.have.length(3)
           })

           cy.get('[data-testid=dataEsportes]')
           .invoke('val')
           .should('eql', ['natacao', 'Corrida', 'nada'])
        });
});