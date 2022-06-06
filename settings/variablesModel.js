'use strict'
// Renseigner les variables globales et renommer le fichier en 'settings.js'
const pkg = require( '../package.json' )

exports.dev = true
exports.siteName = 'Site Name'
exports.name = pkg.name
exports.version = pkg.version
exports.author = pkg.author
exports.themeColor = '#333333'
