'use strict'

// @note Initialisation unique sur le site pour la base de donnée.

const vv = require('../settings/variables'), // Importation des données confidentielles.
      options = {
        // Global event notification.
        error(error, e) {
          if (e.cn) { // Erreur liée à la connexion. Les connextions sont rapportées avec le mot de passe, celui-ci est haché afin de ne pas l'exposer et de produire une journalisation sûre.
            console.log('CN:', e.cn);
            console.log('EVENT:', error.message || error);
          }
        }
      },
      pgp = require('pg-promise')(options),
      cn = { // Détail de la connexion.
        host: vv.host,
        port: vv.port,
        database: vv.database,
        user: vv.user,
        password: vv.password
      },
      db = pgp(cn) // Instanciation de la base de donnée.

module.exports = db
