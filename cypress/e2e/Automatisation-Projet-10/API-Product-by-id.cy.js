/// <reference types="cypress" />

describe('Afficher le panier en cours chez l\'utilisateur courant (Connecté)', () => {
    let Token; 

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

    const productIds = [1,3]; // IDs des produits à tester

    for (let i = 0; i < productIds.length; i++) {
        const productId = productIds[i];

    it('Le code statut 404 Produit inexistant & 200 pour produit existant', () => {

        cy.request({
            method: 'GET',
            url: `http://localhost:8081/products/${productId}`, 
            headers: {
                Authorization: `Bearer ${Token}` 
            },      
            failOnStatusCode: false 
        }).then((response) => {
            
          if (productId < 3 || productId > 10) {
            cy.log(`Produit Inexistant Pour l'ID ${productId}, le statut: ${response.status}`);
            expect(response.status).to.eq(404);
          } else{
            cy.log(`Produit Existant Pour l'ID ${productId}, le statut: ${response.status}`);
            expect(response.status).to.eq(200);
            
          }
        });
    
    });

};



});