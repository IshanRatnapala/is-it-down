module.exports = function (statusCode, details) {
    let status = {
        code: statusCode.toString(),
        message: statusCode,
        additional: '',
        redText: '',
        errorType: 'none'
    };
    if (status.code[0] === '2') {
        status.message = 'is Live';
        status.additional = 'which means all went well.';
    }
    if (status.code[0] === '3') {
        status.message = 'is Live';
        status.additional = 'which means a redirect.';
    }
    if (status.code[0] === '4') {
        status.message = 'is Live';
        status.additional = 'which means there are Client Errors. Not the server\'s fault.';
    }
    if (status.code[0] === '5') {
        status.message = 'is Live';
        status.additional = 'which means there are';
        status.redText = 'Internal Server Errors.';
        status.errorType = 'error';
    }
    /* Errors */
    if (status.code === 'ENOTFOUND') {
        status.code = '';
        status.message = ' - Domain name not found';
        status.additional = '';
        status.errorType = 'error';
    }
    if (status.code === 'ETIMEDOUT') {
        status.code = '';
        status.message = ' - Connection Timeout';
        status.additional = 'No response from the server for 20 seconds.';
        status.errorType = 'error';
    }
    if (status.code === 'ECONNRESET') {
        status.code = '';
        status.message = ' - Connection Error';
        status.additional = 'The other side of the TCP conversation abruptly closed its end of the connection. This is most probably due to one or more application protocol errors. ';
        status.errorType = 'error';
    }

    return status;
};