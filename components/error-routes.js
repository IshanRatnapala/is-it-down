module.exports = (app) => {
    app.use(function (req, res, next) {
        res.render('pages/error.ejs', {
            pageTitle: '404'
        });
    });
};
