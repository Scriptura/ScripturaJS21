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

Pour créez et configurez un utilisateur et une base de donnée un fichier de modèle logiques de données fourni (`/database/logicalDataModel.pgsql`) là encore, vérifier et modifier le nom de la base de données et le nom de l'utilisateur selon vos préférences, ensuite vous avez deux solutions :

1/ importez le fichier sous postgres avec la commande `\i` :

```
postgres=# \i /chemin_du_fichier/database/logicalDataModel.pgsql
```
2/ si cette méthode échoue pour un problème de droit vous pouver copier/coller directement les instructions dans un terminal connecté à postgres via le client psql. Pour ce dernier cas il vous faut découper les copier/coller selon les commandes liées à psql de celles en SQL pur.

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

### Notes sur l'architecture

Le point d'entrée de l'application se fait à partir du fichier `bin/www` qui lance la configuration de démarrage. Il renvoie ensuite au fichier `app.js` qui charge et instantie les modules communs puis renvoie les requêtes vers le dossier `controllers/`. Il récupère aussi les routes sans réponses (erreur 404) et les traite lui-même.

Le dossier `controllers/` est composé de fichiers chargés de capter les routes et de mettre en lien les requêtes avec des données et une vue. Les données dynamiques sont appelées via des fichiers contenus dans le dossier `models/`. Enfin les informations obtenues sont passées à la vue via des fichiers contenus dans le dossier `views`.

Par convention les fichiers travaillant au sein de la même logique MVC se doivent de tous porter le même nom :
- `controllers/article.js`
- `models/article.js`
- `views/article.js`

Il existe deux dossiers de fonctions utilitaires à la racine du projet :
- `helpers/` rassemble les fonctions travaillant sur les données,
- `middlewares/` rassemble les fonctions modifiant les informations des routes (err, req, res, next).

Bonne exploration !
