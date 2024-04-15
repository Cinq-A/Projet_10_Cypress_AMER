/// <reference types="cypress" />




describe('Smoke Tests', () => {
beforeEach('Ouverture de la page d\'accueil "ECO.bliss.bath" & afficher le formulaire de connexion.', () => {
        cy.visit('http://localhost:8080/#/');
        cy.get('[data-cy="nav-link-login"]').click();  
        
});


        it('Vérifiez la présence des champs et boutons de connexion', () => {
          
            cy.get('[data-cy="login-input-username"]').should('be.visible');
            cy.get('[data-cy="login-input-password"]').should('be.visible');
            cy.get('[data-cy="login-submit"]').should('be.visible');

        });  
        
       

        it('Vérifiez la présence des boutons d’ajout au panier quand vous êtes connecté ', () => {
            
            cy.get('[data-cy="login-input-username"]').type('test2@test.fr');
            cy.get('[data-cy="login-input-password"]').type('testtest');
            cy.get('[data-cy="login-submit"]').click();

            cy.get(':nth-child(1) > .add-to-cart > [data-cy="product-home-link"]').click();//,{ timeout: 20000 }
            cy.get('[data-cy="detail-product-add"]').should('be.visible'); 


        });


        it('Vérifiez la présence du champ de disponibilité du produit quand vous êtes connecté ', () => {

            cy.get('[data-cy="login-input-username"]').type('test2@test.fr');
            cy.get('[data-cy="login-input-password"]').type('testtest');
            cy.get('[data-cy="login-submit"]').click();
            cy.get(':nth-child(1) > .add-to-cart > [data-cy="product-home-link"]').click();
            cy.get('[data-cy="detail-product-quantity"]').should('be.visible'); 
 

        });

});
