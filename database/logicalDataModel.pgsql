-- ------------------------------------------------------------------------------
-- @name        Logical Data Model
-- @description Modèle logique des données pour PostgreSQL
-- @note        Sémantique des tables et colonnes principalement inspirée de schema.org
-- @note        Les underscores évitent d'utiliser un mot réservé par SQL
-- ------------------------------------------------------------------------------


-- \i /../database/logicalDataModel.pgsql

-- Les lignes de commande suivantes sont pour le dev :
CREATE USER scriptura_user WITH ENCRYPTED PASSWORD 'root';
DROP DATABASE IF EXISTS scriptura_db;
CREATE DATABASE scriptura_db OWNER scriptura_user;
-- CREATE DATABASE scriptura_db;
-- GRANT ALL PRIVILEGES ON DATABASE scriptura_db TO scriptura_user;

\c scriptura_db;


CREATE TABLE __preference (
  _id                 SMALLSERIAL       NOT NULL,
  _name               VARCHAR(64)       NOT NULL, -- nom du site
  _url                VARCHAR(255)      NOT NULL, -- url du site
  _creation           TIMESTAMP         NULL,     -- date de création du site
  _manager_id         BIGINT            NULL,     -- id du responsable éditorial (_persons)
  _analytics          VARCHAR(16)       NULL,     -- compte google analytics
  _style              SMALLINT          NULL,     -- choix du style css
  _logo_id            BIGINT            NULL,     -- logo du site (id _medias)
  _favicon            VARCHAR(255)      NULL,     -- url de la favicon
  _background         VARCHAR(255)      NULL,     -- url de l'image de fond
  _default_thumbnail  VARCHAR(255)      NULL,     -- url de la miniature par défaut
  _snowstorm          BOOLEAN           NULL,     -- effet tempête de neige sur le site
  CONSTRAINT __preference_pkey PRIMARY KEY (_id)
);


CREATE TABLE __user (
  _id                 UUID              NOT NULL,
  -- _id                 UUID              DEFAULT gen_random_uuid(),
  _person_id          BIGINT            NULL,     -- référence éventuelle à __person
  _username           VARCHAR(32)       NOT NULL, -- nom utilisateur ; "username" est le terme technique consacré, et non pas "user name"
  _password           CHAR(40)          NOT NULL, -- mot de passe crypté en SHA1
  _email              VARCHAR(128)      NULL,     -- facultatif car comptes sans email pour mineurs
  _status             SMALLINT          NULL,     -- rôle (ex : administrateur, abonné)
  _display_name       SMALLINT          NULL,     -- nom public choisi dans la table __person
  _language           VARCHAR(5)        NULL,     -- choix de la langue (format code langue : ISO639-1 alpha-2 + ISO3166-1 alpha-2 ; ex : fr_FR)
  _visibility         BOOLEAN           NULL,     -- visibilité en ligne (pour un forum)
  _community          VARCHAR(40)       NULL,     -- appartenance à une communauté ou cercle
  _site_style         BOOLEAN           NULL,     -- option de préférence graphique pour le site__contributorpe/Paris)
  _time_zone          TIMESTAMP         NULL,
  _private_message    BOOLEAN           NULL,     -- autoriser les messages privés
  _creation           TIMESTAMP         NOT NULL, -- date de création du profil -- DEFAULT CURRENT_DATE
  _revision           TIMESTAMP         NULL,     -- date de révision du profil
  _last_login         TIMESTAMP         NULL,     -- dernière connection
  CONSTRAINT __user_pkey PRIMARY KEY (_id)
  -- CONSTRAINT __person_user_id_fkey FOREIGN KEY (_person_id) REFERENCES __person(_id)
);


