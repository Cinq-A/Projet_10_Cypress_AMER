/// <reference types="cypress" />

describe('Se connecter.', () => {
    let Token; 
    const productId = 5; // IDs du produit à tester
    const QTE_STOCK_initiale = 23;
    let QTE_STOCK_actuelle;
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

   
    
    it(`Afficher le stock du produit ID N° ${productId} Avant l'ajout au panier` , () => {

        cy.request({
            method: 'GET',
            url: `http://localhost:8081/products/${productId}`, 
            headers: {
                Authorization: `Bearer ${Token}` 
            },      
            failOnStatusCode: false 
        }).then((response) => {
            
          if (response.body.availableStock === QTE_STOCK_initiale ) {
            cy.log(`Quantité en stock du produit ID ${productId}, est : ${QTE_STOCK_initiale}`);
            expect(response.status).to.eq(200);
          } else{
            cy.fail(`La quantité de stock initial du Produit ID ${productId}, n'est pas la bonne valeur !`); 
            expect(response.status).to.eq(404);
            
          }
        });
    
    });
    it('ajouter le produit avec stock positif au panier ! Quantité  = 20', () => {

         

            cy.visit('http://localhost:8080/#/');
            cy.get('[data-cy="nav-link-login"]').click();  

            cy.get('[data-cy="login-input-username"]').type('test2@test.fr');
            cy.get('[data-cy="login-input-password"]').type('testtest');
            cy.get('[data-cy="login-submit"]').click().wait(2000);
            cy.get('.text-header > button').click();   
            cy.get(':nth-child(3) > .add-to-cart > [data-cy="product-link"]').click().wait(2000) ;
            cy.get('[data-cy="detail-product-quantity"]').clear().type('20');
            cy.get('[data-cy="detail-product-add"]').click();
           
            cy.get('[data-cy="cart-line-name"]').should('contain',"Poussière de lune");
            cy.get('[data-cy="cart-line-quantity"]').invoke('val').then(quantity => {
                
                if (quantity > '0') {
                    cy.log("Le produit en stock positif est ajouté au panier avec la quantité 20 !");
                } else {
                    cy.fail("Le produit en stock positif n'est pas ajouté au panier");
                }
          
        });  

      
    });  


    it(`Afficher le stock du produit ID N° ${productId} après l'ajout de 20 dans le panier` , () => {

        cy.request({
            method: 'GET',
            url: `http://localhost:8081/products/${productId}`, 
            headers: {
                Authorization: `Bearer ${Token}` 
            },      
            failOnStatusCode: false 
        }).then((response) => {
            QTE_STOCK_actuelle = response.body.availableStock;
          if (QTE_STOCK_actuelle === QTE_STOCK_initiale-20 ) {
            cy.log(`Quantité du produit ID ${productId}: Stock actuel= ${QTE_STOCK_actuelle}, Stock initial= ${QTE_STOCK_initiale}`);
            expect(response.status).to.eq(200);
          } else{
            cy.fail(`Produit ID ${productId}, affiche toujours le stock initial: ${QTE_STOCK_initiale}`); 
            wait(2000);
            
          }
        });
    
    });


    it('vider le panier ! ', () => {
        cy.visit('http://localhost:8080/#/');
        cy.get('[data-cy="nav-link-login"]').click(); 
        cy.get('[data-cy="login-input-username"]').type('test2@test.fr');
        cy.get('[data-cy="login-input-password"]').type('testtest');
        cy.get('[data-cy="login-submit"]').click();
        cy.get('[data-cy="nav-link-cart"]').click();
        cy.get('[data-cy="cart-line-delete"]').click(); 

});




});