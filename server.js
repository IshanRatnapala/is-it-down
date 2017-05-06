const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const PORT = 3002;
const app = express();

app.set('view-engine', 'ejs');
app.use(favicon(path.join(__dirname, 'public/favicon', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public'), { maxage: '5d' }));

require('./components/main-routes')(app);
require('./components/error-routes')(app);

app.listen(PORT, () => {
    console.log('Server started on port', PORT);
});