function formSubmit() {
    var domain = document.getElementById('domain').value;
    if (domain.indexOf('://') >= 0) {
        domain = domain.split('://')[1]
    }
    window.location = '/' + domain.split('/')[0];
    document.getElementById('loading-spinner').style.display = 'block';
    return false;
}


WebFontConfig = {
    google: {
        families: ['Open Sans:400,700']
    }
};

(function(d) {
    var wf = d.createElement('script'), s = d.scripts[0];
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
    wf.async = true;
    s.parentNode.insertBefore(wf, s);
})(document);