CREATE TABLE __person (
  _id                 BIGSERIAL         NOT NULL, -- UUID ?
  _user_id            BIGINT            NULL,     -- référence éventuelle à __user
  _sexe               CHAR(1)           NULL,     -- selon la norme ISO/IEC 5218 ; inconnu : 0, homme : 1, femme : 2, non applicable : 9
  _given_name         VARCHAR(32)       NULL,     -- prénom
  _additional_name    VARCHAR(32)       NULL,     -- deuxième prénom
  _family_name        VARCHAR(32)       NULL,     -- nom de famille
  _usual_name         VARCHAR(32)       NULL,     -- nom d'usage, nom d'épouse
  _nickname           VARCHAR(32)       NULL,     -- surnom
  _prefix             VARCHAR(32)       NULL,     -- titres et civilité
  _suffix             VARCHAR(32)       NULL,     -- abréviation typographique postname (ex : s.j., o.p.)
  _birth_date         DATE              NULL,     -- date de naissance
  _birth_place_id     BIGINT            NULL,     -- lieu de naissance (id de _places)
  _death_date         DATE              NULL,     -- date du décès
  _death_place_id     BIGINT            NULL,     -- lieu du décès (id de _places)
  _nationality        VARCHAR(2)        NULL,     -- nationnalité, ISO 3166-1 alpha-2
  _place_id           BIGINT            NULL,     -- addresse (id de _places)
  _phone              VARCHAR(32)       NULL,     -- numéro de téléphone
  _phone2             VARCHAR(32)       NULL,     -- numéro de téléphone alternatif
  _email              VARCHAR(128)      NULL,     -- peut être différent du email de la table _users
  _fax                VARCHAR(32)       NULL,     -- numéro de fax
  _url                VARCHAR(255)      NULL,     -- url représentant l'utilisateur (Linkedin, son site web...) ; limitation la longeur : une url non optimisée n'a pas de sens de nos jours
  _occupation         VARCHAR(30)       NULL,     -- métier, profession
  _bias               VARCHAR(30)       NULL,     -- tendance, inclinaison, alignement
  _hobby              VARCHAR(64)       NULL,     -- centre d'intéret, passe-temps
  _organization_id    BIGINT            NULL,     -- organisation d'appartenance (id de _organizations)
  _award              VARCHAR(128)      NULL,     -- prix, distinction
  _media_id           VARCHAR(255)      NULL,     -- url de l'avatar (en plus d'un gravatar sur le mail)
  _devise             VARCHAR(100)      NULL,     -- 100 caractères max
  _description        TEXT              NULL,     -- 800 caractères max
  CONSTRAINT __person_pkey PRIMARY KEY (_id)
);


-- CREATE TABLE __group ? (groupe utilisateurs, famille...)


CREATE TABLE __organization (
  _id                 BIGSERIAL         NOT NULL,
  _name               VARCHAR(64)       NOT NULL, -- nom de l'organisation
  _type               VARCHAR(30)       NULL,     -- entreprise, association, organisme publique
  _purpose            VARCHAR(30)       NULL,     -- but de l'organisation
  _duns               SMALLINT          NULL,     -- numéro international D-U-N-S®
  _siret              SMALLINT          NULL,     -- pour l'Europe (le numéro TVA est référé au SIRET)
  _brand              VARCHAR(255)      NULL,     -- marques associées
  _place_id           BIGINT            NULL,     -- addresse
  _email              VARCHAR(128)      NULL,     -- mail de contact
  _phone              VARCHAR(30)       NULL,     -- numéro de téléphone
  _phone_2            VARCHAR(30)       NULL,     -- numéro de téléphone alternatif
  _fax                VARCHAR(30)       NULL,     -- numéro de fax
  _url                VARCHAR(255)      NULL,     -- url représentant l'organisation
  _media_id           BIGINT            NULL,     -- id du logo
  _person_id          VARCHAR(255)      NULL,     -- id de personnes membre
  _parent_id          BIGINT            NULL,     -- id d'une organisation mère le cas échéant
  _lft                BIGINT            NULL,     -- représentation intervalaire valeur de gauche
  _rgt                BIGINT            NULL,     -- représentation intervalaire valeur de droite
  CONSTRAINT __organization_pkey PRIMARY KEY (_id)
);


CREATE TABLE __place (
  _id                 BIGSERIAL         NOT NULL,
  _name               VARCHAR(60)       NULL,     -- nom pour un marker ; ne pas rendre cette donnée obligatoire (_place peut référencer un simple point de coordonnées GPS)
  _street             VARCHAR(60)       NULL,     -- adresse
  _postal_code        VARCHAR(16)       NULL,     -- code postal, internationaux compris
  _locality           VARCHAR(64)       NULL,     -- localité
  _region             VARCHAR(64)       NULL,     -- département français, cantons suisses...
  _country            VARCHAR(64)       NULL,     -- pays
  _location           POINT             NULL,     -- coordonnées GPS, par convention les bases de donnée utilisent (longitude, latitude) sous forme x,y et non (latitude, longitude) comme traditionnellement en cartographie, le respect de cette norme facilite les calculs sur la base @see https://postgis.net/2013/08/18/tip_lon_lat/ @note type REAL peu précis mais utilisé par OpenStreetMap sous l'alias FLOAT8, utilise aussi INT4
  _elevation          SMALLINT          NULL,     -- altitude en mètre
  _type               VARCHAR(30)       NULL,     -- Restaurant, bar...
  _description        VARCHAR           NULL,     -- Informations sur l'adresse
  CONSTRAINT __place_pkey PRIMARY KEY (_id)
);


