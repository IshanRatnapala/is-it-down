const request = require('request');
const parseStatusCode = require('./parse-statuscodes');

function doRequest (site) {
    if (site.indexOf('://') < 0) {
        site = 'http://' + site;
    }
    return request.head(site, {timeout: 20000});
}

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('pages/index.ejs', {
            pageTitle: 'Is it down?'
        });
    });

    app.get('/:site', (req, res) => {
        let URI = req.params.site;
        console.log(URI);
        doRequest(req.params.site)
            .on('response', function(response) {
                console.log('statusCode:', response && response.statusCode);
                res.render('pages/detail-page.ejs', {
                    pageTitle: 'Is it down?',
                    site: URI,
                    content: parseStatusCode(response.statusCode, response.headers)
                });
            })
            .on('error', function(error) {
                console.log('error:', error);
                res.render('pages/detail-page.ejs', {
                    pageTitle: 'Is it down?',
                    site: URI,
                    content: parseStatusCode(error.code, error)
                });
            })
    });
};

