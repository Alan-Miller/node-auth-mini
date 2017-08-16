const express = require('express');
const session = require('express-session');
const passport = require('passport');
const strategy = require(__dirname + '/strategy.js');

const app = express();

app.use( session({
    secret: 'super secret',
    resave: false,
    saveUninitialized: false
}) );
app.use( passport.initialize() );
app.use( passport.session() );
passport.use( strategy );

passport.serializeUser( (user, done) => {
    done(null, {
        id: user.id,
        displayName: user.displayName,
        nickname: user.nickname,
        email: user.email
    })
})

passport.deserializeUser( (obj, done) => {
    done(null, obj)
})

app.get('/login', passport.authenticate('auth0', {
    successRedirect: '/me',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/me', (req, res, next) => {
    if (req.user) res.status(200).send( JSON.stringify( req.user, null, 10 ) );
    else res.redirect('/login');
})

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );