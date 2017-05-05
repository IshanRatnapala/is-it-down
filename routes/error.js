module.exports = (app) => {
    app.use(function (req, res, next) {
        res.send('error');
    });
};
