-- ------------------------------------------------------------------------------
-- @name        Logical Data Model
-- @description Modèle logique des données pour une base sous PostgreSQL
-- @note        Sémantique des tables et colonnes principalement inspirée de schema.org
-- @note        Les underscores évitent d'utiliser un mot réservé par PostgreSQL
-- ------------------------------------------------------------------------------

-- Appeler le fichier via le client psql de la manière suivante :
-- \i /../database/logicalDataModel.pgsql

DROP DATABASE IF EXISTS scriptura_db; -- suppression de la base de données avant l'utilisateur
DROP USER IF EXISTS scriptura_user; -- l'utilisateur ne peut pas être supprimé si des objets dépendent de lui
CREATE USER scriptura_user WITH ENCRYPTED PASSWORD 'root';
CREATE DATABASE scriptura_db OWNER scriptura_user;

\c scriptura_db
\conninfo

CREATE TABLE __preference (
  _id                 SMALLSERIAL       NOT NULL,
  _name               VARCHAR(64)       NOT NULL,                  -- nom du site
  _url                VARCHAR(255)      NOT NULL,                  -- url du site
  _creation           TIMESTAMP         DEFAULT CURRENT_TIMESTAMP, -- date de création du site
  _manager_id         BIGINT            NULL,                      -- id du responsable éditorial (_persons)
  _analytics          VARCHAR(16)       NULL,                      -- compte google analytics
  _style              SMALLINT          NULL,                      -- choix du style css
  _logo_id            BIGINT            NULL,                      -- logo du site (id _medias)
  _favicon            VARCHAR(255)      NULL,                      -- url de la favicon
  _background         VARCHAR(255)      NULL,                      -- url de l'image de fond
  _default_thumbnail  VARCHAR(255)      NULL,                      -- url de la miniature par défaut
  _snowstorm          BOOLEAN           NULL,                      -- effet tempête de neige sur le site
  CONSTRAINT __preference_pkey PRIMARY KEY (_id)
);

CREATE TABLE __account ( -- __user
  _id                 UUID              DEFAULT gen_random_uuid(), -- si UUID généré par PostgreSQL
  -- _id                 UUID              NOT NULL,                  -- si UUID généré par l'application cliente
  _person_id          BIGINT            NULL,                      -- référence éventuelle à __person
  _username           VARCHAR(32)       NOT NULL,                  -- nom utilisateur ; "username" est le terme technique consacré, et non pas "user name"
  _password           CHAR(40)          NOT NULL,                  -- mot de passe crypté en SHA1
  _email              VARCHAR(128)      NULL,                      -- facultatif car comptes sans email pour mineurs
  _role               SMALLINT          NULL,                      -- rôles : 1 = administrateur, 2 = modérateur/webmestre, 3 = contributeur/rédacteur, 4 = abonné/utilisateur authentifié, 5 = visiteur anonyme
  _status             SMALLINT          NULL,                      -- ex : compte actif, bannis
  _display_name       SMALLINT          NULL,                      -- nom public choisi dans la table __person
  _language           VARCHAR(5)        NULL,                      -- choix de la langue (format code langue : ISO639-1 alpha-2 + ISO3166-1 alpha-2 ; ex : fr_FR)
  _visibility         BOOLEAN           NULL,                      -- visibilité en ligne (pour un forum)
  _community          VARCHAR(40)       NULL,                      -- appartenance à une communauté, groupe ou cercle
  _site_style         BOOLEAN           NULL,                      -- option de préférence graphique pour le site__contributorpe/Paris)
  _time_zone          TIMESTAMP         NULL,                      -- selon préférence utilisateur
  _private_message    BOOLEAN           NULL,                      -- autoriser les messages privés
  _creation           TIMESTAMP         DEFAULT CURRENT_TIMESTAMP, -- date de création du profil
  _revision           TIMESTAMP         NULL,                      -- date de révision du profil
  _last_login         TIMESTAMP         NULL,                      -- dernière connection
  CONSTRAINT __account_pkey PRIMARY KEY (_id)
  -- CONSTRAINT __person_account_id_fkey FOREIGN KEY (_person_id) REFERENCES __person(_id)
);

CREATE TABLE __person (
  _id                 BIGSERIAL         NOT NULL,                  -- UUID ?
  _sexe               CHAR(1)           NULL,                      -- selon la norme ISO/IEC 5218 ; inconnu : 0, homme : 1, femme : 2, non applicable : 9
  _given_name         VARCHAR(32)       NULL,                      -- prénom
  _additional_name    VARCHAR(32)       NULL,                      -- deuxième prénom
  _family_name        VARCHAR(32)       NULL,                      -- nom de famille
  _usual_name         VARCHAR(32)       NULL,                      -- nom d'usage, nom d'épouse
  _nickname           VARCHAR(32)       NULL,                      -- surnom
  _prefix             VARCHAR(32)       NULL,                      -- titres et civilité
  _suffix             VARCHAR(32)       NULL,                      -- abréviation typographique postname (ex : s.j., o.p.)
  _birth_date         DATE              NULL,                      -- date de naissance
  _birth_place_id     BIGINT            NULL,                      -- lieu de naissance (id de _places)
  _death_date         DATE              NULL,                      -- date du décès
  _death_place_id     BIGINT            NULL,                      -- lieu du décès (id de _places)
  _nationality        VARCHAR(2)        NULL,                      -- nationnalité, ISO 3166-1 alpha-2
  _place_id           BIGINT            NULL,                      -- addresse (id de _places)
  _phone              VARCHAR(32)       NULL,                      -- numéro de téléphone
  _phone2             VARCHAR(32)       NULL,                      -- numéro de téléphone alternatif
  _email              VARCHAR(128)      NULL,                      -- peut être différent du email de la table _users
  _fax                VARCHAR(32)       NULL,                      -- numéro de fax
  _url                VARCHAR(255)      NULL,                      -- url représentant l'utilisateur (Linkedin, son site web...) ; limitation la longeur : une url non optimisée n'a pas de sens de nos jours
  _occupation         VARCHAR(30)       NULL,                      -- métier, profession
  _bias               VARCHAR(30)       NULL,                      -- tendance, inclinaison, alignement
  _hobby              VARCHAR(64)       NULL,                      -- centre d'intéret, passe-temps
  _organization_id    BIGINT            NULL,                      -- organisation d'appartenance (id de _organizations)
  _award              VARCHAR(128)      NULL,                      -- prix, distinction
  _media_id           VARCHAR(255)      NULL,                      -- url de l'avatar (en plus d'un gravatar sur le mail)
  _devise             VARCHAR(100)      NULL,                      -- 100 caractères max
  _description        TEXT              NULL,                      -- 800 caractères max
  CONSTRAINT __person_pkey PRIMARY KEY (_id)
);

-- CREATE TABLE __group ? (groupe utilisateurs, famille...)

