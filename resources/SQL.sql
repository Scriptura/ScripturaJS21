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

-- Mots clés de l'article :
SELECT
    __keyword._name,
    __keyword._slug
FROM
    __post
    JOIN __keyword ON __post._author_id = __keyword._id
    AND __post._id = 1;

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
