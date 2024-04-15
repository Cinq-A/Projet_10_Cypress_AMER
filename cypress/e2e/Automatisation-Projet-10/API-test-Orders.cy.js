/// <reference types="cypress" />

describe('Afficher le panier en cours chez l\'utilisateur courant (Connecté)', () => {
    let Token; 

    beforeEach(() => {
      
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

    it('Le code statut 404 pour panier vide & 200 pour panier plein', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8081/orders', 
            headers: {
                Authorization: `Bearer ${Token}` 
            }      
        }).then((response) => {
           console.log(response.body.orderLines.length);
            if (response.body.orderLines.length === 0) {
             cy.log("Le panier est vide !")
                expect(response.status).to.eq(404);
            } else {
                cy.log("Le panier est plein !")
                expect(response.status).to.eq(200);     
                  
            }
        });
    });
    

});

describe('Afficher le panier  chez l\'utilisateur (NON-Connecté)', () => {
    

    it('Le code de statut est 401, indiquant une non authentification', () => {
       
        cy.request({
            method: 'GET',
            url: 'http://localhost:8081/orders',
            failOnStatusCode: false 
        }).then((response) => {
            
            expect(response.status).to.eq(401);
        });
    });
    
    

});

describe('Afficher le panier  chez l\'utilisateur (NON-autorisé)', () => {
    let Token; 

    beforeEach(() => {
      
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
          
            expect(Token).to.exist; // 
        });
    });
     
    it('Vérifier l\'accès avec des droits insuffisants à la liste des produits du panier', () => {
       
        cy.request({
            method: 'GET',
            url: 'http://localhost:8081/orders',
            // headers: {
            //     Authorization: `Bearer ${Token}` 
            // },
            failOnStatusCode: false 
        }).then((response) => {
         
            expect(response.status).to.eq(401);
        });
    });
    
    
    

});


describe('Afficher la  liste des produits panier  chez l\'utilisateur (connecté)', () => {
    let Token; 

    beforeEach(() => {
      
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
          
            expect(Token).to.exist; // 
        });
    });

    it('Vérifier l\'accès avec des droits insuffisants à la liste des produits du panier', () => {
       
        cy.request({
            method: 'GET',
            url: 'http://localhost:8081/orders',
            headers: {
                Authorization: `Bearer ${Token}` 
            },
        }).then((response) => {
            
            expect(response.status).to.eq(200);
    
        
            if (response.body && Object.keys(response.body).length == 0) {
                
                cy.log('Le panier est vide.');  
                
            } else {
               
                cy.log('Contenu du panier :');
                Object.values(response.body.orderLines).forEach((item, index) => {
                    cy.log(`${index + 1}. Produit : ${item.id}, Nom : ${item.product.name}, Prix unitaire : ${item.product.price} €`);
                });   
            }
        });
    });
    
    
    

});