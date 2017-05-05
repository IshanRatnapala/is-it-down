const http = require('http');

function parseStatusCode (statusCode) {
    const code = statusCode.toString();
    if (code[0] === '2') {
        return {
            message: 'The site is live',
            additional: 'Server responded with a status code of ' +  code + ' which means all went well.'
        };
    }
    if (code[0] === '3') {
        return {
            message: 'The site is live',
            additional: 'Server responded with a status code of ' +  code + ' which means a redirect.'
        };
    }
    if (code[0] === '4') {
        return {
            message: 'The site is live',
            additional: 'Server responded with a status code of ' +  code + ' which means there are client errors. Not the server\'s fault.'
        };
    }
    if (code[0] === '5') {
        return {
            message: 'The server is live',
            additional: 'Server responded with a status code of ' +  code + ' which means there are server errors.'
        };
    }

    /* Errors */
    if (code === 'ENOTFOUND') {
        return {
            message: 'Domain name not found',
            additional: ''
        };
    }

    /* Default */
    return {
        message: statusCode,
        additional: ''
    };
}

module.exports = (app) => {
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

        http.request(options, function (response) {
            res.render('pages/detail-page.ejs', {
                pageTitle: 'Is it down?',
                content: parseStatusCode(response.statusCode, response.headers)
            });
        })
            .on('error', function (err) {
                res.render('pages/detail-page.ejs', {
                    pageTitle: 'Is it down?',
                    content: parseStatusCode(err.code, err)
                });
            })
            .end();
    });
};