# Scriptura

Scriptura est une application web sous Node.js utilisant :
* Express 4 comme environnement de développement
* PostgreSQL comme base de donnée
* Pug comme moteur de template
* Stylus comme préprocesseur pour les styles

## Configuration requise :

* PostgreSQL 14.1
* Node.js 17.4.0
* pnpm 8

## Pour démarrer

### Postgres

Dans `settings/` dupliquez le fichier `variablesModel.js`, renommez-le `variables.js` et vérifier/modifier ses variables en fonction de vos préférences, notamment celles liées à la base de données :

```
// database :
exports.host = 'localhost'
exports.port = 5432
exports.database = 'scriptura_db'
exports.user = 'scriptura_user'
exports.password = 'root'
```

Démarrez une session postgres via le client psql :

```
$ sudo -i -u postgres psql
```

Il vous faut créer et configurer un utilisateur et une base de donnée. Pour cela un fichier `logicalDataModel.pgsql` est fourni dans le dossier `database`. Là encore, vérifiez et modifiez le nom de la base de données et le nom de l'utilisateur selon vos préférences. Ensuite vous avez deux solutions :

1. importez le fichier sous postgres avec la commande `\i` :

```
postgres=# \i /chemin_du_fichier/database/logicalDataModel.pgsql
```
2. si cette méthode échoue pour un problème de droit vous pouvez copier/coller directement les instructions dans un terminal connecté à postgres via le client psql. Pour ce dernier cas il vous faut découper les copier/coller selon les commandes liées à psql de celles en SQL pur.

### Node.js/Express

Dans le dossier racine du projet, ouvrez un terminal et tapez ces instructions pour installer les dépendances du projet :

```
$ pnpn install
```

Ensuite, pour lancer le projet en mode développement :

```
$ pn dev
```

Une fenêtre s'ouvre alors dans votre navigateur et l'application se charge sur le port `localhost:9001`. Si vous disposez du wifi, l'application est aussi consultable avec un terminal mobile - smatphone ou tablette - sur le port `192.168.1.89:9001`.

Bonne exploration !

### Notes sur l'architecture

- `bin/www`  est le point d'entrée de l'application, il lance la configuration de démarrage,
- `app.js` charge et instantie les modules communs, renvoie les requêtes vers `controllers/routesDispatcher.js` et récupère les routes sans réponses (erreur 404),
- `controllers` capte les routes et met en lien les requêtes avec des données et une vue,
- `models` manipule les données au niveau de la base de données via des requêtes postgres,
- `views` traite les informations obtenues dans des templates via le moteur de rendu pug.

Par convention les fichiers travaillant au sein de la même logique MVC se doivent de tous porter le même nom :
```
controllers/article.js
models/article.js
views/article.js
```
Il existe deux dossiers de fonctions utilitaires à la racine du projet :
- `middlewares` rassemble les fonctions modifiant les informations des routes (err, req, res, next),
- `helpers` rassemble les fonctions travaillant sur les données au niveau de l'application cliente (`models`).