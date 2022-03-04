-- @note Pour le format SQL utlisé @see https://codebeautify.org/sqlformatter

-- Sélectionner l'article avec l'ID n°1 :
SELECT * FROM __post WHERE _id = 1;

-- Auteur de l'article :
SELECT
    __person._given_name,
    __person._family_name
FROM
    __post
    INNER JOIN __person ON __post._author_id = __person._id
    AND __post._id = 1;

-- Article + auteur (solution de Mathieu8337) :
SELECT
    __post.*,
    __person._given_name,
    __person._family_name
FROM
    __post
    INNER JOIN __person ON __post._author_id = __person._id
WHERE
    __post._id = 1;

-- Articles et ses mots clés (avec table many to many) :
SELECT
    __post.*,
    __keyword._name AS _keyword_name,
    __keyword._slug AS _keyword_slug
FROM
    __post
    INNER JOIN __keyword_to_post ON __post._id = __keyword_to_post._post_id
    INNER JOIN __keyword ON __keyword_to_post._keyword_id = __keyword._id
WHERE
    __post._id = 1
ORDER BY
    __keyword._name;

-- Nom d'un mot clé via son slug :
SELECT _name FROM __keyword WHERE _slug = 'lion';

-- Informations de base des 100 derniers articles via le slug "lion" :
SELECT
    __post._id,
    __post._name,
    __post._description,
    __keyword._id,
    __keyword._name
FROM
    __post
    INNER JOIN __keyword ON __post._author_id = __keyword._id AND __keyword._slug = 'lion'
ORDER BY
    __post._id DESC
LIMIT
    100;

-- ID, nom et description des 100 derniers articles :
SELECT _id, _name, _description FROM __post ORDER BY _id DESC LIMIT 100;

-- Rechercher un nom de famille à partir d'un prénom :
SELECT
    _given_name,
    _family_name
FROM
    __person
WHERE
    LOWER(_given_name) LIKE LOWER('%Jeanne%'); -- @note Suppression de la sensibilité à la case.

-- updater le contenu d'un article :
UPDATE __post SET _content = 'nouveauContenu' WHERE _id = 1;

-- updater plusieurs item sur un article :
UPDATE
    __post
SET
    _name = 'a nom',
    _content = 'un contenu',
    _description = 'une description'
WHERE
    _id = 1;

-- updater l'article n°12 :
UPDATE
    __post
SET
    _name = 'Cartes Leaflet en shorcodes',
    _content = '{{map name="Cathédrale Notre-Dame de Paris" coords=[48.853133,2.349747] zoom=15}}<hr>{{map name="Lyon" coords=[44.853133,3.349747] zoom=5}}<hr><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
WHERE
    _id = 12;
