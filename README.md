# Guide d'utilisation de [PROJET_10_CYPRESS].

## Installation


### Démarrage avec Docker
---
Ce projet nécessite Docker pour être exécuté localement. Suivez les étapes ci-dessous pour démarrer le projet avec Docker :

1. Assurez-vous d'avoir Docker installé et ouvert sur votre machine. 
- Si ce n'est pas le cas, vous pouvez le télécharger à partir du [site officiel de Docker](https://www.docker.com/get-started).
---
### Cloner et ouvrir le site - *eco.bliss.bath*
---
1. Clonez ce dépôt GitHub [eco.bliss.bath](https://github.com/OpenClassrooms-Student-Center/TesteurLogiciel_Automatisez_des_tests_pour_une_boutique_en_ligne) sur votre machine locale.
2. Ouvrez un terminal et déplacez-vous vers le répertoire du projet.
3. Exécutez la commande suivante pour construire l'image Docker : 
    ```bash
    sudo docker-compose up --build
    ```

4. Ouvrez le site depuis la page [http://localhost:8080](http://localhost:8080)

5. Vous trouverez le swagger à cette adresse [http://localhost:8081/api/doc](http://localhost:8081/api/doc).
 
6. Les données du test: Email: test2@test.fr mot de passe:  *testtest*

---
### Cloner et ouvrir le projet - *PROJET_10_CYPRESS*
---

>
> **Prérequis**
>
> Avant de pouvoir exécuter ce projet, assurez-vous d'avoir **Node.js** installé sur votre machine. 
>- Si ce n'est pas le cas, vous pouvez le télécharger et l'installer depuis le site officiel de Node.js : [Télécharger Node.js](https://nodejs.org/)
---

1. Clonez ce dépôt GitHub [PROJET_10_CYPRESS](https://github.com/PROJET_10_CYPRESS) sur votre machine locale.
2. Ouvrez un terminal et déplacez-vous vers le répertoire du projet.

3. Exécutez la commande suivante pour excecuter les tests sur le terminal et générer le rapport: 

    ```bash
    npx  cypress run
    ```

4. Pour lancer l'interface graphique de **Cypress** et ouvrir  votre navigateur pour sélectionner et exécuter des tests, executer la commande dans le terminal: 
    ```bash
    npx  cypress open
    ```
---    
### Ressources supplémentaires
---

>
> Pour plus d'informations sur Cypress, consultez la [documentation officielle de Cypress](https://docs.cypress.io/).

