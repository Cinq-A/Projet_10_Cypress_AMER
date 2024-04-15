/// <reference types="cypress" />



describe('Connexion - Front', () => {
    beforeEach('Ouverture de la page d\'accueil "ECO.bliss.bath" & afficher le formulaire de connexion.', () => {
            cy.visit('http://localhost:8080/#/');
            cy.get('[data-cy="nav-link-login"]').click();  
            
        });

        it('Se connecter ', () => {

            cy.get('[data-cy="login-input-username"]').type('test2@test.fr');
            cy.get('[data-cy="login-input-password"]').type('testtest');
            cy.get('[data-cy="login-submit"]').click();
            cy.get('[data-cy="nav-link-cart"]').should('be.visible');


        });  
        it('Vérifier si y a pas affichage des produits avec un stock < ou = à 0', () => {

            cy.request({
                method: 'GET',
                url: `http://localhost:8081/products`, 
            
            }).then((response) => {
                
                expect(response.status).to.eq(200);

                const stockInferieurAZero = response.body.filter(product => product.availableStock < 0);
                cy.log("aaa"+stockInferieurAZero[0].id)
             if  (stockInferieurAZero.length >= 0){
                for(let i = 0; i<stockInferieurAZero.length; i++){
                cy.fail("Produit id: "+stockInferieurAZero[i].id +", nom : "+stockInferieurAZero[i].name+" a un stock négatif !");}}
                else{cy.log("Tous les produits sont disponibles en stock.")};

               
            });
        
        });

        it('ajouter le produit avec stock négatif au panier ! ', () => {

            // cy.visit('http://localhost:8080/#/');
            // cy.get('[data-cy="nav-link-login"]').click();  

            cy.get('[data-cy="login-input-username"]').type('test2@test.fr');
            cy.get('[data-cy="login-input-password"]').type('testtest');
            cy.get('[data-cy="login-submit"]').click().wait(2000);
            cy.get('.text-header > button').click();   
            cy.get(':nth-child(1) > .add-to-cart > [data-cy="product-link"]').click().wait(2000) ;
            cy.get('[data-cy="detail-product-add"]').click();
           
            cy.get('[data-cy="cart-line-name"]').should('contain',"Sentiments printaniers");
            cy.get('[data-cy="cart-line-quantity"]').invoke('val').then(quantity => {
                
                if (quantity > '0') {
                    cy.fail("Le produit en stock négatif est ajouté au panier !");
                } else {
                    cy.log("Le produit en stock négatif n'est pas ajouté au panier");
                }
          
        });  

    
    });

    it('vider le panier ! ', () => {
        cy.get('[data-cy="login-input-username"]').type('test2@test.fr');
        cy.get('[data-cy="login-input-password"]').type('testtest');
        cy.get('[data-cy="login-submit"]').click();
        cy.get('[data-cy="nav-link-cart"]').click();
        cy.get('[data-cy="cart-line-delete"]').click(); 

});


});