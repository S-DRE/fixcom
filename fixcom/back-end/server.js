// Server.js
const fs = require('fs');
const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const https = require('https');


const app = express()

app.set('trust proxy', true);

// BodyParser module
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session creation
app.use(session({
    secret: "ElSecretoDeLaRiva",
    resave: true,
    saveUninitialized: true,
    cookie: { // <-- La cookie va del lado del cliente, por lo que aunque reiniciemos el Nodemon/Node, se guarda. Pero la sesión a la que apunta no, pues está del lado del servidor.
        path: "/",
        httpOnly: true,
        maxAge: 3600000, // <-- 1 hour in milisecs
        sameSite: true
    },
    rolling: true
}));

// Folders
app.use('/js', express.static('/var/www/fixcom.mywire.org/public/js'));
app.use('/css', express.static('/var/www/fixcom.mywire.org/public/css'));
app.use('/img', express.static('/var/www/fixcom.mywire.org/public/img'));
app.use('/fonts', express.static('/var/www/fixcom.mywire.org/public/fonts'));
app.use('/favicon.ico', express.static('/var/www/fixcom.mywire.org/public/favicon.ico'));
const web = require('./routes/routes');
app.use("", web);

// Path to public
app.use(express.static(path.join(__dirname, '..')));

// SERVER

const privateKey = fs.readFileSync('/etc/letsencrypt/live/a19andresaa.mywire.org/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/a19andresaa.mywire.org/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/a19andresaa.mywire.org/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

const httpServer = http.createServer(credentials, app);
var server = httpServer.listen(80, () => {
     
});

// Arrancamos el servidor https....Acordarse de parar Nginx.
const httpsServer = https.createServer(credentials, app);
var server = httpsServer.listen(443, () => {
     
});