'use strict';

const http = require('http'),
    path = require('path');

const bodyParser = require('body-parser'),
    cors = require('cors'),
    express = require('express'),
    expressSession = require('express-session'),
    lusca = require('lusca'),
    nocache = require('nocache');


const app = express();

app.use(cors({
    origin: 'https://www.brugger-hurter.ch',
    optionsSuccessStatus: 200
}));

app.use(lusca({
    csrf: true,
    xssProtection: true,
    hsts: { maxAge: 365 * 24 * 60 * 60 * 1000 }
}));

app.use(nocache());

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'client')));

app.use('/hello', (req, res) => {
    res.cookie('user', 'jane.doe', {
        maxAge: 24 * 60 * 60 * 1000
    }).send('Hallo Welt');
})

app.get('/articles', (req, res) => {
    res.send([
        { id: 1, title: 'foo' }
    ]);
});

app.post('/articles', (req, res) => {
    res.send(`Hallo ${req.body.user}!`);
});

const server = http.createServer(app);

server.listen(3000, 'localhost', () => {
    console.log('Server listening on port 3000');
});