CREATE TABLE __organization (
  _id                 BIGSERIAL         NOT NULL,
  _name               VARCHAR(64)       NOT NULL,                  -- nom de l'organisation
  _type               VARCHAR(30)       NULL,                      -- entreprise, association, organisme publique
  _purpose            VARCHAR(30)       NULL,                      -- but de l'organisation
  _duns               SMALLINT          NULL,                      -- numéro international D-U-N-S®
  _siret              SMALLINT          NULL,                      -- pour l'Europe (le numéro TVA est référé au SIRET)
  _brand              VARCHAR(255)      NULL,                      -- marques associées
  _place_id           BIGINT            NULL,                      -- addresse
  _email              VARCHAR(128)      NULL,                      -- mail de contact
  _phone              VARCHAR(30)       NULL,                      -- numéro de téléphone
  _phone_2            VARCHAR(30)       NULL,                      -- numéro de téléphone alternatif
  _fax                VARCHAR(30)       NULL,                      -- numéro de fax
  _url                VARCHAR(255)      NULL,                      -- url représentant l'organisation
  _media_id           BIGINT            NULL,                      -- id du logo
  _person_id          VARCHAR(255)      NULL,                      -- id de personnes membre
  _parent_id          BIGINT            NULL,                      -- id d'une organisation mère le cas échéant
  _lft                BIGINT            NULL,                      -- représentation intervalaire valeur de gauche
  _rgt                BIGINT            NULL,                      -- représentation intervalaire valeur de droite
  CONSTRAINT __organization_pkey PRIMARY KEY (_id)
);

CREATE TABLE __place (
  _id                 BIGSERIAL         NOT NULL,
  _name               VARCHAR(60)       NULL,                      -- nom pour un marker ; ne pas rendre cette donnée obligatoire (_place peut référencer un simple point de coordonnées GPS)
  _street             VARCHAR(60)       NULL,                      -- adresse
  _postal_code        VARCHAR(16)       NULL,                      -- code postal, internationaux compris
  _locality           VARCHAR(64)       NULL,                      -- localité
  _region             VARCHAR(64)       NULL,                      -- département français, cantons suisses...
  _country            VARCHAR(64)       NULL,                      -- pays
  _location           POINT             NULL,                      -- coordonnées GPS, par convention les bases de donnée utilisent (longitude, latitude) sous forme x,y et non (latitude, longitude) comme traditionnellement en cartographie, le respect de cette norme facilite les calculs sur la base @see https://postgis.net/2013/08/18/tip_lon_lat/ @note type REAL peu précis mais utilisé par OpenStreetMap sous l'alias FLOAT8, utilise aussi INT4
  _elevation          SMALLINT          NULL,                      -- altitude en mètre
  _type               VARCHAR(30)       NULL,                      -- Restaurant, bar...
  _description        VARCHAR           NULL,                      -- Informations sur l'adresse
  CONSTRAINT __place_pkey PRIMARY KEY (_id)
);

CREATE TABLE __post (
  _id                 BIGSERIAL         NOT NULL,
  _name               VARCHAR(255)      NOT NULL,                  -- titre
  _content            TEXT              NULL,                      -- contenu
  _creation           TIMESTAMP         DEFAULT CURRENT_TIMESTAMP, -- date de création -- DEFAULT CURRENT_DATE
  _revision           TIMESTAMP         NULL,                      -- date de révision
  _type               VARCHAR(255)      NULL,                      -- article, page, etc...
  _slug               VARCHAR(255)      NULL,                      -- slug propre à l'article, différent de l'url canonique, celle-ci étant reconstituée à partir le l'index par exemple
  _description        VARCHAR           NULL,                      -- contenu utilisé pour la balise meta description
  _author_id          BIGINT            NOT NULL,                  -- créateur du post (contributeur principal)
  _status             SMALLINT          NOT NULL,                  -- publié, brouillon, refusé, poubelle
  _comments_status    BOOLEAN           NULL,                      -- commentaires activés ou non
  _keywords           VARCHAR(255)      NULL,                      -- mots-clefs pour le post
  _medias             VARCHAR(255)      NULL,                      -- medias en lien avec le post
  CONSTRAINT __post_pkey PRIMARY KEY (_id),
  CONSTRAINT __author_id__person_fkey FOREIGN KEY (_author_id) REFERENCES __person(_id)
);

CREATE TABLE __media (
  _id                 BIGSERIAL         NOT NULL,
  _name               VARCHAR(255)      NULL,                      -- titre du media
  _creation           TIMESTAMP         DEFAULT CURRENT_TIMESTAMP, -- date de création
  _revision           TIMESTAMP         NULL,                      -- date de révision
  _type               VARCHAR(255)      NULL,                      -- .jpg, .ico, .svg, .mp3, .mp4
  _url                VARCHAR(255)      NULL,                      -- url du fichier
  _author_id          BIGINT            NOT NULL,                  -- auteur de l'upload
  _posts_id           BIGINT            NULL,                      -- posts en lien (id de _posts)
  _description        VARCHAR(255)      NULL,
  CONSTRAINT __media_pkey PRIMARY KEY (_id)
);

CREATE TABLE __comment (
  _id                 BIGSERIAL         NOT NULL,
  _name               VARCHAR(255)      NULL,                      -- titre du commentaire
  _creation           TIMESTAMP         DEFAULT CURRENT_TIMESTAMP, -- date de création -- DEFAULT CURRENT_DATE
  _revision           TIMESTAMP         NULL,                      -- date de révision
  -- _author             SMALLINT          NOT NULL,
  _post_id            SMALLINT          NOT NULL,                  -- post concerné
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
  _name               VARCHAR(64)       NOT NULL,                  -- nom du mot clef
  _slug               VARCHAR(255)      NOT NULL,
  _parent_id          BIGINT            NULL,                      -- id du mot clef parent dans la hierarchie
  _lft                BIGINT            NULL,                      -- représentation intervalaire valeur de gauche
  _rgt                BIGINT            NULL,                      -- représentation intervalaire valeur de droite
  -- _value              BIGINT            NOT NULL,                  -- nombre d'items concernés par le tag
  CONSTRAINT __keyword_pkey PRIMARY KEY (_id)
);

CREATE TABLE __product (
  _id                 BIGSERIAL         NOT NULL,
  _name               VARCHAR(64)       NOT NULL,                  -- nom du produit
  _price              SMALLINT          NULL,                      -- prix du produit
  _iso                VARCHAR(255)      NULL,                      -- Numéro IBSN ou Code-barres EAN
  _description        TEXT              NULL,                      -- description du produit
  _keywords           VARCHAR(255)      NULL,                      -- mots clefs pour le produit
  _medias             BIGINT            NULL,                      -- medias en lien avec le produit
  CONSTRAINT __product_pkey PRIMARY KEY (_id)
);

