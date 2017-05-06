module.exports = function (statusCode, details) {
    const code = statusCode.toString();
    let status = {
        message: statusCode,
        additional: '',
        errorType: 'none'
    };
    if (code[0] === '2') {
        status.message = 'is Live';
        status.additional = 'Server responded with a status code of ' + code + ' which means all went well.';
    }
    if (code[0] === '3') {
        status.message = 'is Live';
        status.additional = 'Server responded with a status code of ' + code + ' which means a redirect.';
    }
    if (code[0] === '4') {
        status.message = 'is Live';
        status.additional = 'Server responded with a status code of ' + code + ' which means there are client errors. Not the server\'s fault.';
    }
    if (code[0] === '5') {
        status.message = 'is Down';
        status.additional = 'Server responded with a status code of ' + code + ' which means there are server errors.';
        status.errorType = 'error';
    }
    /* Errors */
    if (code === 'ENOTFOUND') {
        status.message = ' - Domain name not found';
        status.additional = '';
        status.errorType = 'error';
    }
    if (code === 'ETIMEDOUT') {
        status.message = ' - Connection Timeout';
        status.additional = 'No response from the server for 20 seconds.';
        status.errorType = 'error';
    }

    return status;
};