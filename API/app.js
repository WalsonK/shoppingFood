const express = require('express'), // Chargement express - création de route
    route = require('./src/routes'), // Chargement de nos routes
    mysql = require('./src/models'), // Chargement de la bdd
    bodyParser = require('body-parser'),
    metadata = require('gcp-metadata'), //récup metadata du Cloud Google
    {OAuth2Client} = require('google-auth-library'); // OAuth 2.0 authorization & connexion avec Google APIs.

    app = express(); // Nouvel instance d'express - Chaque instance = une nouvelle api
    const oAuth2Client = new OAuth2Client(); // Nouvel instance de OAuth

    // Cache externally fetched information for future invocations
let aud;

async function audience() {
  if (!aud && (await metadata.isAvailable())) {
    let project_number = await metadata.project('numeric-project-id');
    let project_id = await metadata.project('project-id');

    aud = '/projects/' + project_number + '/apps/' + project_id;
  }

  return aud;
}

async function validateAssertion(assertion) {
  if (!assertion) {
    return {};
  }

  // Check that the assertion's audience matches ours
  const aud = await audience();

  // Fetch the current certificates and verify the signature on the assertion
  const response = await oAuth2Client.getIapPublicKeys();
  const ticket = await oAuth2Client.verifySignedJwtWithCertsAsync(
    assertion,
    response.pubkeys,
    aud,
    ['https://cloud.google.com/iap']
  );
  const payload = ticket.getPayload();

  // Return the two relevant pieces of information
  return {
    email: payload.email,
    sub: payload.sub,
  };
}

    // Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8001');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
   // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.urlencoded({ extended: false })) // Récupération des data en post en HTML
app.use(bodyParser.json()) //REcuperation des datas sous angular

app.use('/', route); // Ajout. des routes dans l'api

app.listen(8001); // Lancement de l'api sur le port 8001

console.log(`listening on http://localhost:8001`)

/**
 * https://www.npmjs.com/package/mysql
 * https://www.npmjs.com/package/body-parser
 * https://www.npmjs.com/package/bcrypt
 * https://www.npmjs.com/package/express
 */