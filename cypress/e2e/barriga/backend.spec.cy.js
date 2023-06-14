/// <reference types="cypress" />




describe('Work with alerts', () => {
    let token


    before(() => {
        cy.getToken('guilhermea@cy.com', '12345678')
            .then(tkn => {
            token = tkn
        })
    })

    beforeEach(() => {
        cy.resetRest()
    });
    

     it('Should create an account', () => {
        
            cy.api({
            url: 'https://barrigarest.wcaquino.me/contas',
            method: 'POST',
            headers: {Authorization: `JWT ${token}`},
            body:{
                nome: 'Conta via rest'
            }
         }).as('response')
     
         
         cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via rest')
         })
    })
        
     it('Should update an account', () => {
      cy.api({
        method: 'GET',
        url: 'https://barrigarest.wcaquino.me/contas',
        headers: {Authorization: `JWT ${token}`},
        qs: {
            nome: 'Conta para alterar'
        }
      }).then( res => {
        cy.api({
        url: `https://barrigarest.wcaquino.me/contas/${res.body[0].id}`,
        method: 'PUT',
        headers: {Authorization: `JWT ${token}`},
        body: {
            nome: 'conta alterada vis rest'
        }
      }).as('response')

    })

      cy.get('@response').its('status').should('be.equal', 200)
      })
     
        
    
     

    it('Should not create an account with same name', () => {
        cy.api({
            url: 'https://barrigarest.wcaquino.me/contas',
            method: 'POST',
            headers: {Authorization: `JWT ${token}`},
            body:{
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
         }).as('response')
     
         
         cy.get('@response').then(res => {
            console.log(res)
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.have.equal('Já existe uma conta com esse nome!')
         })
    });

    it('Should create a transaction', () => {
        cy.getContaByName('Conta para movimentacoes')
        .then(contaId => {
            cy.api({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/transacoes',
            headers: {Authorization: `JWT ${token}`},
            body: {
                conta_id: contaId,
                data_pagamento: "13/06/2023",
                data_transacao: "13/06/2023",
                descricao: "desc",
                envolvido: "int",
                status: true,
                tipo: "REC",
                valor: "123",
                
            }
        }).as('response')
    })
    cy.get('@response').its('status').should('be.equal', 201)
    cy.get('@response').its('status').should('exist', 201)
}) 

    it('Should get balance', () => {
        cy.api({
            url: 'https://barrigarest.wcaquino.me/saldo',
            method: 'GET',
            headers: {Authorization: `JWT ${token}`},
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => { 
                if(c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('534.00')
        })
        cy.api({
            method: 'GET',
            headers: {Authorization: `JWT ${token}`},
            url: 'https://barrigarest.wcaquino.me/transacoes',
            qs: { descricao: 'Movimentacao 1, calculo saldo'}
        }).then(res => {
            console.log(res.body[0])
           cy.api({
            url: `https://barrigarest.wcaquino.me/transacoes/${res.body[0].id}`,
            method: 'PuT',
            headers: {Authorization: `JWT ${token}`},
            body: {
                status: true,
                data_transacao: "13/06/2023",
                data_pagamento: "13/06/2023",
                descricao: res.body[0].descricao,
                envolvido: res.body[0].envolvido,
                valor: res.body[0].valor,
                conta_id: res.body[0].conta_id
            }
        }).its('status').should('be.equal', 200)
    })

    cy.api({
        url: 'https://barrigarest.wcaquino.me/saldo',
        method: 'GET',
        headers: {Authorization: `JWT ${token}`},
    }).then(res => {
        let saldoConta = null
        res.body.forEach(c => { 
            if(c.conta === 'Conta para saldo') saldoConta = c.saldo
        })
        expect(saldoConta).to.be.equal('4034.00')
    })

})
        
     it('Should removae a transaction', () => {
        cy.api({
            method: 'GET',
            headers: {Authorization: `JWT ${token}`},
            url: 'https://barrigarest.wcaquino.me/transacoes',
            qs: { descricao: 'Movimentacao para exclusao'}
        }).then(res => {
            cy.request({
                url: `https://barrigarest.wcaquino.me/transacoes/${res.body[0].id}`,
                method: 'DELETE',
                headers: {Authorization: `JWT ${token}`}, 
            }).its('status').should('be.equal', 204)
        })
    });
})
   
             
            
            
          
           
           
           
           
             
           
            
            
             
       