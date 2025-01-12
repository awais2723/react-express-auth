exports.isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    console.log('not authenticated');
    res.redirect('/login');
};