CREATE TABLE __post (
  _id                 BIGSERIAL         NOT NULL,
  _name               VARCHAR(255)      NOT NULL, -- titre
  _content            TEXT              NULL,     -- contenu
  _creation           TIMESTAMP         NOT NULL, -- date de création -- DEFAULT CURRENT_DATE
  _revision           TIMESTAMP         NULL,     -- date de révision
  _type               VARCHAR(255)      NULL,     -- article, page, etc...
  _slug               VARCHAR(255)      NULL,     -- slug propre à l'article, différent de l'url canonique, celle-ci étant reconstituée à partir le l'index par exemple
  _description        VARCHAR           NULL,     -- contenu utilisé pour la balise meta description
  _author_id          BIGINT            NOT NULL, -- créateur du post (contributeur principal)
  _status             SMALLINT          NOT NULL, -- publié, brouillon, refusé, poubelle
  _comments_status    BOOLEAN           NULL,     -- commentaires activés ou non
  _keywords           VARCHAR(255)      NULL,     -- mots-clefs pour le post
  _medias             VARCHAR(255)      NULL,     -- medias en lien avec le post
  CONSTRAINT __post_pkey PRIMARY KEY (_id)
);


CREATE TABLE __media (
  _id                 BIGSERIAL         NOT NULL,
  _name               VARCHAR(255)      NULL,     -- titre du media
  _creation           TIMESTAMP         NOT NULL, -- date de création
  _revision           TIMESTAMP         NULL,     -- date de révision
  _type               VARCHAR(255)      NULL,     -- .jpg, .ico, .svg, .mp3, .mp4
  _url                VARCHAR(255)      NULL,     -- url du fichier
  _author_id          BIGINT            NOT NULL, -- auteur de l'upload
  _posts_id           BIGINT            NULL,     -- posts en lien (id de _posts)
  _description        VARCHAR(255)      NULL,
  CONSTRAINT __media_pkey PRIMARY KEY (_id)
);


CREATE TABLE __comment (
  _id                 BIGSERIAL         NOT NULL,
  _name               VARCHAR(255)      NULL,     -- titre du commentaire
  _creation           TIMESTAMP         NOT NULL, -- date de création -- DEFAULT CURRENT_DATE
  _revision           TIMESTAMP         NULL,     -- date de révision
  -- _author             SMALLINT          NOT NULL,
  _post_id            SMALLINT          NOT NULL, -- post concerné
  CONSTRAINT __comment_pkey PRIMARY KEY (_id)
);


CREATE TABLE __author ( -- table de lien entre un item et son auteur ou ses contributeurs (__post, __media, __comment)
  _id                 BIGSERIAL         NOT NULL,
  _user_id            BIGINT            NOT NULL,
  _post_id            BIGINT            NULL,
  _media_id           BIGINT            NULL,
  CONSTRAINT __author_pkey PRIMARY KEY (_id)
);


CREATE TABLE __keyword (
  _id                 BIGSERIAL         NOT NULL,
  _name               VARCHAR(64)       NOT NULL, -- nom du mot clef
  _slug               VARCHAR(255)      NULL,
  _parent_id          BIGINT            NULL,     -- id du mot clef parent dans la hierarchie
  _lft                BIGINT            NULL,     -- représentation intervalaire valeur de gauche
  _rgt                BIGINT            NULL,     -- représentation intervalaire valeur de droite
  _value              BIGINT            NOT NULL, -- nombre d'items concerné par le tag
  CONSTRAINT __keyword_pkey PRIMARY KEY (_id)
);


CREATE TABLE __product (
  _id                 BIGSERIAL         NOT NULL,
  _name               VARCHAR(64)       NOT NULL, -- nom du produit
  _price              SMALLINT          NULL,     -- prix du produit
  _iso                VARCHAR(255)      NULL,     -- Numéro IBSN ou Code-barres EAN
  _description        TEXT              NULL,     -- description du produit
  _keywords           VARCHAR(255)      NULL,     -- mots clefs pour le produit
  _medias             BIGINT            NULL,     -- medias en lien avec le produit
  CONSTRAINT __product_pkey PRIMARY KEY (_id)
);


