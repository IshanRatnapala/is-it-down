const http = require('http');
const express = require('express');
const PORT = 3002;
const app = express();

app.set('view-engine', 'ejs');
app.use(express.static(__dirname + '/public', { maxage: '5d' }));

app.get('/', (req, res) => {
    res.render('pages/index.ejs', {
        pageTitle: 'Is it down?'
    });
});
app.get('/:site', (req, res) => {

    var options = {
        method: 'HEAD',
        host: req.params.site,
        port: 80,
        path: '/'
    };
    var request = http.request(options, function (response) {
        // console.log(JSON.stringify(response.headers));

        res.render('pages/detail-page.ejs', {
            pageTitle: 'Is it down?',
            headers: response.headers,
            statusCode: response.statusCode
        });
    })
        .on('error', function (e) {
            console.log("Got error: " + e.message);
            res.render('pages/detail-page.ejs', {
                pageTitle: 'Is it down?',
                headers: response.headers,
                statusCode: response.statusCode
            });
        })
        .end();
});
require('./routes/error')(app);

app.listen(PORT, () => {
    console.log('Server started on port', PORT);
});