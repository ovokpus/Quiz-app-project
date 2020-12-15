const express = require('express');
const path = require('path');
const routes = require('./routes');
const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, './static')));
app.use('/', routes());



app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Express server listening on port ${port}...`);
});