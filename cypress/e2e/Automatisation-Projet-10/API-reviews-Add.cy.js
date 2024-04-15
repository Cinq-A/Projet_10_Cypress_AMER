/// <reference types="cypress" />

describe('Se connecter', () => {
    let Token; 
    let nombredemessage;
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

    it('Verfier le nombre de commentaires existants', () => {
       
        cy.request({
          method: 'GET',
          url: 'http://localhost:8081/reviews',
          headers: {
            Authorization: `Bearer ${Token}` 
        },   
        
        }).then((response) => {
     
          expect(response.status).to.eq(200);
          nombredemessage = response.body.length;
          cy.log("Nombre de commentaires initial ="+nombredemessage)
          
         
        });
      });

      it('Ajouter un commentaire', () => {
        const titre = "titre de test "; 
        const commentaire = "message de test";
        const note = 5;
    
        cy.request({
            method: 'POST',
            url: 'http://localhost:8081/reviews',
            headers: {
                Authorization: `Bearer ${Token}` 
            },   
            body: {
                title: titre,
                comment: commentaire,
                rating : note
            },
            failOnStatusCode: false 
        }).then((response) => {
            
            if (response.status === 200) {
             
                expect(response.status).to.eq(200);
            } else {
               
                cy.log('La requête a échoué avec un code ' + response.status);
               
                cy.fail('La requête a échoué avec un code ' + response.status);
            }
        }); });
    


      it('Vérfier la présence du commentaire ajouté', () => {
       
       
                cy.request({
                    method: 'GET',
                    url: 'http://localhost:8081/reviews',
                    headers: {
                        Authorization: `Bearer ${Token}` 
                    }, 
                    failOnStatusCode: false 
                }).then((response) => {

                   if(response.body.length > nombredemessage){ 

                    expect(response.status).to.eq(200);

                    nombredemessage = response.body.length;

                    cy.log("le message est ajouté avec succès");
                    cy.log("Nombre de commentaires actuel ="+nombredemessage)
                    
                   } else {

                     cy.fail("le message n'est pas ajouté !")}
                });
            });
           
     



}); 

