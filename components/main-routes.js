const request = require('request');
const parseStatusCode = require('./parse-statuscodes');
const USERAGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36';

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('pages/index.ejs', {
            pageTitle: 'Is it down?'
        });
    });

    app.get('/:site', (req, res) => {
        let URI = req.params.site;
        console.log(URI);

        if (URI.indexOf('://') < 0) {
            URI = 'http://' + URI;
        }

        request({
            method: 'HEAD',
            uri: URI,
            followAllRedirects: true,
            maxRedirects: 12,
            headers: {
                'User-Agent': USERAGENT
            },
            time: true,
            timeout: 20000
        }, function (error, response) {
            if (error) {
                console.log('error:', error);
                res.render('pages/detail-page.ejs', {
                    pageTitle: 'Is it down?',
                    site: URI,
                    content: parseStatusCode(error.code, error),
                    elapsedTime: ''
                });
            } else {
                console.log('statusCode:', response && response.statusCode);

                res.render('pages/detail-page.ejs', {
                    pageTitle: 'Is it down?',
                    site: URI,
                    content: parseStatusCode(response.statusCode, response.headers),
                    elapsedTime: (response.timings.response/1000).toFixed(2)
                });
            }
        });
    });
};

