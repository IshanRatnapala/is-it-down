const request = require('request');
const sm = require('sitemap');
const parseStatusCode = require('./parse-statuscodes');
const DB_ACTIONS = require('../db');
const USERAGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36';

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('pages/index.ejs', {
            pageTitle: 'Is it down?'
        });
    });

    app.get('/sitemap.xml', function(req, res) {
        let sitemap = sm.createSitemap({
            hostname: 'https://isitdown.info',
            urls: [{
                url: '/',
                changefreq: 'monthly',
                priority: 1
            }]
        });

        DB_ACTIONS.getSites()
            .then((data) => {
                for (var i = 0; i < data.length; i++) {
                    sitemap.add({
                        url: data[i].siteUrl,
                        changefreq: 'daily',
                        priority: 0.9
                    });
                }
                res.header('Content-Type', 'application/xml');
                res.send(sitemap.toString());
            })
            .catch((err) => {
                res.send(err);
            });
    });

    app.get('/:site', (req, res) => {
        let URI = 'http://' + req.params.site;
        console.log(URI);

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
                    pageTitle: 'Is ' + req.params.site + ' down?',
                    site: URI,
                    content: parseStatusCode(error.code, error),
                    elapsedTime: ''
                });
            } else {
                console.log('statusCode:', response && response.statusCode);
                console.log('site:', req.params.site);

                /* Valid url? save to the db for the sitemap without protocol */
                DB_ACTIONS.insertSite(req.params.site);

                res.render('pages/detail-page.ejs', {
                    pageTitle: 'Is ' + req.params.site + ' down?',
                    site: req.params.site,
                    content: parseStatusCode(response.statusCode, response.headers),
                    elapsedTime: (response.timings.response/1000).toFixed(2)
                });
            }
        });
    });
};

