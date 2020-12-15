const express = require('express');
const router = express.Router();

module.exports = () => {
    router.get('/', (request, response) => {
        response.render('index', { pageTitle: 'Home: Trivia Quiz' });
    });

    router.get('/game', (request, response) => {
        response.render('game', {});
    });

    router.get('/end', (request, response) => {
        response.render('end', {});
    });

    router.get('/hi-scores', (request, response) => {
        response.render('hi-scores', {});
    });
    return router
};