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








UPDATE
    __post
SET
    _content = '<p>La Légende dorée (<em>Legenda aurea</em> en latin) est un ouvrage rédigé en latin entre 1261 et 1266 par Jacques de Voragine, dominicain et archevêque de Gênes, qui raconte la vie d''environ 150 saints ou groupes de saints, saintes et martyrs chrétiens, et, suivant les dates de l''année liturgique, certains événements de la vie du Christ et de la Vierge Marie.</p><div class="grid2 gap media-s-grid1"><p lang="grc"><span class="verse">1</span> Ὃ ἦν ἀπ᾽ ἀρχῆς, ὃ ἀκηκόαμεν, ὃ ἑωράκαμεν τοῖς ὀφθαλμοῖς ἡμῶν, ὃ ἐθεασάμεθα καὶ αἱ χεῖρες ἡμῶν ἐψηλάφησαν περὶ τοῦ λόγου τῆς ζωῆς – <span class="verse">2</span> καὶ ἡ ζωὴ ἐφανερώθη, καὶ ἑωράκαμεν καὶ μαρτυροῦμεν καὶ ἀπαγγέλλομεν ὑμῖν τὴν ζωὴν τὴν αἰώνιον ἥτις ἦν πρὸς τὸν πατέρα καὶ ἐφανερώθη ἡμῖν – <span class="verse">3</span> ὃ ἑωράκαμεν καὶ ἀκηκόαμεν, ἀπαγγέλλομεν καὶ ὑμῖν, ἵνα καὶ ὑμεῖς κοινωνίαν ἔχητε μεθ᾽ ἡμῶν. καὶ ἡ κοινωνία δὲ ἡ ἡμετέρα μετὰ τοῦ πατρὸς καὶ μετὰ τοῦ υἱοῦ αὐτοῦ Ἰησοῦ Χριστοῦ. <span class="verse">4</span> καὶ ταῦτα γράφομεν ἡμεῖς, ἵνα ἡ χαρὰ ἡμῶν ᾖ πεπληρωμένη. <span class="verse">5</span> Καὶ ἔστιν αὕτη ἡ ἀγγελία ἣν ἀκηκόαμεν ἀπ᾽ αὐτοῦ καὶ ἀναγγέλλομεν ὑμῖν, ὅτι ὁ θεὸς φῶς ἐστιν καὶ σκοτία ἐν αὐτῷ οὐκ ἔστιν οὐδεμία.</p><p><span class="verse">1</span> Ce qui était dès le commencement, ce que nous avons entendu, ce que nous avons vu de nos yeux, ce que nous avons contemplé et (que) nos mains ont palpé du Logos de vie - <span class="verse">2</span> et la vie a été manifestée, et nous avons vu, et nous témoignons et nous vous annonçons la vie éternelle qui était auprès du Père et nous fut manifestée - <span class="verse">3</span> ce que nous avons vu et entendu, nous vous l''annonçons à vous aussi, afin que vous aussi soyez en communion avec nous. Et notre communion à nous (est) avec le Père et avec son Fils Jésus Christ. <span class="verse">4</span> Et cela nous l''écrivons, nous, afin que notre joie soit en plénitude. <span class="verse">5</span> Et tel est le message que nous avons entendu de lui et (que) nous vous annonçons : Dieu est lumière et de ténèbres en lui il n''en est aucune.</p></div><p>Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar (note <a href="#n1" id="r1">#1</a>). Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur aliquet pellentesque diam. Integer quis metus vitae elit lobortis egestas (note <a href="#n2" id="r2">#2</a>). Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi vel erat non mauris convallis vehicula. Nulla et sapien. Integer tortor tellus, aliquam faucibus, convallis id, congue eu, quam. Mauris ullamcorper felis vitae erat. Proin feugiat, augue non elementum posuere, metus purus iaculis lectus, et tristique ligula justo vitae magna (note <a href="#n3" id="r3">#3</a>).</p><figure class="figure-focus-thumbnail-alignleft"><picture><source media="(min-width: 2000px)" srcset="/medias/images/demo/OldMechanism.jpg, /medias/images/demo/OldMechanism.jpg 2x" sizes="100vw"><source media="(min-width: 1500px)" srcset="/medias/images/demo/OldMechanism2000.jpg, /medias/images/demo/OldMechanism.jpg 2x" sizes="100vw"><source media="(min-width: 1000px)" srcset="/medias/images/demo/OldMechanism1500.jpg, /medias/images/demo/OldMechanism2000.jpg 2x" sizes="100vw"><source media="(min-width: 800px)" srcset="/medias/images/demo/OldMechanism1000.jpg, /medias/images/demo/OldMechanism2000.jpg 2x" sizes="100vw"><source media="(min-width: 600px)" srcset="/medias/images/demo/OldMechanism800.jpg, /medias/images/demo/OldMechanism1500.jpg 2x" sizes="100vw"><source media="(min-width: 400px)" srcset="/medias/images/demo/OldMechanism600.jpg, /medias/images/demo/OldMechanism1000.jpg 2x" sizes="100vw"><source media="(min-width: 300px)" srcset="/medias/images/demo/OldMechanism400.jpg, /medias/images/demo/OldMechanism800.jpg 2x" sizes="100vw"><source srcset="/medias/images/demo/OldMechanism300.jpg" sizes="100vw"><img src="/medias/images/demo/OldMechanism.jpg" loading="lazy" alt="Old Mechanism"></picture><figcaption>Nam perferendis soluta quo fuga repudiandae vel perferendis suscipit et impedit voluptatum qui reprehenderit aliquid non iure ipsam.</figcaption></figure><p>Morbi ac ex ornare, finibus turpis vel, pellentesque leo. Aenean dignissim eu dolor id dignissim. Duis ornare sapien ex, non porttitor sapien suscipit ut. Curabitur at tempor massa, ac finibus mi. Suspendisse nibh neque, porta et placerat vel, gravida at magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.</p><figure class="figure-focus-thumbnail-alignright"><picture><source media="(min-width: 2000px)" srcset="/medias/images/demo/PacificCity.jpg, /medias/images/demo/PacificCity.jpg 2x" sizes="100vw"><source media="(min-width: 1500px)" srcset="/medias/images/demo/PacificCity2000.jpg, /medias/images/demo/PacificCity.jpg 2x" sizes="100vw"><source media="(min-width: 1000px)" srcset="/medias/images/demo/PacificCity1500.jpg, /medias/images/demo/PacificCity2000.jpg 2x" sizes="100vw"><source media="(min-width: 800px)" srcset="/medias/images/demo/PacificCity1000.jpg, /medias/images/demo/PacificCity2000.jpg 2x" sizes="100vw"><source media="(min-width: 600px)" srcset="/medias/images/demo/PacificCity800.jpg, /medias/images/demo/PacificCity1500.jpg 2x" sizes="100vw"><source media="(min-width: 400px)" srcset="/medias/images/demo/PacificCity600.jpg, /medias/images/demo/PacificCity1000.jpg 2x" sizes="100vw"><source media="(min-width: 300px)" srcset="/medias/images/demo/PacificCity400.jpg, /medias/images/demo/PacificCity800.jpg 2x" sizes="100vw"><source srcset="/medias/images/demo/PacificCity300.jpg" sizes="100vw"><img src="/medias/images/demo/PacificCity.jpg" loading="lazy" alt="Pacific City"></picture><figcaption>Eum atque aperiam et expedita cupiditate aut quos quisquam et similique harum aut galisum maxime.</figcaption><button aria-label="enlarge" class="icon-enlarge"><svg role="img" focusable="false"><use xlink:href="/medias/sprites/utils.svg#enlarge"></use></svg></button></figure><p>Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur aliquet pellentesque diam. Integer quis metus vitae elit lobortis egestas. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi vel erat non mauris convallis vehicula. Nulla et sapien. Integer tortor tellus, aliquam faucibus, convallis id, congue eu, quam. Mauris ullamcorper felis vitae erat. Proin feugiat, augue non elementum posuere, metus purus iaculis lectus, et tristique ligula justo vitae magna.</p><p>Aliquam convallis sollicitudin purus. Praesent aliquam, enim at fermentum mollis, ligula massa adipiscing nisl, ac euismod nibh nisl eu lectus. Fusce vulputate sem at sapien. Vivamus leo. Aliquam euismod libero eu enim. Nulla nec felis sed leo placerat imperdiet. Aenean suscipit nulla in justo. Suspendisse cursus rutrum augue. Nulla tincidunt tincidunt mi. Curabitur iaculis, lorem vel rhoncus faucibus, felis magna fermentum augue, et ultricies lacus lorem varius purus. Curabitur eu amet.</p><hr><div class="footnotes"><p><a href="#r1" id="n1">#1</a> Première note. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.</p><p><a href="#r2" id="n2">#2</a> Deuxième note. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula.</p><p><a href="#r3" id="n3">#3</a> Troisième note. Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis.</p></div>'
WHERE
    _id = 1;
