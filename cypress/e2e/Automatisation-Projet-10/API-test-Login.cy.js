/// <reference types="cypress" />

describe('Test de connexion à l\'API', () => {
    beforeEach(() => {
        // Assurez-vous d'être connecté avant de commencer les tests API
        cy.request({
            method: 'POST',
            url: 'http://localhost:8081/login',
            body: {
                username: 'test2@test.fr',
                password: 'testtest'
            }
        }).then((response) => {
            
            expect(response.status).to.eq(200);
        });
    });

    it('Retourne un code d\'erreur 401 pour un utilisateur inconnu', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8081/login',
            body: {
                username: 'inconnu@inconnu.fr',
                password: 'mot_de_passe_incorrect'
            },
            failOnStatusCode: false 
        }).then((response) => {
           
            expect(response.status).to.eq(401);
        });
    });

    it('Retourne un code de statut 200 pour un utilisateur connu', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8081/login',
            body: {
                username: 'test2@test.fr',
                password: 'testtest'
            }
        }).then((response) => {
            
            expect(response.status).to.eq(200);
            
        });
    });
});
