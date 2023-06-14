/// <reference types="cypress"/>

describe('Helpers', () => {

    it('wrap', () => {
        const obj = { nome: 'User', idade: 20}
        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property', 'nome')
        
       cy.visit('https://wcaquino.me/cypress/componentes.html')
       // cy.get('#formNome').then($el => {

           // cy.wrap($el).type('Funciona via cypress')

           const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10)
            }, 500)
            
           })

           cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro botão'))
          // promise.then(num => console.log(num))
          cy.wrap(promise).then(ret => console.log(ret))
          cy.get('#buttonList').then(() => console.log('Encontrei o segundo botão'))
           
           cy.wrap(1).then(num => {
            return 2
          }).should('be.equal', 2)
        });

            it('Its...', () => {
                const obj = {nome: 'user', idade: 20}
                cy.wrap(obj).should('have.property', 'nome', 'user')
                cy.wrap(obj).its('nome').should('be.equal', 'user')

                const obj2 = {nome: 'user', idade: 20, endereco: { rua: 'dos bobos'}}
                cy.wrap(obj2).its('endereco').should('have.property', 'rua')
                cy.wrap(obj2).its('endereco').its('rua').should('contain', 'bobos')
                cy.wrap(obj2).its('endereco.rua').should('contain', 'bobos')

                cy.visit('https://wcaquino.me/cypress/componentes.html')
                cy.title().its('length').should('be.equal', 20)
            });
            

            it('Invoke...', () => {
                const getValeu = () => 1;
                const soma = (a, b) => a + b;

                cy.wrap({fn: getValeu}).invoke('fn').should('be.equal', 1)
                cy.wrap({ fn: soma}).invoke('fn', 2, 5).should('be.equal', 7)

                cy.visit('https://wcaquino.me/cypress/componentes.html')
                cy.get('#formNome').invoke('val', 'Texto via invoke')
                cy.window().invoke('alert', 'Da pra ver')
                cy.get('#resultado')

                .invoke('html', '<input="button" value="hacked"/> ')
            });


    }); 

           