const   Auth0Strategy = require('passport-auth0'),
        config = require(__dirname + '/config'),
        { domain, clientID, clientSecret } = config;

module.exports = new Auth0Strategy({
  domain,
  clientID,
  clientSecret,
  callbackURL:  '/login'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
)