CREATE TABLE __transaction (
  _id                 BIGSERIAL         NOT NULL,
  _name               BIGINT            NOT NULL,                  -- numéro de la transaction (différent de l'id)
  _client_id          BIGINT            NOT NULL,                  -- client (id de _users)
  _organization_id    BIGINT            NOT NULL,                  -- organisation marchande pour le produit (id de _organizations)
  _list               VARCHAR(255)      NULL,                      -- liste de l'id des produits (NULL si en cours de commande)
  _creation           TIMESTAMP         DEFAULT CURRENT_TIMESTAMP, -- date de la transaction
  _revision           TIMESTAMP         NULL,                      -- date de révision de la transaction
  _purchase           TIMESTAMP         NULL,                      -- date de validation de la transaction
  _billing            BIGINT            NULL,                      -- id de l'adresse de facturation
  _description        TEXT              NULL,                      -- description de la transaction
  CONSTRAINT __transaction_pkey PRIMARY KEY (_id)
);

CREATE TABLE __event (
  _id                 BIGSERIAL         NOT NULL,
  _name               VARCHAR(64)       NOT NULL,                  -- nom de l'événement
  _begin              TIMESTAMP         NOT NULL,                  -- début de l'événement
  _end                TIMESTAMP         NULL,                      -- fin de l'événement
  _description        TEXT              NULL,                      -- description de l'événement
  _creation           TIMESTAMP         DEFAULT CURRENT_TIMESTAMP, -- date de création de l'événement
  _revision           TIMESTAMP         NULL,                      -- date de révision de l'événement
  CONSTRAINT __event_pkey PRIMARY KEY (_id)
);

CREATE TABLE __number_option (
  _id                 BIGSERIAL         NOT NULL,
  _name               VARCHAR(64)       NOT NULL,                  -- nom de l'option
  _value              INT               NULL,                      -- valeur
  CONSTRAINT __number_option_pkey PRIMARY KEY (_id)
);

CREATE TABLE __text_option (
  _id                 BIGSERIAL         NOT NULL,
  _name               VARCHAR(64)       NOT NULL,                  -- nom de l'option
  _value              TEXT              NULL,                      -- valeur
  CONSTRAINT __text_option_pkey PRIMARY KEY (_id)
);

-- Supprimer la restriction aux droits d'accès par une autorisation générale sur toutes les tables :
GRANT SELECT ON ALL TABLES IN SCHEMA public TO scriptura_user;

-- Suppression des données d'une table, exemple :
-- TRUNCATE TABLE __post;

-- Données de remplissage à des fins de test :
INSERT INTO __account (_id, _person_id, _username, _password, _email, _role, _status, _display_name, _language, _visibility, _community, _site_style, _time_zone, _private_message, _creation, _revision, _last_login)
VALUES
  ('110e8400-e29b-11d4-a716-446655440000', 4, 'admin', 'root', 'admin@gmail.com', 1, 1, NULL, 'fr_FR', true, NULL, NULL, NULL, NULL, '2005-05-07 19:37:25-07', '2017-07-17 07:08:25-07', '2020-05-03 10:10:25-07');

INSERT INTO __person (_id, _sexe, _given_name, _additional_name, _family_name, _usual_name, _nickname, _prefix, _suffix, _birth_date, _birth_place_id, _death_date, _death_place_id, _nationality, _place_id, _phone, _phone2, _email, _fax, _url, _occupation, _bias, _hobby, _organization_id, _award, _media_id, _devise, _description)
VALUES
  (1, '1', 'Henri', 'Sonier', 'de Lubac', NULL, NULL, 'P.', 's.j.', '1896-02-20', NULL, '1991-09-04', NULL, 'FR', 1, '04 46 35 76 89', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'L''Église a pour unique mission de rendre Jésus Christ présent aux hommes.', 'Henri Sonier de Lubac, né à Cambrai le 20 février 1896 et mort à Paris le 4 septembre 1991, est un jésuite, théologien catholique et cardinal français.'),
  (2, '2', 'Jeanne', NULL, 'd''Arc', NULL, NULL, 'Ste', NULL, '1412-01-01', NULL, '1431-05-30', NULL, 'FR', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Vive labeur !', 'Jeanne d''Arc, née vers 1412 à Domrémy, village du duché de Bar (actuellement dans le département des Vosges en Lorraine), et morte sur le bûcher le 30 mai 1431 à Rouen, capitale du duché de Normandie alors possession du royaume d''Angleterre, est une héroïne de l''histoire de France, chef de guerre et sainte de l''Église catholique, surnommée depuis le XVI<sup>ème</sup> siècle « la Pucelle d''Orléans ».'),
  (3, '1', 'Charles', 'André Joseph Marie', 'de Gaulle', NULL, NULL, 'Général', NULL, '1890-11-22', 11, '1970-11-09', 12, 'FR', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'France libre !', 'Charles de Gaulle, communément appelé le général de Gaulle ou parfois simplement le Général, né le 22 novembre 1890 à Lille et mort le 9 novembre 1970 à Colombey-les-Deux-Églises, est un militaire, résistant, homme d''État et écrivain français.'),
  (4, NULL, NULL, NULL, NULL, NULL, NULL,'El Comandante', NULL, NULL, NULL, NULL, NULL, 'FR', NULL, '01 44 55 66 77', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Personne anonyme pour test.', NULL);

INSERT INTO __place (_id, _name, _street, _postal_code, _locality, _region, _country, _location, _elevation, _type, _description)
VALUES
  (1, 'Cathédrale Notre-Dame de Paris', '6 Parvis Notre-Dame - Pl. Jean-Paul II', '75004', 'Paris', 'Île-de-France', 'France', POINT(2.349747, 48.853133), 210, NULL, NULL),
  (2, 'Basilique du Sacré-Cœur de Montmartre', '35 Rue du Chevalier de la Barre', '75018', 'Paris', 'Île-de-France', 'France', POINT(2.343076, 48.886719), NULL, NULL, NULL),
  (3, 'Primatiale Saint-Jean de Lyon', 'Place Saint-Jean', '69005', 'Lyon', 'Rhône', 'France', POINT(4.827409, 45.760792), NULL, NULL, NULL),
  (4, 'Basilique Notre-Dame de Fourvière', '8 Place de Fourvière', '69005', 'Lyon', 'Rhône', 'France', POINT(4.822550, 45.762300), 287, NULL, NULL),
  (5, 'Carmel de Montmartre', '34 Rue du Chevalier de la Barre', '75018', 'Paris', 'Île-de-France', 'France', NULL, NULL, NULL, NULL),
  (6, 'Chapelle Notre-Dame de la Médaille Miraculeuse', '140 Rue du Bac', '75007', 'Paris', 'Île-de-France', 'France', POINT(2.323305, 48.851043), NULL, NULL, NULL),
  (7, 'Collège des Bernardins', NULL, NULL, 'Paris', 'Île-de-France', 'France', POINT(2.351987, 48.848775), NULL, NULL, NULL),
  (8, 'École Cathédrale', NULL, NULL, 'Paris', 'Île-de-France', 'France', POINT(2.350691, 48.853372), NULL, NULL, NULL),
  (9, 'Bibliothèque du Saulchoir', NULL, NULL, 'Paris', 'Île-de-France', 'France', POINT(2.344720, 48.832783), NULL, NULL, NULL),
  (10, 'Basilique Notre-Dame-de-la-Garde', 'Rue Fort du Sanctuaire', '13281', 'Marseille', 'Bouches-du-Rhône', 'France', POINT(5.371195, 43.284002), NULL, NULL, NULL),
  (11, 'Lille', NULL, '59000', 'Lille', 'Nord', 'France', POINT(2.6999022, 50.7630348), 20, NULL, NULL),
  (12, 'Colombey-les-Deux-Églises', NULL, '52330', 'Colombey-les-Deux-Églises', 'Haute-Marne', 'France', POINT(3.782467, 48.1927731), 239, NULL, NULL);

INSERT INTO __post (_id, _name, _content, _creation, _revision, _description, _author_id, _status)
VALUES
  (1, 'La légende dorée', '<p>La Légende dorée (<em>Legenda aurea</em> en latin) est un ouvrage rédigé en latin entre 1261 et 1266 par Jacques de Voragine, dominicain et archevêque de Gênes, qui raconte la vie d''environ 150 saints ou groupes de saints, saintes et martyrs chrétiens, et, suivant les dates de l''année liturgique, certains événements de la vie du Christ et de la Vierge Marie.</p><div class="grid2 gap media-s-grid1"><p lang="grc"><span class="verse">1</span> Ὃ ἦν ἀπ᾽ ἀρχῆς, ὃ ἀκηκόαμεν, ὃ ἑωράκαμεν τοῖς ὀφθαλμοῖς ἡμῶν, ὃ ἐθεασάμεθα καὶ αἱ χεῖρες ἡμῶν ἐψηλάφησαν περὶ τοῦ λόγου τῆς ζωῆς – <span class="verse">2</span> καὶ ἡ ζωὴ ἐφανερώθη, καὶ ἑωράκαμεν καὶ μαρτυροῦμεν καὶ ἀπαγγέλλομεν ὑμῖν τὴν ζωὴν τὴν αἰώνιον ἥτις ἦν πρὸς τὸν πατέρα καὶ ἐφανερώθη ἡμῖν – <span class="verse">3</span> ὃ ἑωράκαμεν καὶ ἀκηκόαμεν, ἀπαγγέλλομεν καὶ ὑμῖν, ἵνα καὶ ὑμεῖς κοινωνίαν ἔχητε μεθ᾽ ἡμῶν. καὶ ἡ κοινωνία δὲ ἡ ἡμετέρα μετὰ τοῦ πατρὸς καὶ μετὰ τοῦ υἱοῦ αὐτοῦ Ἰησοῦ Χριστοῦ. <span class="verse">4</span> καὶ ταῦτα γράφομεν ἡμεῖς, ἵνα ἡ χαρὰ ἡμῶν ᾖ πεπληρωμένη. <span class="verse">5</span> Καὶ ἔστιν αὕτη ἡ ἀγγελία ἣν ἀκηκόαμεν ἀπ᾽ αὐτοῦ καὶ ἀναγγέλλομεν ὑμῖν, ὅτι ὁ θεὸς φῶς ἐστιν καὶ σκοτία ἐν αὐτῷ οὐκ ἔστιν οὐδεμία.</p><p><span class="verse">1</span> Ce qui était dès le commencement, ce que nous avons entendu, ce que nous avons vu de nos yeux, ce que nous avons contemplé et (que) nos mains ont palpé du Logos de vie - <span class="verse">2</span> et la vie a été manifestée, et nous avons vu, et nous témoignons et nous vous annonçons la vie éternelle qui était auprès du Père et nous fut manifestée - <span class="verse">3</span> ce que nous avons vu et entendu, nous vous l''annonçons à vous aussi, afin que vous aussi soyez en communion avec nous. Et notre communion à nous (est) avec le Père et avec son Fils Jésus Christ. <span class="verse">4</span> Et cela nous l''écrivons, nous, afin que notre joie soit en plénitude. <span class="verse">5</span> Et tel est le message que nous avons entendu de lui et (que) nous vous annonçons : Dieu est lumière et de ténèbres en lui il n''en est aucune.</p></div><p>Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar (note 1 : <a href="#n1" id="r1">#1</a>). Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur aliquet pellentesque diam. Integer quis metus vitae elit lobortis egestas (note 2 : <a href="#n2" id="r2">#2</a>). Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi vel erat non mauris convallis vehicula. Nulla et sapien. Integer tortor tellus, aliquam faucibus, convallis id, congue eu, quam. Mauris ullamcorper felis vitae erat. Proin feugiat, augue non elementum posuere, metus purus iaculis lectus, et tristique ligula justo vitae magna (note 3 : <a href="#n3" id="r3">#3</a>).</p><figure class="figure-focus-thumbnail"><picture><source media="(min-width: 2000px)" srcset="/medias/images/demo/OldMechanism.jpg, /medias/images/demo/OldMechanism.jpg 2x" sizes="100vw"><source media="(min-width: 1500px)" srcset="/medias/images/demo/OldMechanism2000.jpg, /medias/images/demo/OldMechanism.jpg 2x" sizes="100vw"><source media="(min-width: 1000px)" srcset="/medias/images/demo/OldMechanism1500.jpg, /medias/images/demo/OldMechanism2000.jpg 2x" sizes="100vw"><source media="(min-width: 800px)" srcset="/medias/images/demo/OldMechanism1000.jpg, /medias/images/demo/OldMechanism2000.jpg 2x" sizes="100vw"><source media="(min-width: 600px)" srcset="/medias/images/demo/OldMechanism800.jpg, /medias/images/demo/OldMechanism1500.jpg 2x" sizes="100vw"><source media="(min-width: 400px)" srcset="/medias/images/demo/OldMechanism600.jpg, /medias/images/demo/OldMechanism1000.jpg 2x" sizes="100vw"><source media="(min-width: 300px)" srcset="/medias/images/demo/OldMechanism400.jpg, /medias/images/demo/OldMechanism800.jpg 2x" sizes="100vw"><source srcset="/medias/images/demo/OldMechanism300.jpg" sizes="100vw"><img src="/medias/images/demo/OldMechanism.jpg" loading="lazy" alt="Old Mechanism"></picture></figure><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.</p><p>Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur aliquet pellentesque diam. Integer quis metus vitae elit lobortis egestas. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi vel erat non mauris convallis vehicula. Nulla et sapien. Integer tortor tellus, aliquam faucibus, convallis id, congue eu, quam. Mauris ullamcorper felis vitae erat. Proin feugiat, augue non elementum posuere, metus purus iaculis lectus, et tristique ligula justo vitae magna.</p><p>Aliquam convallis sollicitudin purus. Praesent aliquam, enim at fermentum mollis, ligula massa adipiscing nisl, ac euismod nibh nisl eu lectus. Fusce vulputate sem at sapien. Vivamus leo. Aliquam euismod libero eu enim. Nulla nec felis sed leo placerat imperdiet. Aenean suscipit nulla in justo. Suspendisse cursus rutrum augue. Nulla tincidunt tincidunt mi. Curabitur iaculis, lorem vel rhoncus faucibus, felis magna fermentum augue, et ultricies lacus lorem varius purus. Curabitur eu amet.</p><hr><div class="footnotes"><p><a href="#r1" id="n1">#1</a> Première note. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.</p><p><a href="#r2" id="n2">#2</a> Deuxième note. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula.</p><p><a href="#r3" id="n3">#3</a> Troisième note. Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis.</p></div>', '2020-04-16 19:10:25-07', '2020-04-16 20:15:22-01', 'La Légende dorée fut l''ouvrage le plus lu et le plus diffusé au Moyen Âge, juste après la Bible. Cette « légende des saints » (son titre originel) constitue en fait une encyclopédie de la vie chrétienne.', 1, 1),
  (2, 'Le péché contre l’Esprit Saint <span>.&nbsp;Jean-Paul II</span>', '<p>Pourquoi le blasphème contre l&rsquo;Esprit Saint est-il impardonnable&nbsp;? En quel sens entendre ce blasphème&nbsp;? Saint Thomas d&rsquo;Aquin répond qu&rsquo;il s&rsquo;agit d&rsquo;un péché « irrémissible de par sa nature, parce qu&rsquo;il exclut les éléments grâce auxquels est accordée la rémission des péchés » <a href="#n1" id="r1">#1</a>.</p><p>Selon une telle exégèse, le « blasphème » ne consiste pas à proprement parler à offenser en paroles l&rsquo;Esprit Saint&nbsp;; mais il consiste à refuser de recevoir le salut que Dieu offre à l&rsquo;homme par l&rsquo;Esprit Saint agissant en vertu du sacrifice de la Croix. Si l&rsquo;homme refuse la « manifestation du péché », qui vient de l&rsquo;Esprit Saint et qui a un caractère salvifique, il refuse en même temps la « venue » du Paraclet, cette « venue » qui s&rsquo;est effectuée dans le mystère de Pâques, en union avec la puissance rédemptrice du Sang du Christ, le Sang qui « purifie la conscience des œuvres mortes ».</p><p>Nous savons que le fruit d&rsquo;une telle purification est la rémission des péchés. En conséquence, celui qui refuse l&rsquo;Esprit et le Sang demeure dans les « œuvres mortes », dans le péché. Et le blasphème contre l&rsquo;Esprit Saint consiste précisément dans le refus radical de cette rémission dont Il est le dispensateur intime et qui présuppose la conversion véritable qu&rsquo;il opère dans la conscience. Si Jésus dit que le péché contre l&rsquo;Esprit Saint ne peut être remis ni en ce monde ni dans l&rsquo;autre, c&rsquo;est parce que cette « non-rémission » est liée, comme à sa cause, à la « non-pénitence », c&rsquo;est-à-dire au refus radical de se convertir. Cela signifie le refus de se tourner vers les sources de la Rédemption, qui restent cependant « toujours » ouvertes dans l&rsquo;économie du salut, dans laquelle s&rsquo;accomplit la mission de l&rsquo;Esprit Saint. Celui-ci a le pouvoir infini de puiser à ces sources&nbsp;: « C&rsquo;est de mon bien qu&rsquo;il reçoit », a dit Jésus. Il complète ainsi dans les âmes humaines l&rsquo;œuvre de la Rédemption accomplie par le Christ, en leur partageant ses fruits. Or le blasphème contre l&rsquo;Esprit Saint est le péché commis par l&rsquo;homme qui présume et revendique le « droit » de persévérer dans le mal &#8211; dans le péché quel qu&rsquo;il soit &#8211; et refuse par là même la Rédemption. L&rsquo;homme reste enfermé dans le péché, rendant donc impossible, pour sa part, sa conversion et aussi, par conséquent, la rémission des péchés, qu&rsquo;il ne juge pas essentielle ni importante pour sa vie. Il y a là une situation de ruine spirituelle, car le blasphème contre l&rsquo;Esprit Saint ne permet pas à l&rsquo;homme de sortir de la prison où il s&rsquo;est lui-même enfermé et de s&rsquo;ouvrir aux sources divines de la purification des consciences et de la rémission des péchés.</p><hr><div class="footnotes"><p><a href="#r1" id="n1">#1</a> S. <a href="//testimonia.fr/thomas-aquinas/">Thomas d&rsquo;Aquin</a>, <em>Somme théologique</em>, IIa-IIae-, q. 14, a. 3&nbsp;; cf. S. <a href="//testimonia.fr/augustin-d-hippone/" title="Augustin d''Hippone">Augustin</a>, <em>Epist.</em> 185, 11, 48-49&nbsp;: PL 33, 814-815&nbsp;; S. <a href="//testimonia.fr/bonaventure-de-bagnoregio/" title="Bonaventure de Bagnoregio">Bonaventure</a>, <em>Comment. in Évang. S. Lucae</em>, chap. XIV, 15-16&nbsp;: Ad Claras Aquas, VII, 314-315.</p></div>', '2022-04-16 19:10:25-07', '2022-04-16 20:15:22-01', 'Encyclique Dominum et vivificantem, Sur l’Esprit Saint dans la vie de l’Église et du monde, § 46, 1986', 2, 1),
  (3, 'Ô prends mon âme', '<p>Ô prends mon âme, prends-la, Seigneur,<br>Et que ta flamme brûle en mon cœur.<br>Que tout mon être vibre pour toi,<br>Sois seul mon maître, ô divin Roi.</p><p><strong>R/ Source de vie, de paix, d’amour.<br>Vers toi je crie la nuit, le jour.<br>Guide mon âme, sois mon soutien.<br>Remplis ma vie, toi mon seul bien.</strong></p><p>Du mal perfide, ô garde-moi,<br>Sois seul mon guide, chef de ma foi,<br>Quand la nuit voile tout à mes yeux,<br>Sois mon étoile, brille des cieux.</p><p>Voici l’aurore d’un jour nouveau,<br>Le ciel se dore de feux plus beaux,<br>Jésus s’apprête, pourquoi gémir,<br>Levons nos têtes, il va venir.</p>', '2022-04-16 19:10:25-07', '2022-04-16 20:15:22-01', '<em>Oh ! prends mon âme</em>, aussi intitulé <em>Ô prends mon âme</em>, est un cantique chrétien du milieu du xx<sup>ème</sup> siècle, aux paroles écrites par le compositeur protestant évangélique français1 Hector Arnéra (1890-19722), sur l''air de Hatikvah, hymne sioniste composé par Samuel Cohen3, devenu par la suite hymne national israélien.', 2, 1),
  (4, 'Si quelqu’un a soif qu’il vienne à moi et qu’il boive <span>.&nbsp;Maître Eckhart</span>', '<blockquote><p>Si quelqu''un a soif qu’il vienne à moi et qu’il boive. </p><footer><em>Évangile selon saint Jean</em> 7, 37</footer></blockquote><p>C''est au milieu des choses que l''homme doit saisir Dieu et habituer son cœur à le posséder en tout temps comme quelqu''un de présent, dans le sentiment, dans l''esprit et dans la volonté&#8230;</p><p>Sur quoi repose donc une telle vraie possession de Dieu ? Elle repose sur le sentiment du cœur et sur une disposition d''esprit intérieure raisonnable, une orientation de la volonté vers Dieu. Non sur une idée fixe permanente de Dieu ! Ce serait d''ailleurs humainement impossible d''exécuter une pareille résolution, ou du moins extrêmement difficile, et en tout cas ce ne serait pas le meilleur. L''homme ne doit pas se donner pour satisfait avec une idée de Dieu &#8211; quand l''idée disparaît, le Dieu disparaît aussi. Mais on doit avoir un Dieu <em>réel</em>, qui est élevé au-dessus de la pensée de l''homme et de tout le créé. Ce Dieu ne disparaît pas, à moins qu''on ne s''en détourne volontairement.</p><p>Qui a ainsi Dieu essentiellement, celui-là seul prend Dieu divinement et Dieu rayonne devant lui à travers toutes choses : toutes lui donnent le goût de Dieu, dans toutes Dieu se reflète en lui, Dieu lui-même a en tout temps un regard en lui. Il est détaché de tout liens et son imagination est orientée à l''intérieur, vers l''objet de son amour, vers Dieu. &#8211; Comme quand quelqu''un a une soif ardente, une grande soif. Il fait sans doute autre chose que de boire, il peut aussi penser à d''autres choses. Mais quoi qu''il fasse, où qu''il soit et dans quelque dessein que ce soit, l''image de la chose à boire ne le quitte pas, aussi longtemps que sa soif dure. Et plus sa soif est grande, plus intérieure, présente et continuelle devient l''image de la chose à boire.</p>', '2022-04-16 19:10:25-07', '2022-04-16 20:15:22-01', 'Eckhart von Hochheim, Du recueillement, in Les jours du Seigneur, pp. 121-122, tr. fr. P. Petit, Témoignage Chrétien, Poitiers, 1953.', 2, 1),
  (5, 'Le retour du roi <span>.&nbsp;Video', '<video controls="controls" poster="/medias/videos/posters/LeRetourDuRoi.jpg"><source src="/medias/videos/LeRetourDuRoi.mp4" type="video/mp4"><p class="message-warning">HTML5 video codec proposed is not supported by your browser.</p></video>', '2022-04-16 19:10:25-07', '2022-04-16 20:15:22-01', 'Test pour une vidéo...', 2, 1),
  (6, 'Le monde de la Rédeption est meilleur au total que le monde de la création <span>.&nbsp;Charles Journet</span>', '<p>Le monde de la création dans l’état d’innocence était bon. Le monde de la nature déchue et rachetée est bon, lui aussi&nbsp;; en suivant la voie ouverte par l’<em>Exsultet</em>, nous avons fait un pas de plus pour affirmer qu’il est meilleur au total que le monde de la création.</p><p>Mais est-ce possible&nbsp;? Le monde que nous avons sous les yeux, terrassé initialement par le péché, visité sans cesse par la douleur, la misère, les épidémies, les catastrophes, rempli de scandales, de trahisons, de crimes, habité par le mensonge, l’imposture, la violence, l’injustice, la haine, la cruauté, disposant après des centaines de milliers d’années d’effrayants moyens de destruction, le monde qui vient d’inventer les guerres intercontinentales, l’extermination de six ou sept millions de Juifs, les camps de la faim et de la mort, les chambres à gaz, les fours crématoires, les grandes propagandes athées -, est-il possible que ce monde soit au total meilleur que n’eût été le monde de l’innocence&nbsp;? Nous savons tous qu’un monde touché par le mal peut être meilleur au total qu’un monde moindre, qui serait exempt du mal. Mais existe-t-il quelque bien, absent du paradis terrestre, que notre monde puisse contenir pour surcompenser le poids en quelque sorte infini des ses misères&nbsp;?</p><p>Oui, ce bien existe. Car nous croyons que le second Adam, venu prendre la place du premier, n’est pas un pur homme, qu’il est le Fils éternel de Dieu, que sa dignité est infinie&nbsp;: c’est là notre réponse suprême. Nous croyons aussi que la sainteté de la Vierge, vraie Mère de Dieu, passe à elle seule toute celle du premier paradis&nbsp;; que la grâce christique, succédant à la grâce adamique, sans éliminer la souffrance peut l’illuminer merveilleusement, faire avec de l’injustice des martyrs, avec du péché des repentirs ignorés du premier âge, qui, tels celui de la pécheresse aux pieds de Jésus ou du larron en croix, seront des splendeurs de l’éternité. Nous croyons que des miséricordes inimaginables s’échappent de la Croix du Sauveur du monde, et que s’il désire ardemment s’adjoindre des disciples qui soient – avec lui, en lui, par lui – des membres sauveurs, c’est pour que la multitude de ceux qui seront ainsi sauvés par eux soit innombrable.</p>', '2022-04-16 19:10:25-07', '2022-04-16 20:15:22-01', 'Charles Journet, Le mal, Essai Théologique, Troisième édition, p. 285, Éditions Saint-Augustin, Saint-Maurice, 1988.', 2, 1),
  (7, 'Première lettre de saint Jean <span>.&nbsp;Chapitre I', '<div class="grid2 gap media-s-grid1"><p lang="grc"><span class="verse">1</span> Ὃ ἦν ἀπ᾽ ἀρχῆς, ὃ ἀκηκόαμεν, ὃ ἑωράκαμεν τοῖς ὀφθαλμοῖς ἡμῶν, ὃ ἐθεασάμεθα καὶ αἱ χεῖρες ἡμῶν ἐψηλάφησαν περὶ τοῦ λόγου τῆς ζωῆς – <span class="verse">2</span> καὶ ἡ ζωὴ ἐφανερώθη, καὶ ἑωράκαμεν καὶ μαρτυροῦμεν καὶ ἀπαγγέλλομεν ὑμῖν τὴν ζωὴν τὴν αἰώνιον ἥτις ἦν πρὸς τὸν πατέρα καὶ ἐφανερώθη ἡμῖν – <span class="verse">3</span> ὃ ἑωράκαμεν καὶ ἀκηκόαμεν, ἀπαγγέλλομεν καὶ ὑμῖν, ἵνα καὶ ὑμεῖς κοινωνίαν ἔχητε μεθ᾽ ἡμῶν. καὶ ἡ κοινωνία δὲ ἡ ἡμετέρα μετὰ τοῦ πατρὸς καὶ μετὰ τοῦ υἱοῦ αὐτοῦ Ἰησοῦ Χριστοῦ. <span class="verse">4</span> καὶ ταῦτα γράφομεν ἡμεῖς, ἵνα ἡ χαρὰ ἡμῶν ᾖ πεπληρωμένη. <span class="verse">5</span> Καὶ ἔστιν αὕτη ἡ ἀγγελία ἣν ἀκηκόαμεν ἀπ᾽ αὐτοῦ καὶ ἀναγγέλλομεν ὑμῖν, ὅτι ὁ θεὸς φῶς ἐστιν καὶ σκοτία ἐν αὐτῷ οὐκ ἔστιν οὐδεμία. <span class="verse">6</span> Ἐὰν εἴπωμεν ὅτι κοινωνίαν ἔχομεν μετ᾽ αὐτοῦ καὶ ἐν τῷ σκότει περιπατῶμεν, ψευδόμεθα καὶ οὐ ποιοῦμεν τὴν ἀλήθειαν· <span class="verse">7</span> ἐὰν δὲ ἐν τῷ φωτὶ περιπατῶμεν ὡς αὐτός ἐστιν ἐν τῷ φωτί, κοινωνίαν ἔχομεν μετ᾽ ἀλλήλων καὶ τὸ αἷμα Ἰησοῦ τοῦ υἱοῦ αὐτοῦ καθαρίζει ἡμᾶς ἀπὸ πάσης ἁμαρτίας. <span class="verse">8</span> ἐὰν εἴπωμεν ὅτι ἁμαρτίαν οὐκ ἔχομεν, ἑαυτοὺς πλανῶμεν καὶ ἡ ἀλήθεια οὐκ ἔστιν ἐν ἡμῖν. <span class="verse">9</span> ἐὰν ὁμολογῶμεν τὰς ἁμαρτίας ἡμῶν, πιστός ἐστιν καὶ δίκαιος, ἵνα ἀφῇ ἡμῖν τὰς ἁμαρτίας καὶ καθαρίσῃ ἡμᾶς ἀπὸ πάσης ἀδικίας. <span class="verse">10</span> ἐὰν εἴπωμεν ὅτι οὐχ ἡμαρτήκαμεν, ψεύστην ποιοῦμεν αὐτὸν καὶ ὁ λόγος αὐτοῦ οὐκ ἔστιν ἐν ἡμῖν.</p><p><span class="verse">1</span> Ce qui était dès le commencement, ce que nous avons entendu, ce que nous avons vu de nos yeux, ce que nous avons contemplé et (que) nos mains ont palpé du Logos de vie &#8211; <span class="verse">2</span> et la vie a été manifestée, et nous avons vu, et nous témoignons et nous vous annonçons la vie éternelle qui était auprès du Père et nous fut manifestée &#8211; <span class="verse">3</span> ce que nous avons vu et entendu, nous vous l’annonçons à vous aussi, afin que vous aussi soyez en communion avec nous. Et notre communion à nous (est) avec le Père et avec son Fils Jésus Christ. <span class="verse">4</span> Et cela nous l’écrivons, nous, afin que notre joie soit en plénitude. <span class="verse">5</span> Et tel est le message que nous avons entendu de lui et (que) nous vous annonçons&nbsp;: Dieu est lumière et de ténèbres en lui il n’en est aucune. <span class="verse">6</span> Si nous disons que nous sommes en communion avec lui et (que) nous marchons dans les ténèbres nous mentons et nous ne pratiquons pas la vérité&nbsp;; <span class="verse">7</span> mais si nous marchons dans la lumière comme lui-même est dans la lumière, nous sommes en communion les uns avec les autres et le sang de Jésus son Fils nous purifie de tout péché. <span class="verse">8</span> Si nous disons que nous n’avons pas de péché nous nous égarons nous-mêmes et la vérité n’est pas en nous. <span class="verse">9</span> Si nous confessons nos péchés, il est fidèle et juste, afin qu’il remette nos péchés et nous purifie de toute injustice. <span class="verse">10</span> Si nous disons que nous n’avons pas péché, nous faisons (de) lui un menteur et sa parole n’est pas en nous.</p></div>', '2022-04-16 19:10:25-07', '2022-04-16 20:15:22-01', 'Traduction expérimentale pour le projet Testimoni@, testimonia.fr, Saint-Étienne, 2011.', 3, 1),
  (8, 'Ne me touche pas <span>.&nbsp;John Henry Newman</span>', '<blockquote><p>Ne me retiens pas, car je ne suis pas encore monté vers le Père. Va trouver mes frères pour leur dire que je monte vers mon Père et votre Père, vers mon Dieu et votre Dieu.</p><footer><em>Évangile selon saint Jean</em> 20, 17</footer></blockquote><p>Ne me touche pas, car voici que je me hâte de la terre au ciel&#8230; Remonter d’ici-bas, en corps et en âme, jusqu’à mon Père à vous. Alors, je vous serai présent, quoique invisible, plus réellement présent qu’aujourd’hui. Alors, vous pourrez me saisir sans une étreinte visible, mais plus réelle&#8230; Maintenant vous ne me voyez que de temps en temps&#8230; Tu m’as vu, Marie, mais tu n’as pu me retenir. Tu m’as approché, mais juste assez pour me baiser les pieds et être touchée de ma main. Tu as dit : « Oh ! si je pouvais le tenir pour de bon et ne plus le perdre ! » Ton désir se réalise. Quand je serai monté au ciel, tu ne verras plus rien, mais tu auras tout. Je serai près de toi, en toi : Sauveur, Christ, homme, Dieu, moi tout entier je serai en toi, présent toujours, à toi toujours, principe de vie et semence d’immortalité.</p>', '2022-04-16 19:10:25-07', '2022-04-16 20:15:22-01', 'John Henry Newman, Lectures on justification, in Les jours du Seigneur, pp. 186-187, Témoignage Chrétien, Poitiers, 1953.', 1, 1),
  (9, 'Impropères du Vendredi Saint', '<p><strong>R. Choeur&nbsp;: Mon peuple, que t’ai-je fait&nbsp;?<br>En quoi t’ai-je offensé&nbsp;?<br>Réponds-moi&nbsp;!</strong></p><p><strong>Choeur et assemblée&nbsp;: Ô Dieu saint, ô Dieu saint fort.<br>Ô Dieu saint, Dieu fort, immortel, prends pitié de nous.</strong></p><p>1. Mon peuple que t’ai-je fait,<br>En quoi t’ai-je offensé&nbsp;?<br>De l’esclavage d’Égypte moi je t’ai tiré,<br>Mais toi tu prépares une croix pour ton Rédempteur.</p><p>2. Quarante ans je t’ai conduit à travers le désert,<br>Je t’ai nourri de la manne,<br>Et je t’ai fait entrer dans la Terre Promise,<br>Mais toi, tu prépares une croix pour ton Rédempteur.</p><p>3. Qu’aurais-je dû faire pour toi que je n’ai fait&nbsp;?<br>Je t’ai planté moi-même comme une vigne choisie,<br>Mais toi tu m’as nourri d’amertume.<br>J’avais soif, tu m’as abreuvé de vinaigre et d’une lance<br>Tu as percé le cœur de ton Sauveur.</p><p>4. Moi, pour toi j’ai frappé l’Égypte,<br>Mais toi, tu m’as flagellé et tu m’as livré à la mort.<br>Je t’ai fait sortir d’Égypte, j’ai englouti Pharaon,<br>Mais toi, tu m’as livré aux grands prêtres.</p><p>5. Je t’ai ouvert un passage dans la mer,<br>Mais toi tu m’as ouvert le côté avec une lance.<br>J’ai marché devant toi dans une colonne de nuée,<br>Mais toi, tu m’as conduit devant Pilate.</p><p>6. Quand tu étais dans le désert, je t’ai nourri de la manne,<br>Mais toi, tu m’as frappé au visage et flagellé.<br>J’ai fait jaillir l’eau du rocher et je t’ai sauvé,<br>Mais toi, tu m’abreuves de fiel et de vinaigre.</p><p>7. Moi, pour toi j’ai frappé les rois de Canaan,<br>Mais toi, tu m’as frappé d’un roseau.<br>Moi, par ma toute puissance, je t’ai élevé, exalté,<br>Mais toi, tu m’as élevé et cloué sur le bois de la Croix.</p>', '2022-04-16 19:10:25-07', '2022-04-16 20:15:22-01', 'Les Improperia sont une partie de l’office de l’après-midi du Vendredi saint dans l’Église catholique romaine. Le mot latin improperium signifie « reproche ». Les Impropères sont les « reproches » du Christ contre son peuple, qui, en échange de toutes les faveurs accordées par Dieu, et en particulier pour l’avoir délivré de la servitude en Égypte et l’avoir conduit sain et sauf dans la Terre promise, lui a infligé les ignominies de la Passion. Cette thématique a longtemps été rattachée à celle du « peuple déicide ».', 4, 1),
  (10, 'Éveille-toi, ô toi qui dors', '<h2>Homélie ancienne pour le grand et saint Samedi<a href="#index0" class="anchor"></a><span id="index0"></span></h2><p>Que se passe-t-il&nbsp;? Aujourd’hui, grand silence sur la terre&nbsp;; grand silence et ensuite solitude parce que le roi sommeille. <em>La terre a tremblé et elle s’est apaisée</em>, parce que Dieu s’est endormi dans la chair et il a évéillé ceux qui dorment depuis les origines. Dieu est mort dans la chair et le séjour des morts s’est mis à trembler. [&#8230;]</p><p>C’est le premier homme qu’il va chercher, comme la brebis perdue. Il veut aussi <em>visiter ceux qui demeurent dans les ténèbres et dans l’ombre de la mort</em>. Oui c’est vers Adam captif, en même temps que vers Eve, captive elle aussi, que Dieu se dirige, et son Fils avec lui, pour les délivrer de leurs douleurs. [&#8230;]</p><p>Le Seigneur s’est avancé vers eux, muni de la croix, l’arme de sa victoire. Lorsqu’il le vit, Adam, le premier homme, se frappant la poitrine dans sa stupeur, s’écria vers tous les autres&nbsp;: « Mon Seigneur avec nous tous&nbsp;! » Et le Christ répondit à Adam « Et avec ton esprit&nbsp;». Il le prend par la main et le relève en disant&nbsp;: <em>Éveille-toi, ô toi qui dors, relève-toi d’entre les morts, et le Christ t’illuminera</em>.</p><p>« C’est moi ton Dieu, qui pour toi, suis devenu ton fils&nbsp;; c’est moi qui, pour toi et pour tes descendants, te parle maintenant et qui, par ma puissance, ordonne à ceux qui sont dans tes chaînes&nbsp;: Sortez. À ceux qui sont endormis&nbsp;: Relevez-vous ».</p><p>« Je te l’ordonne&nbsp;: <em>Éveille-toi, ô toi qui dors</em>, je ne t’ai pas crée pour que tu demeures captif du séjour des morts. Relève-toi d’entre les morts&nbsp;: moi, je suis la vie des morts. Lève-toi, œuvre de mes mains&nbsp;; lève-toi, mon semblable, qui as été créé à mon image. Eveille-toi, sortons d’ici. Car tu es en moi, et moi en toi, nous sommes une seule personne indivisible ».</p><p>« C’est pour toi que moi, ton Dieu, je suis devenu ton fils&nbsp;; c’est pour toi que moi, le Maitre, j’ai pris ta forme d’esclavage&nbsp;; c’est pour toi que moi, qui domine les cieux, je suis venu sur la terre, et au-dessous de la terre&nbsp;; c’est pour toi, l’homme, que je suis devenu <em>comme un homme abandonné, libre entre les morts</em>&nbsp;; c’est pour toi, qui es sorti du jardin, que j’ai été livré aux juifs dans un jardin et que j’ai été crucifié dans un jardin ».</p><p>« Vois les crachats sur mon visage&nbsp;; c’est pour toi que je les ai subis afin de te ramener à ton premier souffle de vie. Vois les soufflets sur mes joues&nbsp;: je les ai subis pour rétablir ta forme défigurée afin de la restaurer à mon image ».</p><p>« Vois la flagellation sur mon dos, que j’ai subie pour éloigner le fardeau de tes péchés qui pesait sur ton dos. Vois mes mains solidement clouées au bois, à cause de toi qui as péché en tendant la main vers le bois ». [&#8230;]</p><p>« Je me suis endormi sur la croix, et la lance a pénétré dans mon côté, à cause de toi qui t’es endormi dans le paradis et, de ton côté, tu as donné naissance à Eve. Mon côté a guéri la douleur de ton côté&nbsp;; mon sommeil va te tirer du sommeil des enfers. Ma lance a arrêté la lance qui se tournait vers toi ».</p><p>« <em>Lève-toi, partons d’ici</em>. L’ennemi t’a fait sortir de la terre du paradis&nbsp;; moi je ne t’installerai plus dans le paradis, mais sur un trône célèste. Je t’ai écarté de l’arbre symbolique de la vie&nbsp;; mais voici que moi, qui suis la vie, je ne fais qu’un avec toi. J’ai posté les cherubins pour qu’ils te gardent comme un serviteur&nbsp;; je fais maintenant que les chérubins t’adorent comme un Dieu ». [&#8230;]</p><p>« Le trône des chérubins est préparé, les porteurs sont alertés, le lit nuptial est dressé, les aliments sont apprêtés, les tentes et les demeures éternelles le sont aussi. Les trésors du bonheur sont ouverts et le royaume des cieux est prêt de toute éternité ».</p>', '2022-04-16 19:10:25-07', '2022-04-16 20:15:22-01', 'Office des lectures pour le Samedi Saint, origine inconnue.', 2, 1);

INSERT INTO __keyword (_id, _name, _slug)
VALUES
  (1, 'Lion','lion'),
  (2, 'Antilope','antilope'),
  (3, 'Crocodile','crocodile'),
  (4, 'Éléphant','elephant'),
  (5, 'Zèbre','zebre'),
  (6, 'Hippopotame','hippopotame'),
  (7, 'Tigre','tigre'),
  (8, 'Rhinocéros','rhinoceros'),
  (9, 'Girafe','girafe'),
  (10, 'Toucan','toucan'),
  (11, 'Perroquet','perroquet'),
  (12, 'Singe','singe'),
  (13, 'Panda', 'panda'),
  (14, 'Léopard', 'leopard'),
  (15, 'Tortue', 'tortue'),
  (16, 'Autruche', 'autruche'),
  (17, 'Caméléon', 'cameleon'),
  (18, 'Serpent', 'serpent'),
  (19, 'Flamant rose', 'flamant-rose'),
  (20, 'Guépard', 'guepard');

\c postgres
