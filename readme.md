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

## Pour démarer

### Postgres

Dans `settings/` copiez/collez le fichier `variables-model.js`, renommez-le `variables.js` et configurez ses variables. Notamment :

```
// database :
exports.host = 'localhost'
exports.port = 5432
exports.database = 'scripturadb'
exports.user = 'yourusername'
exports.password = 'yourpassword'
```

Démarez une session postgres :

```
$ sudo -i -u postgres psql
```

Puis créez et configurez une base de donnée (nommée par exemple ici `scriptruradb`) à l'aide du fichier de modèle logiques de données fourni :

```
postgres=# \i /chemin_du_fichier/database/logicalDataModel.pgsql
```

### Node.js/Express

Dans le dossier racine du projet, en ligne de commande :

```
$ yarn install
```

Et pour lancer le projet en mode développement :

```
$ yarn dev
```

Une fenêtre s'ouvre alors dans votre navigateur. L'application est consultables sur smatphone avec le même port si vous disposez du wifi.

### Notes sur l'architecture

Le point d'entrée de l'application se fait à partir du fichier `bin/www` qui lance la configuration de démarrage. Il renvoie ensuite au fichier `app.js` qui charge et instantie les modules communs puis renvoie les requêtes vers le dossier `controllers/`. Il récupère aussi les routes sans réponses (erreur 404) et les traite lui-même.

Le dossier `controllers/` est composé de fichiers chargés de capter les routes et de mettre en lien les requêtes avec des données et une vue. Les données dynamiques sont appelées via des fichiers contenus dans le dossier `models/`. Enfin les informations obtenues sont passées à la vue via des fichiers contenus dans le dossier `views`.

Par convention les fichiers travaillant au sein de la même logique MVC se doivent de tous porter le même nom :
- `controllers/index.js`
- `models/index.js`
- `views/index.js`

Il existe deux dossiers de fonctions utilitaires à la racine du projet :
- `helpers/` rassemble les fonctions travaillant sur les données,
- `middlewares/` rassemble les fonctions modifiant les informations des routes (err, req, res, next).

Bonne exploration !
