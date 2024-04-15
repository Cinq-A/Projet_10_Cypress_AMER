/// <reference types="cypress" />




describe('Connexion - Front', () => {
    beforeEach('Ouverture de la page d\'accueil "ECO.bliss.bath" & afficher le formulaire de connexion.', () => {
            cy.visit('http://localhost:8080/#/');
            cy.get('[data-cy="nav-link-login"]').click();  
            
        });

        it('Vérifiez la présence du lien PANIER quand vous êtes connecté ', () => {

            cy.get('[data-cy="login-input-username"]').type('test2@test.fr');
            cy.get('[data-cy="login-input-password"]').type('testtest');
            cy.get('[data-cy="login-submit"]').click();
            cy.get('[data-cy="nav-link-cart"]').should('be.visible');


        });

        it('Vérifiez l\'affichage du message "Identifiants incorrects" avec Email erroné ', () => { 

            cy.get('[data-cy="login-input-username"]').type('email@email.fr');
            cy.get('[data-cy="login-input-password"]').type('testtest');
            cy.get('[data-cy="login-submit"]').click();
            cy.get('[data-cy="login-errors"]').should('contain','Identifiants incorrects');


        });
        it('Vérifiez l\'affichage du message "Identifiants incorrects" avec mot de passe erroné ', () => {

            cy.get('[data-cy="login-input-username"]').type('test2@test.fr');
            cy.get('[data-cy="login-input-password"]').type('mdp erroné');
            cy.get('[data-cy="login-submit"]').click();
            cy.get('[data-cy="login-errors"]').should('contain','Identifiants incorrects');


        });
        it('Vérifiez l\'affichage du message "Merci de remplir correctement tous les champs" avec Email format texte ', () => {

            cy.get('[data-cy="login-input-username"]').type('emailformattext');
            cy.get('[data-cy="login-input-password"]').type('testtest');
            cy.get('[data-cy="login-submit"]').click();
            cy.get('[data-cy="login-errors"]').should('contain','Merci de remplir correctement tous les champs');


        });

        it('Vérifiez l\'affichage du message "Merci de remplir correctement tous les champs" avec les champs vides ', () => {

            cy.get('[data-cy="login-submit"]').click();
            cy.get('[data-cy="login-errors"]').should('contain','Merci de remplir correctement tous les champs');


        });
    });