function formSubmit() {
    var domain = document.getElementById('domain').value;
    if (domain.indexOf('://') >= 0) {
        domain = domain.split('://')[1]
    }
    window.location = '/' + domain.split('/')[0];
    document.getElementById('loading-spinner').style.display = 'block';
    return false;
}