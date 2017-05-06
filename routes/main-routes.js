// const http = require('http');
const request = require('request');

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
            additional: 'No response from the server for 15 seconds.'
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
        console.log(req.params.site);
        doRequest(req.params.site, res);
    });
};

function configOptions (site) {
    let URI = site;

    let options = {
        method: 'HEAD',
        port: 80,
        path: '/'
    };

    if (URI.indexOf('://') >= 0) {
        options.protocol = URI.split('://')[0] + ':';
        URI = URI.split('://')[1];
    }

    let host = URI.split('/')[0];
    options.host = host;
    URI = host;

    let port = URI.split(':')[1];
    if (port) {
        options.port = port;
    }

    return options;
}

function doRequest (site, res) {
    const options = configOptions(site);
    // const options = configOptions('https://www.monoprice.com/asdasd')''

    http.request(options, function (response) {
        console.log(response.headers);

        if (response.statusCode.toString()[0] === '3') {
            console.log(response.headers.location);
            doRequest(response.headers.location, res);
        } else {
            res.render('pages/detail-page.ejs', {
                pageTitle: 'Is it down?',
                content: parseStatusCode(response.statusCode, response.headers)
            });
        }
    })
        .on('error', function (err) {
            res.render('pages/detail-page.ejs', {
                pageTitle: 'Is it down?',
                content: parseStatusCode(err.code, err)
            });
        })
        .end();
}
//
// function doRequest (site, res) {
//     if (site.indexOf('://') < 0) {
//         site = 'http://' + site;
//     }
//
//     request(site, {timeout: 15000}, function (error, response, body) {
//         console.log('error:', error); // Print the error if one occurred
//         console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//         // console.log('body:', body); // Print the HTML for the Google homepage.
//
//         if (error) {
//             res.render('pages/detail-page.ejs', {
//                 pageTitle: 'Is it down?',
//                 content: parseStatusCode(error.code, error)
//             });
//         }
//
//         if (response.statusCode.toString()[0] === '3') {
//             console.log(response.headers.location);
//             doRequest(response.headers.location, res);
//         } else {
//             res.render('pages/detail-page.ejs', {
//                 pageTitle: 'Is it down?',
//                 content: parseStatusCode(response.statusCode, response.headers)
//             });
//         }
//     });
// }