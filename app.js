'use strict'

const vv = require('./settings/variables'),
      //createError = require('http-errors'),
      path = require('path'),
      express = require('express'),
      helmet = require('helmet'),
      cookieParser = require('cookie-parser'),
      morgan = require('morgan'),
      compression = require('compression'),
      favicon = require('serve-favicon'),
      useragent = require('express-useragent'),
      //flash = require('connect-flash'), // @todo en test. En lien avec Passeport.js
      //session = require('express-session'), // @todo idem
      // yarn add :
      // passport
      // express-validator
      // sitemap
      // jsonld @note Microdata
      // express-naked-redirect // @ http -> https, www.site.com -> site.com, etc
      // sharp
      // svgo
      // imagemin-webp
      app = express() // Instantiation

      const currentDate = new Date().toISOString().split('T')[0].replaceAll('-', '/')

// Protection des en-têtes HTTP
//@see https://helmetjs.github.io/
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [
        "'self' 'unsafe-inline'"
      ],
      imgSrc: [
        // tuiles des maps Leaflet :
        "'self' data: *.openstreetmap.org",
        "'self' data: *.openstreetmap.fr",
        "'self' data: *.mapbox.com",
        "'self' data: *.stadiamaps.com",
        "'self' data: *.ign.fr",
        // YouTube :
        "'self' data: img.youtube.com",
        "'self' data: *.ytimg.com" // certaines miniatures du player et notamment l'image par défaut.
      ],
      frameSrc: [
        "'self' data: *.youtube.com"
      ]
    },
  })
)

//app.set('etag', false)

app.use(morgan('dev')) // Info sur les logs en console.
app.set('views', path.join(__dirname, 'views')) // Racine pour les vues.
app.set('view engine', 'pug') // Choix du moteur de template.
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public'))) // Gestion des fichiers statiques.
app.use(favicon(path.join(__dirname, 'public', 'favicons', 'favicon.ico'))) // addresse de la favicon
app.use(compression()) // Compression deflate et gzip.
app.use(useragent.express())

app.use('/', require(path.join(__dirname, 'controllers', 'routesDispatcher'))) // Redirige vers le répartiteur des routes

app.use((req, res, next) => {
  res.status(404)
  res.render('404', {
    data: {
      _url: req.url,
      _title: 'Error 404 . ' + vv.siteName,
      _description: 'Erreur 404, page non trouvée',
      _name: 'Error 404'
    }
  })
  //next(createError(404)) // catch 404 and forward to error handler
})

app.use((err, req, res, next) => { // Gestionnaire d'erreurs.
  // Set locals, only providing error in development.
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error', {
    data: {
      _url: req.url,
      _title: 'Error 500 . ' + vv.siteName,
      _dev: vv.dev,
      _name: 'Error 500'
    }
  })
})

module.exports = app
