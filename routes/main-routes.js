const request = require('request');

function parseStatusCode (statusCode, details) {
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
            message: 'The server is live but there is a Internal Server Error',
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
    if (code === 'ETIMEDOUT') {
        return {
            message: 'Connection Timeout',
            additional: 'No response from the server for 20 seconds.'
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
        doRequest(req.params.site, res);
    });
};

function doRequest (site, res) {
    if (site.indexOf('://') < 0) {
        site = 'http://' + site;
    }

    request.head(site, {timeout: 20000}, function (error, response) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);

        if (error) {
            res.render('pages/detail-page.ejs', {
                pageTitle: 'Is it down?',
                content: parseStatusCode(error.code, error)
            });
        } else {
            res.render('pages/detail-page.ejs', {
                pageTitle: 'Is it down?',
                content: parseStatusCode(response.statusCode, response.headers)
            });
        }
    });
}