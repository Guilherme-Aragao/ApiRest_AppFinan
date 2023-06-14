/// <reference types="cypress"/>

describe('Esperas...', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    });

    beforeEach(() => {
       cy.reload()
    })

    it('Deve aguardar elemento estar disponivel', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funciona')
    });

    it('Deve aguardar elemento estar disponivel', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo')
        //.should('not.exist')
        .should('exist')
        .type('funciona')
        
    });
    

    it('Uso do find', () => {
        cy.get('#buttonList').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
            cy.get('#buttonList').click()
            cy.get('#lista li')
                .find('span')
                .should('contain', 'Item 2')
    });

    it('Uso do timeout', () => {
       // cy.get('#buttonDelay').click()
        //cy.get('#novoCampo', ).should('exist')

        cy.get('#buttonList').click()
        cy.wait(5000)
        cy.get('#lista li', {timeout: 30000})
            .find('span')
            .should('contain', 'Item 2')

    });

    it.only('Should vs Then', () => {
        cy.get('#buttonList').click()
        cy.get('#lista li span').should($el => {
            console.log($el)
            expect($el).to.have.length(1)
        })
            
    });

});