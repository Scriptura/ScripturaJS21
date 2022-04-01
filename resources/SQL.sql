-- @note Pour le format SQL utlisé @see https://codebeautify.org/sqlformatter
-- Sélectionner l'article avec l'ID n°1 :
SELECT
    *
FROM
    __post
WHERE
    _id = 1;

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

-- Selection des mots clés d'un article (avec table many to many) :
SELECT
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

-- Articles et ses mots clés (avec table many to many) :
SELECT
    __post.*,
    -- __post._id,
    -- __post._name,
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
SELECT
    _name
FROM
    __keyword
WHERE
    _slug = 'lion';

-- Informations de base des 100 derniers articles via le slug "lion" :
SELECT
    __post._id,
    __post._name,
    __post._description,
    __keyword._id,
    __keyword._name
FROM
    __post
    INNER JOIN __keyword ON __post._author_id = __keyword._id
    AND __keyword._slug = 'lion'
ORDER BY
    __post._id DESC
LIMIT
    100;

-- ID, nom et description des 100 derniers articles :
SELECT
    _id,
    _name,
    _description
FROM
    __post
ORDER BY
    _id DESC
LIMIT
    100;

-- Rechercher un nom de famille à partir d'un prénom :
SELECT
    _given_name,
    _family_name
FROM
    __person
WHERE
    LOWER(_given_name) LIKE LOWER('%Jeanne%');

-- @note Suppression de la sensibilité à la case.
-- updater le contenu d'un article :
UPDATE
    __post
SET
    _content = 'nouveauContenu'
WHERE
    _id = 1;

-- updater plusieurs item sur un article :
UPDATE
    __post
SET
    _name = 'a nom',
    _content = 'un contenu',
    _description = 'une description'
WHERE
    _id = 1;

-- insérer un article :
INSERT INTO
    __post (
        _id,
        _name,
        _content,
        _creation,
        _revision,
        _description,
        _author_id,
        _status
    )
VALUES
    (
        13,
        'Images en shortcodes',
        '{{img src="/medias/images/demo/OldMechanism.jpg" alt="Old Mechanism" caption="Old Mechanism" class="testClass"}}<hr>{{/medias/images/demo/GrassLeaf.jpg}}<hr>{{ /medias/images/demo/OldMechanism.jpg }}<hr>{{map coords=[44.853133, 3.349747] name="Lyon" zoom=5}}{{http://localhost:9001/medias/images/demo/PacificCity.jpg}} <hr> {{http://localhost:9001/medias/images/demo/OldMechanism.jpg}}',
        '2020-04-16 19:10:25-07',
        '2020-04-16 20:15:22-01',
        'Test de shortcodes pour les images.',
        2,
        1
    );

-- Selection des mots clés d'un article :
SELECT
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

-- updater le contenu d'un article :
UPDATE
    __post
SET
    _name = 'Images en shorcodes',
    _content = '{{img src="/medias/images/demo/OldMechanism.jpg" alt="Old Mechanism" caption="Old Mechanism" class="testClass"}}{{img src="/medias/images/demo/GrassLeaf.jpg" caption="Grass Leaf" class="className"}}<hr>{{/medias/images/demo/GrassLeaf.jpg}}{{ /medias/images/demo/OldMechanism.jpg }}{{/medias/images/demo/PacificCity.jpg}}{{/medias/images/demo/OldMechanism.jpg}}'
WHERE
    _id = 13;

-- updater le contenu d'un article :
UPDATE
    __post
SET
    _content = '{{map data-name="Cathédrale Notre-Dame de Paris" data-places=''["Cathédrale Notre-Dame de Paris", [48.853133,2.349747]]'' data-tileserver="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" style="height: 25vh; max-height: calc(100vw - 2em)"}}{{ map data-name="Lyon" data-places=''["Lyon", [45.764043,4.835659]]'' data-tileserver="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" style="height: 25vh; max-height: calc(100vw - 2em)" }}'
WHERE
    _id = 12;