CREATE TABLE __transaction (
  _id                 BIGSERIAL         NOT NULL,
  _name               BIGINT            NOT NULL, -- numéro de la transaction (différent de l'id)
  _client_id          BIGINT            NOT NULL, -- client (id de _users)
  _organization_id    BIGINT            NOT NULL, -- organisation marchande pour le produit (id de _organizations)
  _list               VARCHAR(255)      NULL,     -- liste de l'id des produits (NULL si en cours de commande)
  _creation           TIMESTAMP         NOT NULL, -- date de la transaction -- DEFAULT CURRENT_DATE
  _revision           TIMESTAMP         NULL,     -- date de révision de la transaction
  _purchase           TIMESTAMP         NULL,     -- date de validation de la transaction
  _billing            BIGINT            NULL,     -- id de l'adresse de facturation
  _description        TEXT              NULL,     -- description de la transaction
  CONSTRAINT __transaction_pkey PRIMARY KEY (_id)
);


CREATE TABLE __event (
  _id                 BIGSERIAL         NOT NULL,
  _name               VARCHAR(64)       NOT NULL, -- nom de l'événement
  _begin              TIMESTAMP         NOT NULL, -- début de l'événement
  _end                TIMESTAMP         NULL,     -- fin de l'événement
  _description        TEXT              NULL,     -- description de l'événement
  _creation           TIMESTAMP         NOT NULL, -- date de création de l'événement -- DEFAULT CURRENT_DATE
  _revision           TIMESTAMP         NULL,     -- date de révision de l'événement
  CONSTRAINT __event_pkey PRIMARY KEY (_id)
);


CREATE TABLE __number_option (
  _id                 BIGSERIAL         NOT NULL,
  _name               VARCHAR(64)       NOT NULL, -- nom de l'option
  _value              INT               NULL,     -- valeur
  CONSTRAINT __number_option_pkey PRIMARY KEY (_id)
);


CREATE TABLE __text_option (
  _id                 BIGSERIAL         NOT NULL,
  _name               VARCHAR(64)       NOT NULL, -- nom de l'option
  _value              TEXT              NULL,     -- valeur
  CONSTRAINT __text_option_pkey PRIMARY KEY (_id)
);


-- Supprimer la restriction aux droits d'accès par une autorisation générale sur toutes les tables @todo Solution de contournement à revoir par la suite.
GRANT SELECT ON __preference TO PUBLIC;
GRANT SELECT ON __user TO PUBLIC;
GRANT SELECT ON __person TO PUBLIC;
GRANT SELECT ON __organization TO PUBLIC;
GRANT SELECT ON __place TO PUBLIC;
GRANT SELECT ON __post TO PUBLIC;
GRANT SELECT ON __author TO PUBLIC;
GRANT SELECT ON __media TO PUBLIC;
GRANT SELECT ON __comment TO PUBLIC;
GRANT SELECT ON __keyword TO PUBLIC;
GRANT SELECT ON __product TO PUBLIC;
GRANT SELECT ON __transaction TO PUBLIC;
GRANT SELECT ON __event TO PUBLIC;
GRANT SELECT ON __number_option TO PUBLIC;
GRANT SELECT ON __text_option TO PUBLIC;


-- Donnée de remplissage à des fins de test :
INSERT INTO __user (_id, _person_id, _username, _password, _email, _status, _display_name, _language, _visibility, _community, _site_style, _time_zone, _private_message, _creation, _revision, _last_login)
VALUES
  ('110e8400-e29b-11d4-a716-446655440000', 4, 'admin', 'root', 'admin@gmail.com', NULL, 4, 'fr_FR', true, NULL, NULL, NULL, NULL, '2005-05-07 19:37:25-07', '2017-07-17 07:08:25-07', '2020-05-03 10:10:25-07');


INSERT INTO __person (_id, _user_id, _sexe, _given_name, _additional_name, _family_name, _usual_name, _nickname, _prefix, _suffix, _birth_date, _birth_place_id, _death_date, _death_place_id, _nationality, _place_id, _phone, _phone2, _email, _fax, _url, _occupation, _bias, _hobby, _organization_id, _award, _media_id, _devise, _description)
VALUES
  (1, NULL, '1', 'Henri', 'Sonier', 'de Lubac', NULL, NULL, 'P.', 's.j.', '1896-02-20', NULL, '1991-09-04', NULL, 'FR', 1, '04 46 35 76 89', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'L''Église a pour unique mission de rendre Jésus Christ présent aux hommes.', 'Henri Sonier de Lubac, né à Cambrai le 20 février 1896 et mort à Paris le 4 septembre 1991, est un jésuite, théologien catholique et cardinal français.'),
  (2, NULL, '2', 'Jeanne', NULL, 'd''Arc', NULL, NULL, 'Ste', NULL, '1412-01-01', NULL, '1431-05-30', NULL, 'FR', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Vive labeur !', 'Jeanne d''Arc, née vers 1412 à Domrémy, village du duché de Bar (actuellement dans le département des Vosges en Lorraine), et morte sur le bûcher le 30 mai 1431 à Rouen, capitale du duché de Normandie alors possession du royaume d''Angleterre, est une héroïne de l''histoire de France, chef de guerre et sainte de l''Église catholique, surnommée depuis le XVI<sup>ème</sup> siècle « la Pucelle d''Orléans ».'),
  (3, NULL, '1', 'Charles', 'André Joseph Marie', 'de Gaulle', NULL, NULL, 'Général', NULL, '1890-11-22', NULL, '09-11-1970', NULL, 'FR', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'France libre !', 'Charles de Gaulle, communément appelé le général de Gaulle ou parfois simplement le Général, né le 22 novembre 1890 à Lille et mort le 9 novembre 1970 à Colombey-les-Deux-Églises, est un militaire, résistant, homme d''État et écrivain français.'),
  (4, NULL, NULL, NULL, NULL, NULL, NULL, NULL,'El Comandante', NULL, NULL, NULL, NULL, NULL, 'FR', NULL, '01 44 55 66 77', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Personne anonyme pour test.', NULL);


INSERT INTO __place (_id, _name, _street, _postal_code, _locality, _region, _country, _location, _elevation, _type)
VALUES
  (1, 'Cathédrale Notre-Dame de Paris', '6 Parvis Notre-Dame - Pl. Jean-Paul II', '75004', 'Paris', 'Île-de-France', 'France', POINT(2.349747, 48.853133), 210, NULL),
  (2, 'Basilique du Sacré-Cœur de Montmartre', '35 Rue du Chevalier de la Barre', '75018', 'Paris', 'Île-de-France', 'France', POINT(2.343076, 48.886719), NULL, NULL),
  (3, 'Primatiale Saint-Jean de Lyon', 'Place Saint-Jean', '69005', 'Lyon', 'Rhône', 'France', POINT(4.827409, 45.760792), NULL, NULL),
  (4, 'Basilique Notre-Dame de Fourvière', '8 Place de Fourvière', '69005', 'Lyon', 'Rhône', 'France', POINT(4.822550, 45.762300), 287, NULL),
  (5, 'Carmel de Montmartre', '34 Rue du Chevalier de la Barre', '75018', 'Paris', 'Île-de-France', 'France', NULL, NULL, NULL),
  (6, 'Chapelle Notre-Dame de la Médaille Miraculeuse', '140 Rue du Bac', '75007', 'Paris', 'Île-de-France', 'France', POINT(2.323305, 48.851043), NULL, NULL),
  (7, 'Collège des Bernardins', NULL, NULL, 'Paris', 'Île-de-France', 'France', POINT(2.351987, 48.848775), NULL, NULL),
  (8, 'École Cathédrale', NULL, NULL, 'Paris', 'Île-de-France', 'France', POINT(2.350691, 48.853372), NULL, NULL),
  (9, 'Bibliothèque du Saulchoir', NULL, NULL, 'Paris', 'Île-de-France', 'France', POINT(2.344720, 48.832783), NULL, NULL),
  (10, 'Basilique Notre-Dame-de-la-Garde', 'Rue Fort du Sanctuaire', '13281', 'Marseille', 'Bouches-du-Rhône', 'France', POINT(5.371195, 43.284002), NULL, NULL);


INSERT INTO __post (_id, _name, _content, _creation, _revision, _description, _author_id, _status)
VALUES
  (1, 'La légende dorée', 'La Légende dorée (<em>Legenda aurea</em> en latin) est un ouvrage rédigé en latin entre 1261 et 1266 par Jacques de Voragine, dominicain et archevêque de Gênes, qui raconte la vie d''environ 150 saints ou groupes de saints, saintes et martyrs chrétiens, et, suivant les dates de l''année liturgique, certains événements de la vie du Christ et de la Vierge Marie.', '2020-04-16 19:10:25-07', '2020-04-16 20:15:22-01', 'La Légende dorée fut l''ouvrage le plus lu et le plus diffusé au Moyen Âge, juste après la Bible. Cette « légende des saints » (son titre originel) constitue en fait une encyclopédie de la vie chrétienne.', 2, 1);


\c postgres;
