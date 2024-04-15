/// <reference types="cypress" />

describe('Se connecter', () => {
    let Token; 
    let lastOrderId;
    before(() => {
      
        cy.request({
            method: 'POST',
            url: 'http://localhost:8081/login',
            body: {
                username: 'test2@test.fr',
                password: 'testtest'
            }
        }).then((response) => {
          
            expect(response.status).to.eq(200);

          
            Token = response.body.token;
          
            // expect(Token).to.exist; 
            
        });
    });  

   

    it('Ajouter un produit dans le panier', () => {
       
        const product = 3; 
        const quantity = 2; 
    
      
        cy.request({
          method: 'PUT',
          url: 'http://localhost:8081/orders/add',
          headers: {
            Authorization: `Bearer ${Token}` 
        },   
          body: {
            product: product,
            quantity: quantity
          }
        }).then((response) => {
     
          expect(response.status).to.eq(200);
          lastOrderId = response.body.orderLines[0].id;
          cy.log("num operation="+lastOrderId)
      
          const orderLine = response.body.orderLines.find(line => line.product.id === product);

      
          expect(orderLine.quantity).to.eq(quantity); 
          
         
        });
      });


      it('vider le panier', () => {
       
        const clearCart = () => {
            if (lastOrderId) {
                cy.request({
                    method: 'DELETE',
                    url: `http://localhost:8081/orders/${lastOrderId}/delete`,
                    headers: {
                        Authorization: `Bearer ${Token}` 
                    }, 
                }).then((response) => {
                    
                    expect(response.status).to.eq(200);
                });
            }
            cy.log("num operation="+lastOrderId)
        };
    
        
            clearCart();
        
    });
    


}); 

