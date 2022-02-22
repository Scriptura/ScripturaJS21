# Scriptura

Scriptura est une application web sous Node.js utilisant :
* Express 4 comme environnement de développement
* PostgreSQL comme base de donnée
* Pug comme moteur de template
* Stylus comme préprocesseur pour les styles

## Configuration requise :

* PostgreSQL 14.1
* Node.js 17.4.0
* Yarn 1.22.17

## Pour démarrer

### Postgres

Dans `settings/` copiez/collez le fichier `variables-model.js`, renommez-le `variables.js` et vérifier/modifier ses variables en fonction de vos préférences, notamment celle liées à la base de données :

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

Il vous faut créer et configurer un utilisateur et une base de donnée. Pour cela un fichier `logicalDataModel.pgsql` est fourni dans le dossier `database`. Là encore, vérifier et modifier le nom de la base de données et le nom de l'utilisateur selon vos préférences. Ensuite vous avez deux solutions :

1. importez le fichier sous postgres avec la commande `\i` :

```
postgres=# \i /chemin_du_fichier/database/logicalDataModel.pgsql
```
2. si cette méthode échoue pour un problème de droit vous pouver copier/coller directement les instructions dans un terminal connecté à postgres via le client psql. Pour ce dernier cas il vous faut découper les copier/coller selon les commandes liées à psql de celles en SQL pur.

### Node.js/Express

Dans le dossier racine du projet, ouvrez un terminal et tapez ces instructions pour installer les dépendances du projet :

```
$ yarn install
```

Ensuite, pour lancer le projet en mode développement :

```
$ yarn dev
```

Une fenêtre s'ouvre alors dans votre navigateur. L'application est consultables avec un smatphone sur le port `localhost:9001` si vous disposez du wifi.

Bonne exploration !

### Notes sur l'architecture

Le point d'entrée de l'application se fait à partir de `bin/www` qui lance la configuration de démarrage. Ensuite, `app.js` charge et instantie les modules communs, renvoie les requêtes vers `controllers/routesDispatcher.js` et récupère les routes sans réponses (erreur 404). Le dossier `controllers` est composé de fichiers chargés de capter les routes et de mettre en lien les requêtes avec des données et une vue. Les données dynamiques sont appelées via des fichiers contenus dans le dossier `models`. Enfin les informations obtenues sont passées à la vue via des fichiers contenus dans le dossier `views`.

Par convention les fichiers travaillant au sein de la même logique MVC se doivent de tous porter le même nom :
- `controllers/article.js`
- `models/article.js`
- `views/article.js`

Il existe deux dossiers de fonctions utilitaires à la racine du projet :
- `helpers` rassemble les fonctions travaillant sur les données au niveau de l'application cliente (`models/` manipule les données au niveau de la base de données),
- `middlewares` rassemble les fonctions modifiant les informations des routes (err, req, res, next).