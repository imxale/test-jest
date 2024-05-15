const functions = require('@google-cloud/functions-framework');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/health', (req, res) => {
    res.status(204).send();
});

app.get('/forbidden', (req, res) => {
    res.status(403).send();
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

functions.http('helloGET', (req, res) => {
    app(req, res);
});

module.exports = app;